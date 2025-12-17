# Quickstart Guide: Physical AI & Humanoid Robotics Textbook

## Development Setup

### Prerequisites
- Node.js LTS (v18 or higher)
- npm or yarn package manager
- PostgreSQL (for development) or SQLite

### Initial Setup

1. **Clone and Navigate**
   ```bash
   # Already in the project directory
   cd E:\quarter-4\Hackathon-1\physical-AI
   ```

2. **Install Dependencies**
   ```bash
   # Install project dependencies
   npm install
   ```

3. **Setup Environment**
   ```bash
   # Create .env file with required variables
   cp .env.example .env
   # Update .env with your configuration
   ```

4. **Initialize Database**
   ```bash
   # For PostgreSQL
   npm run db:setup

   # For SQLite (default for development)
   npm run db:setup:sqlite
   ```

5. **Start Development Server**
   ```bash
   # Start Docusaurus development server
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - API Documentation: http://localhost:3000/api/docs (when implemented)

## Project Structure

```
physical-AI/
├── website/                 # Docusaurus frontend
│   ├── docusaurus.config.js # Main Docusaurus configuration
│   ├── src/                 # Custom React components
│   ├── docs/                # Textbook content (en/ur)
│   ├── i18n/                # Internationalization files
│   ├── plugins/             # Docusaurus plugins
│   └── static/              # Static assets
├── backend/                 # Backend services
│   ├── auth/                # Better-Auth implementation
│   ├── api/                 # Content and profile APIs
│   └── config/              # Configuration files
├── specs/1-docusaurus-textbook/ # Current feature specs
└── package.json             # Project dependencies
```

## Key Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Serve production build locally
npm run serve

# Run tests
npm run test

# Generate API documentation
npm run docs:api

# Format code
npm run format

# Lint code
npm run lint
```

## Configuration

### Docusaurus Configuration
The main configuration is in `website/docusaurus.config.js`:
- Site metadata (title, tagline, URL)
- Theme configuration
- Plugin settings
- Internationalization settings

### Authentication Configuration
Better-Auth is configured in `backend/auth/better-auth/`:
- Database connection
- Email/password settings
- Session management
- User profile schema

### Internationalization
Language files are in `website/i18n/`:
- `en/` - English content
- `ur/` - Urdu content
- Translation files follow Docusaurus i18n standards

## Development Workflow

1. **Content Creation**
   - Add new lessons in `website/docs/en/` (English)
   - Add corresponding translations in `website/docs/ur/`
   - Use MDX format for interactive elements

2. **Feature Development**
   - Create components in `website/src/components/`
   - Add custom theme modifications in `website/src/theme/`
   - Implement API endpoints in `backend/api/`

3. **Testing**
   - Unit tests in `__tests__/` directory
   - E2E tests in `e2e/` directory
   - Run `npm run test` to execute all tests

## Deployment

### Environment Variables
- `DATABASE_URL` - Database connection string
- `AUTH_SECRET` - Secret for authentication
- `NODE_ENV` - Environment (development/production)
- `SITE_URL` - Public URL of the site

### Build Process
1. Run `npm run build` to create production build
2. Serve the `build/` directory with a web server
3. Ensure backend services are accessible from the frontend

## Troubleshooting

### Common Issues
- **Port already in use**: Change port in docusaurus.config.js or kill the process
- **Database connection errors**: Check DATABASE_URL in .env file
- **Translation not working**: Verify language files in i18n directory
- **Auth not working**: Check Better-Auth configuration and secret

### Getting Help
- Check the feature specification in `specs/1-docusaurus-textbook/spec.md`
- Review API contracts in `specs/1-docusaurus-textbook/contracts/`
- Consult the data model in `specs/1-docusaurus-textbook/data-model.md`