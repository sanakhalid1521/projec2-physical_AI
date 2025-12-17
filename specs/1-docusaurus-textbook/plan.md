# Implementation Plan: Physical AI & Humanoid Robotics Textbook

**Branch**: `1-docusaurus-textbook` | **Date**: 2025-12-15 | **Spec**: [link to spec](./spec.md)
**Input**: Feature specification from `/specs/1-docusaurus-textbook/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement a Physical AI & Humanoid Robotics textbook using Docusaurus with authentication and Urdu translation capabilities. The solution will include 5 chapters with 3 lessons each, hands-on focused content, user authentication via Better-Auth, profile-based personalization, and English ↔ Urdu language switching. The architecture will follow a web application pattern with Docusaurus for content delivery and a separate service for authentication and user profiles.

## Technical Context

**Language/Version**: JavaScript/TypeScript with Node.js LTS
**Primary Dependencies**: Docusaurus 3.x, Better-Auth, React, i18next/react-i18next
**Storage**: File-based for content (Markdown/MDX), Database for user profiles (PostgreSQL for production, SQLite for development)
**Testing**: Jest for unit tests, Playwright for E2E tests
**Target Platform**: Web application, responsive for desktop and mobile
**Project Type**: Web application - determines source structure
**Performance Goals**: Initial page load under 3 seconds, language switching under 2 seconds, personalization rendering under 1 second
**Constraints**: Must use Docusaurus platform per constitution, Better-Auth for authentication, bilingual support required
**Scale/Scope**: Support for 1000+ registered users, 15 lessons (5 chapters × 3 lessons) initially with modular design for expansion

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Pre-Phase 0 Design:**
Based on constitution requirements:
- Docusaurus Platform Standard: All content delivered through Docusaurus platform ✓
- Bilingual Support: Content must be available in both English and Urdu ✓
- User-aware Learning: Content must adapt to user background and progress ✓
- Simple Language: Technical concepts explained using clear, accessible language ✓
- Hands-on First Learning: Every lesson must start with hands-on activity ✓
- Modular Content: Content organized in independent, self-contained modules ✓

**Post-Phase 1 Design:**
After implementing the design in data-model.md and contracts/:
- Docusaurus Platform Standard: Confirmed - using Docusaurus for content delivery ✓
- Bilingual Support: Confirmed - API contracts support English/Urdu switching ✓
- User-aware Learning: Confirmed - data model includes user profiles with background info ✓
- Simple Language: Confirmed - content structure supports simple language principles ✓
- Hands-on First Learning: Confirmed - lesson structure includes hands-on activities ✓
- Modular Content: Confirmed - content organized in independent chapters/lessons ✓
- Better-Auth Requirement: Confirmed - authentication API contract uses Better-Auth ✓

## Project Structure

### Documentation (this feature)
```text
specs/1-docusaurus-textbook/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)
```text
website/
├── docusaurus.config.js
├── src/
│   ├── components/
│   ├── pages/
│   ├── theme/
│   └── css/
├── docs/
│   ├── en/              # English content
│   └── ur/              # Urdu content
├── i18n/
│   ├── en/
│   └── ur/
├── plugins/
│   └── auth-plugin/
├── static/
└── package.json

backend/
├── auth/
│   └── better-auth/
├── api/
│   └── user-profiles/
└── config/
```

**Structure Decision**: Web application with Docusaurus frontend and separate auth/profile backend services

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |