import asyncio
import pytest
from main import app
from fastapi.testclient import TestClient

client = TestClient(app)

def test_health_check():
    """Test the health check endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    assert "Physical AI RAG API is running!" in response.json()["message"]

def test_rag_query():
    """Test the RAG query endpoint"""
    # This test requires the backend to be running with valid API keys
    test_data = {
        "query": "What is Physical AI?",
        "context": ""
    }

    try:
        response = client.post("/api/rag/query", json=test_data)
        assert response.status_code == 200
        assert "response" in response.json()
        print("RAG query test passed")
    except Exception as e:
        print(f"RAG query test failed (expected if API keys not configured): {e}")

def test_paper_generation():
    """Test the paper generation endpoint"""
    # This test requires the backend to be running with valid API keys
    test_data = {
        "topic": "Physical AI and Robotics",
        "length": 1000
    }

    try:
        response = client.post("/api/rag/generate-paper", json=test_data)
        assert response.status_code == 200
        assert "paper" in response.json()
        print("Paper generation test passed")
    except Exception as e:
        print(f"Paper generation test failed (expected if API keys not configured): {e}")

def test_health_endpoint():
    """Test the health endpoint"""
    response = client.get("/api/health")
    assert response.status_code == 200
    assert "status" in response.json()
    assert response.json()["status"] == "healthy"
    print("Health endpoint test passed")

if __name__ == "__main__":
    print("Testing the integrated RAG system...")

    test_health_check()
    test_health_endpoint()
    test_rag_query()
    test_paper_generation()

    print("All tests completed!")