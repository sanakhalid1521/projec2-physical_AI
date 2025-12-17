# Physical AI Robotic Constitution

## Core Principles

### I. Documentation-First Approach
All features and components must be documented before implementation begins. The Docusaurus book serves as the primary source of truth for all project knowledge. Every new feature requires comprehensive documentation in the book before code implementation.

### II. RAG-Enabled Architecture
All content and data structures must be designed with Retrieval-Augmented Generation in mind. The Qdrant vector database must be populated with all relevant content to enable effective semantic search and AI-powered responses.

### III. Test-First (NON-NEGOTIABLE)
TDD mandatory: Tests written → User approved → Tests fail → Then implement; Red-Green-Refactor cycle strictly enforced. All RAG functionality and API endpoints must have comprehensive test coverage before deployment.

### IV. API-First Design
All services must expose functionality through well-defined APIs using FastAPI. The backend must provide clean, documented endpoints for both the Docusaurus frontend and the RAG chatbot functionality.

### V. Observability and Performance
All components must provide structured logging and metrics. Performance requirements: API responses under 500ms, RAG queries under 2 seconds, and system must handle 100 concurrent users.

### VI. Security and Data Integrity
All data handling must follow security best practices. User queries and interactions must be logged for audit purposes. Database connections must use secure protocols and connection pooling.

## Technology Stack Requirements

The project must use the following technology stack:
- Frontend: Docusaurus for documentation and web interface
- Backend: FastAPI for API services
- AI/ML: Cohere for natural language processing and embeddings
- Vector Database: Qdrant Cloud for semantic search
- Relational Database: Neon Postgres for structured data
- RAG Implementation: Qdrant retrieval for document search and context generation

## Development Workflow

All code changes must follow these requirements:
- Code review required for all pull requests
- Automated tests must pass before merging
- Performance benchmarks must be maintained
- Documentation must be updated in the Docusaurus book
- RAG index must be updated when content changes

## Governance

All development must comply with this constitution. Changes to core architecture or technology stack require explicit approval. All PRs/reviews must verify compliance with documentation-first and RAG-enabled principles. Use this constitution for all development guidance.

**Version**: 1.0.0 | **Ratified**: 2025-12-17 | **Last Amended**: 2025-12-17
