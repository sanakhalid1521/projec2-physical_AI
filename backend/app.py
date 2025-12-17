from fastapi import FastAPI
from main import app

# This app.py file is needed for Hugging Face Spaces
# It imports the main FastAPI app from main.py
# The Hugging Face Space will run this app

# You can also create a simple Gradio interface if needed
# But for a backend API, FastAPI is the right approach

# The app is already defined in main.py with all the RAG functionality
# This file just ensures Hugging Face can run it properly

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)