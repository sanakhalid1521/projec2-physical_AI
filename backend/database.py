import asyncpg
import os
from typing import Optional

class DatabaseManager:
    def __init__(self):
        self.pool = None
        self.db_url = os.getenv("NEON_DB_URL")

    @property
    def has_pool(self):
        return self.pool is not None

    async def connect(self):
        """Establish connection to Neon Postgres database"""
        if self.db_url:
            try:
                self.pool = await asyncpg.create_pool(
                    self.db_url,
                    min_size=1,
                    max_size=10,
                    command_timeout=60
                )
                print("Connected to Neon Postgres successfully")
                await self.create_tables()
            except Exception as e:
                print(f"Failed to connect to Neon Postgres: {e}")
                self.pool = None

    async def create_tables(self):
        """Create required tables if they don't exist"""
        if not self.pool:
            return

        async with self.pool.acquire() as conn:
            # Create documents table
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS documents (
                    id TEXT PRIMARY KEY,
                    content TEXT NOT NULL,
                    metadata JSONB,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)

            # Create users table
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    username VARCHAR(50) UNIQUE NOT NULL,
                    email VARCHAR(100) UNIQUE NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)

            # Create queries table to track user interactions
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS queries (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER REFERENCES users(id),
                    query TEXT NOT NULL,
                    response TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)

    async def close(self):
        """Close the database connection"""
        if self.pool:
            await self.pool.close()

    async def get_document(self, doc_id: str):
        """Retrieve a document by ID"""
        if not self.pool:
            return None

        async with self.pool.acquire() as conn:
            return await conn.fetchrow(
                "SELECT * FROM documents WHERE id = $1",
                doc_id
            )

    async def store_document(self, doc_id: str, content: str, metadata: dict = None):
        """Store a document in the database"""
        if not self.pool:
            return

        async with self.pool.acquire() as conn:
            await conn.execute(
                """
                INSERT INTO documents (id, content, metadata)
                VALUES ($1, $2, $3)
                ON CONFLICT (id) DO UPDATE
                SET content = $2, metadata = $3, created_at = CURRENT_TIMESTAMP
                """,
                doc_id, content, metadata or {}
            )

    async def search_documents(self, query: str, limit: int = 10):
        """Search for documents (basic full-text search)"""
        if not self.pool:
            return []

        async with self.pool.acquire() as conn:
            if query.strip():
                # Search for documents matching the query
                rows = await conn.fetch(
                    """
                    SELECT * FROM documents
                    WHERE to_tsvector('english', content) @@ plainto_tsquery('english', $1)
                    ORDER BY created_at DESC
                    LIMIT $2
                    """,
                    query, limit
                )
            else:
                # If no query, return all documents
                rows = await conn.fetch(
                    """
                    SELECT * FROM documents
                    ORDER BY created_at DESC
                    LIMIT $1
                    """,
                    limit
                )

            # Convert rows to the expected format
            documents = []
            for row in rows:
                documents.append({
                    "id": row["id"],
                    "content": row["content"],
                    "metadata": row["metadata"],
                    "created_at": str(row["created_at"])
                })

            return documents