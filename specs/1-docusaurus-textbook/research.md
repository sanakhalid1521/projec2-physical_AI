# Research: Physical AI & Humanoid Robotics Textbook

## Decision: Docusaurus Setup with i18n and Better-Auth
**Rationale**: Following the constitution requirements, Docusaurus is the mandated platform with Better-Auth for authentication and i18n for bilingual support.

## Technology Stack Research

### Language/Version
**Decision**: JavaScript/TypeScript with Node.js LTS
**Rationale**: Docusaurus is built on React and requires Node.js. TypeScript provides better maintainability for larger projects.
**Alternatives considered**:
- Pure JavaScript: Less type safety but simpler
- Other frameworks: Would violate constitution's Docusaurus requirement

### Primary Dependencies
**Decision**:
- Docusaurus 3.x for the static site generation
- Better-Auth for authentication
- React for UI components
- i18next/react-i18next for internationalization
**Rationale**: These align with the requirements and modern web development practices.

### Storage Solutions
**Decision**:
- Content: File-based (Markdown/MDX) stored in docs/ directory
- User profiles: PostgreSQL database for production, SQLite for development
**Rationale**: Docusaurus works best with file-based content, while user data needs a proper database.

### Testing Framework
**Decision**:
- Unit tests: Jest
- E2E tests: Playwright or Cypress
**Rationale**: These are standard tools that work well with React/Docusaurus applications.

### Target Platform
**Decision**: Responsive web application
**Rationale**: Docusaurus generates responsive websites that work across devices.

### Performance Goals
**Decision**:
- Initial page load: Under 3 seconds
- Language switching: Under 2 seconds
- Personalization rendering: Under 1 second
**Rationale**: Based on user experience best practices and the success criteria in the spec.

### Scale/Scope
**Decision**:
- Initial: Support 1000+ registered users
- Content: 15 lessons (5 chapters × 3 lessons) initially
- Expandable: Modular design to add more content later
**Rationale**: Based on the functional requirements and success criteria.

## Architecture Decisions

### Phase 1: Setup Docusaurus + i18n
**Decision**: Initialize Docusaurus with i18n plugin enabled
**Rationale**: Foundation requirement before adding other features

### Phase 2: Create book structure
**Decision**: Organize content in docs/ directory with 5 chapters × 3 lessons structure
**Rationale**: Directly maps to functional requirement FR-001

### Phase 3: Add lesson templates
**Decision**: Create reusable MDX components for lesson structure
**Rationale**: Supports modular content principle from constitution

### Phase 4: Setup Better-Auth
**Decision**: Implement Better-Auth with email/password authentication
**Rationale**: Meets constitution requirement for Better-Auth usage

### Phase 5: Store user profile
**Decision**: Create database schema for user profiles with background information
**Rationale**: Required for personalization feature

### Phase 6: Enable personalization hooks
**Decision**: Implement React context or similar to manage user preferences
**Rationale**: Allows content to adapt based on user profile

### Phase 7: Enable Urdu toggle
**Decision**: Implement language switching using Docusaurus i18n
**Rationale**: Required for bilingual support as per constitution

### Phase 8: Create homepage + theme
**Decision**: Custom theme that aligns with Physical AI & Robotics brand
**Rationale**: Provides cohesive user experience