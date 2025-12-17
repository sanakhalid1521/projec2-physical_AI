#!/usr/bin/env python3
"""
Script to load Physical AI textbook content into the RAG system
"""

import asyncio
import os
from pathlib import Path
import re
import json
from services import RAGService
from dotenv import load_dotenv
import time

load_dotenv()

def extract_text_from_markdown(file_path):
    """Extract clean text content from markdown file, removing frontmatter and code blocks"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove frontmatter (content between --- delimiters)
    content = re.sub(r'^---\n.*?\n---\n', '', content, flags=re.DOTALL)

    # Remove code blocks (content between ``` delimiters)
    content = re.sub(r'```.*?\n.*?\n```', '', content, flags=re.DOTALL)

    # Remove markdown formatting but keep the text
    # Remove headers
    content = re.sub(r'^#+\s+', '', content, flags=re.MULTILINE)
    # Remove bold/italic
    content = re.sub(r'\*{1,2}(.*?)\*{1,2}', r'\1', content)
    # Remove links
    content = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', content)
    # Remove image references
    content = re.sub(r'!\[.*?\]\(.*?\)', '', content)
    # Remove lists
    content = re.sub(r'^\s*[-*+]\s+', '', content, flags=re.MULTILINE)
    # Remove numbered lists
    content = re.sub(r'^\s*\d+\.\s+', '', content, flags=re.MULTILINE)

    # Clean up extra whitespace
    content = re.sub(r'\n\s*\n', '\n\n', content)
    content = content.strip()

    return content

async def load_documents_to_rag():
    """Load all textbook content into the RAG system"""
    print("Initializing RAG service...")
    rag_service = RAGService()
    await rag_service.connect_to_neon_db()

    docs_dir = Path("../docs")  # Relative to backend directory

    if not docs_dir.exists():
        print(f"Docs directory not found: {docs_dir}")
        return

    markdown_files = list(docs_dir.rglob("*.md"))
    print(f"Found {len(markdown_files)} markdown files to process...")
    print("Note: Trial API key has 40 calls/minute limit, so processing will pause as needed...")

    processed_count = 0
    for i, file_path in enumerate(markdown_files, 1):
        try:
            print(f"Processing ({i}/{len(markdown_files)}): {file_path}")

            # Extract content from markdown
            content = extract_text_from_markdown(file_path)

            # Create metadata
            relative_path = file_path.relative_to(docs_dir.parent)  # Relative to project root
            metadata = {
                "source": str(relative_path),
                "chapter": str(file_path.parent.name),
                "lesson": file_path.stem,
                "type": "textbook_content"
            }

            # Store in RAG system
            doc_id = await rag_service.store_document(content, metadata)
            processed_count += 1
            print(f"  -> Stored document with ID: {doc_id}")

            # Add a small delay to respect rate limits
            if processed_count % 35 == 0:  # Stay under the 40 call limit
                print("  -> Pausing to respect API rate limits...")
                time.sleep(60)  # Wait 1 minute to reset the rate limit

        except Exception as e:
            print(f"  -> Error processing {file_path}: {str(e)}")
            continue

    print(f"\nCompleted! Loaded {processed_count} documents into the RAG system.")

if __name__ == "__main__":
    asyncio.run(load_documents_to_rag())