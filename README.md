# Physical AI & Humanoid Robotics Textbook with RAG

This project is a comprehensive textbook on Physical AI and Humanoid Robotics with an integrated Retrieval-Augmented Generation (RAG) system for interactive learning.

## Tech Stack

- **Frontend**: Docusaurus for documentation and web interface
- **Backend**: FastAPI for API services
- **AI/ML**: Cohere for natural language processing and embeddings
- **Vector Database**: Qdrant Cloud for semantic search
- **Relational Database**: Neon Postgres for structured data
- **RAG Implementation**: Qdrant retrieval for document search and context generation

## Architecture

The system consists of:

1. **Docusaurus Frontend**: Interactive textbook with multilingual support (English and Urdu)
2. **FastAPI Backend**: RAG service with Cohere integration and Qdrant vector search
3. **Vector Database**: Qdrant Cloud for semantic search capabilities
4. **Relational Database**: Neon Postgres for document storage and user data

## Project Structure

```
physical-AI/
├── backend/                 # FastAPI backend with RAG functionality
│   ├── main.py             # FastAPI application
│   ├── services.py         # RAG business logic
│   ├── database.py         # Database operations
│   ├── requirements.txt    # Python dependencies
│   ├── .env.example       # Environment variables example
│   ├── start.sh           # Startup script (Unix)
│   ├── start.bat          # Startup script (Windows)
│   └── test_rag.py        # Integration tests
├── docs/                  # Textbook content (English)
│   ├── intro.md           # Introduction
│   ├── chapter-1/         # Chapter 1 content
│   ├── chapter-2/         # Chapter 2 content
│   ├── ...               # More chapters
│   └── ur/               # Urdu translation
├── src/                   # Docusaurus custom components
│   ├── components/        # React components (including RAG interface)
│   └── pages/            # Custom pages
├── docusaurus.config.ts  # Docusaurus configuration
├── sidebars.ts           # Navigation configuration
└── package.json          # Frontend dependencies
```

## Setup Instructions

### Frontend (Docusaurus)

1. Navigate to the project root:
   ```bash
   cd physical-AI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`.

### Backend (FastAPI)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your actual API keys and connection strings
   ```

5. Start the backend server:
   ```bash
   # On Unix/Linux/Mac:
   ./start.sh

   # On Windows:
   start.bat
   ```

The backend will be available at `http://localhost:8000`.

## API Endpoints

The backend provides the following endpoints:

- `GET /` - Health check
- `POST /api/rag/query` - Query the RAG system
- `POST /api/rag/generate-paper` - Generate a research paper
- `GET /api/health` - Health check

## Environment Variables

You need to configure the following environment variables in your `.env` file:

- `COHERE_API_KEY`: Your Cohere API key
- `QDRANT_URL`: Your Qdrant Cloud URL
- `QDRANT_API_KEY`: Your Qdrant API key
- `NEON_DB_URL`: Your Neon Postgres connection string

## RAG Functionality

The RAG system works as follows:

1. User submits a query through the Docusaurus interface
2. The frontend sends the query to the FastAPI backend
3. The backend embeds the query using Cohere
4. The embedded query is used to search for relevant documents in Qdrant
5. Retrieved documents are used as context for the language model
6. Cohere generates a response based on the query and context
7. The response is sent back to the frontend

## Testing

To test the backend functionality:

```bash
cd backend
python test_rag.py
```

## Features

- **Interactive Textbook**: Comprehensive content on Physical AI and Humanoid Robotics
- **Multilingual Support**: Content available in English and Urdu
- **RAG Interface**: Ask questions and get AI-powered answers based on textbook content
- **Paper Generation**: Generate research papers on Physical AI topics
- **Vector Search**: Semantic search through textbook content
- **User Authentication**: Secure access to premium features

## Development

For development, both the frontend and backend need to be running simultaneously. The frontend expects the backend to be available at `http://localhost:8000`.

## Deployment

For production deployment:

1. Build the Docusaurus frontend: `npm run build`
2. Deploy the static files to your preferred hosting service
3. Deploy the FastAPI backend to a cloud provider
4. Update the frontend to point to your deployed backend URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
