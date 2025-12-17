import os
import asyncio
from dotenv import load_dotenv

load_dotenv()

# Test Cohere connection
try:
    import cohere
    cohere_client = cohere.Client(os.getenv("COHERE_API_KEY"))

    # Test with different models in order of preference
    models_to_try = ["command-r-plus", "command-r", "command", "command-light", "command-r-08-2024", "command-r-plus-08-2024"]
    response = None
    successful_model = None

    for model in models_to_try:
        try:
            response = cohere_client.chat(
                model=model,
                message="Hello, how are you?",
                max_tokens=10
            )
            successful_model = model
            break
        except Exception as model_error:
            print(f"Model {model} not available: {model_error}")
            continue

    if response is not None and successful_model is not None:
        print(f"[SUCCESS] Cohere connection successful with model: {successful_model}!")
        print("Response:", response.text)
    else:
        print("[ERROR] No Cohere models are available with this API key. This may be due to account access restrictions.")
        print("       Please check your API key and model access permissions.")
except Exception as e:
    print("[ERROR] Cohere connection failed:", str(e))

# Test Qdrant connection
try:
    from qdrant_client import QdrantClient
    qdrant_client = QdrantClient(
        url=os.getenv("QDRANT_URL"),
        api_key=os.getenv("QDRANT_API_KEY"),
        prefer_grpc=True
    )

    # Test getting collections
    collections = qdrant_client.get_collections()
    print("[SUCCESS] Qdrant connection successful!")
    print("Collections:", [c.name for c in collections.collections])
except Exception as e:
    print("[ERROR] Qdrant connection failed:", str(e))

# Test database connection
try:
    import asyncpg
    async def test_db():
        conn = await asyncpg.connect(os.getenv("NEON_DB_URL"))
        await conn.fetchval("SELECT 1")
        await conn.close()
        print("[SUCCESS] Neon Postgres connection successful!")

    asyncio.run(test_db())
except Exception as e:
    print("[ERROR] Neon Postgres connection failed:", str(e))