# Data Model: Physical AI & Humanoid Robotics Textbook

## Entities

### User
**Description**: Represents a learner with profile information including programming level, robotics familiarity, and personalization preferences

**Fields**:
- id: string (unique identifier)
- email: string (user's email address, unique)
- name: string (user's display name)
- programmingLevel: string (enum: beginner, intermediate, advanced)
- roboticsFamiliarity: string (enum: none, basic, intermediate, advanced)
- createdAt: datetime (account creation timestamp)
- updatedAt: datetime (last profile update)
- preferences: object (personalization settings)
  - preferredLanguage: string (default: 'en', can be 'ur')
  - contentDepth: string (enum: basic, intermediate, advanced)
  - notificationSettings: object

**Validation Rules**:
- Email must be valid email format
- Programming level and robotics familiarity must be from allowed enum values
- User must provide background information during registration

**Relationships**:
- One User to Many UserProgress (user's progress through lessons)
- One User to Many UserFeedback (user's feedback on lessons)

### Lesson
**Description**: Individual learning unit within a chapter containing content, activities, and examples

**Fields**:
- id: string (unique identifier)
- chapterId: string (reference to parent chapter)
- title: string (lesson title)
- slug: string (URL-friendly identifier)
- content: string (lesson content in MDX format)
- language: string (language code: 'en' or 'ur')
- handsOnActivity: string (hands-on activity content)
- difficultyLevel: string (enum: basic, intermediate, advanced)
- estimatedTime: number (estimated completion time in minutes)
- prerequisites: array (list of prerequisite lesson IDs)
- createdAt: datetime
- updatedAt: datetime

**Validation Rules**:
- Each lesson must have hands-on activities as per constitution
- Content must follow simple language principle
- Difficulty level must match target audience (beginner to intermediate)

**Relationships**:
- One Lesson to Many UserProgress (tracking user progress on this lesson)
- One Chapter to Many Lessons (parent-child relationship)

### Chapter
**Description**: Collection of lessons organized by topic

**Fields**:
- id: string (unique identifier)
- title: string (chapter title)
- slug: string (URL-friendly identifier)
- description: string (chapter description)
- order: number (sequence in the textbook)
- lessonCount: number (number of lessons in this chapter)
- createdAt: datetime
- updatedAt: datetime

**Validation Rules**:
- Must contain exactly 3 lessons as per functional requirement
- Must follow progressive difficulty principle

**Relationships**:
- One Chapter to Many Lessons (parent-child relationship)
- One Book to Many Chapters (parent-child relationship)

### Translation
**Description**: Language-specific version of content for English ↔ Urdu switching

**Fields**:
- id: string (unique identifier)
- contentId: string (reference to original content - could be lesson, chapter, etc.)
- contentType: string (enum: lesson, chapter, global)
- sourceLanguage: string (language code: 'en' or 'ur')
- targetLanguage: string (language code: 'en' or 'ur')
- translatedContent: string (translated content)
- translator: string (optional - who translated)
- reviewed: boolean (whether translation has been reviewed)
- createdAt: datetime
- updatedAt: datetime

**Validation Rules**:
- Translations must be culturally appropriate as per constitution
- Translation must maintain the meaning of technical concepts
- Urdu translations must be simple and clear

**Relationships**:
- One Content to Many Translations (one-to-many translation variants)

### UserProgress
**Description**: Tracks user's progress through the textbook content

**Fields**:
- id: string (unique identifier)
- userId: string (reference to user)
- contentId: string (reference to lesson or chapter)
- contentType: string (enum: lesson, chapter)
- status: string (enum: not-started, in-progress, completed)
- completionPercentage: number (0-100)
- timeSpent: number (time spent in seconds)
- lastAccessed: datetime
- startedAt: datetime
- completedAt: datetime (nullable)
- notes: string (user's notes on the content)

**Validation Rules**:
- Progress must be tracked per user and content combination
- Status transitions must follow logical sequence

**Relationships**:
- One User to Many UserProgress (user's progress records)
- One Lesson/Chapter to Many UserProgress (progress records for this content)

### UserProfile
**Description**: Extended profile information for personalization

**Fields**:
- id: string (unique identifier, same as user id)
- userId: string (reference to user)
- learningGoals: array (user's learning objectives)
- preferredLearningStyle: string (enum: visual, auditory, hands-on, reading)
- timezone: string (user's timezone)
- notificationPreferences: object (notification settings)
- personalizationLevel: string (enum: none, basic, full)
- createdAt: datetime
- updatedAt: datetime

**Validation Rules**:
- Must be created when user provides background information
- Should enable content personalization as per constitution

**Relationships**:
- One User to One UserProfile (user's extended profile)