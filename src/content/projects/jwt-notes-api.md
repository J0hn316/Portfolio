
---
title: "JWT Notes API"
description: "A FastAPI REST API featuring JWT authentication, user-owned notes, SQLAlchemy persistence, request validation, searching, and pagination."
category: "FastAPI / Backend"
technologies:
  - Python
  - FastAPI
  - Pydantic
  - SQLAlchemy
  - SQLite
  - Alembic
  - JWT
  - Pytest
highlights:
  - "Implements user registration, password hashing, and JWT authentication"
  - "Protects note operations through ownership-based authorization"
  - "Separates API routes, services, schemas, and database models"
  - "Supports note CRUD operations, text searching, and pagination"
  - "Includes automated tests and environment-based security configuration"
featured: true
status: completed
repositoryUrl: "https://github.com/J0hn316/Fastapi-jwt"
order: 3
---

## Project Overview

JWT Notes API is a backend REST application built with
FastAPI for creating and managing personal notes.

The application provides user registration, login,
JWT-based authentication, and endpoints for managing
notes belonging to the authenticated user.

I built this project to strengthen my understanding of
backend architecture, API security, relational databases,
request validation, and automated testing.

## Architecture and Technologies

The API separates its responsibilities across several
components:

- **FastAPI routes:** Define HTTP endpoints, dependencies,
  request handling, and responses.
- **Service functions:** Coordinate authentication and
  note-management operations.
- **Pydantic schemas:** Validate request data and define
  structured API responses.
- **SQLAlchemy models:** Represent users, notes, and
  relationships between database records.
- **SQLite:** Stores application data during local development.
- **Alembic:** Manages database schema migrations.
- **JWT:** Provides signed access tokens used to authenticate
  requests to protected endpoints.

I used FastAPI's dependency injection system to supply
database sessions and resolve the authenticated user.

This organization keeps HTTP-specific logic separate
from database operations and security utilities.

## Authentication Workflow

The application implements a token-based authentication
workflow.

### User Registration

A client submits registration information to the API.

The application validates the submitted data, checks
for an existing account with the same email address,
hashes the password, and stores the new user.

Passwords are not stored as plaintext values.

### User Login

A client submits login credentials.

The application retrieves the matching account and
verifies the supplied password against the stored hash.

When authentication succeeds, the API generates a
signed JWT access token.

### JWT Token Generation

The token includes a subject identifying the user
and an expiration claim.

The application signs the token using its configured
JWT secret key and signing algorithm.

The client includes the resulting token in subsequent
requests using the HTTP Bearer authentication scheme.

### JWT Verification

Protected endpoints use a FastAPI dependency to
retrieve and validate the submitted token.

The application verifies the token signature and
expiration, extracts the subject, and looks up
the corresponding user.

Invalid, expired, or otherwise unusable credentials
are rejected rather than providing access to
protected functionality.

## Authorization and Data Ownership

Authentication establishes which user is making a
request. Authorization determines which resources
that user may access.

These are separate responsibilities.

Each note is associated with an owning user through
the application's relational data model.

When retrieving or modifying an individual note,
the application restricts its database query using
both the note identifier and the authenticated
user's identifier.

This prevents an authenticated user from gaining
access to another user's notes simply by changing
a note ID in a request.

The same ownership principle is applied throughout
note-management operations.

## Notes API Features

### Create Notes

Authenticated users can create notes through
a protected API endpoint.

Pydantic validates submitted information before
the application processes it.

The note is associated with the authenticated user
when it is stored.

### Retrieve Notes

Users can retrieve their own notes, including
individual records and lists of notes.

The application restricts results to records
owned by the authenticated user.

### Update and Delete Notes

Users can modify or delete notes they own.

The API verifies resource ownership through
database queries before performing the operation.

Requests for inaccessible or nonexistent notes
do not expose another user's private content.

### Search and Pagination

The notes listing supports optional case-insensitive
searching across note titles and content.

The API also supports offset-based pagination
through configurable limit and offset parameters.

Pagination values are constrained through endpoint
validation, and list responses include a total
record count.

These features allow clients to request a subset
of matching notes without retrieving an entire
collection in a single response.

## Engineering Challenges and Solutions

### 1. Implementing JWT Authentication

**Challenge:** Protected API endpoints need a reliable
way to identify users without requiring login
credentials on every request.

**Approach:** I implemented password hashing,
credential verification, signed JWT generation,
and token validation.

I used FastAPI dependencies to centralize the
authenticated-user lookup rather than duplicating
that logic across protected routes.

**Verification:** Authentication tests and manual
requests check that valid credentials allow access
while invalid credentials are rejected.

This reinforced my understanding of token-based
authentication and reusable request dependencies.

### 2. Preventing Cross-User Note Access

**Challenge:** A valid access token should not give
a user permission to access every record in the
database.

**Approach:** I associated notes with their owners
and restricted database queries using the current
user's identifier.

This keeps authorization enforcement on the server
rather than relying on client-provided ownership data.

**Verification:** Automated and manual ownership
checks verify that users cannot access notes
belonging to another account.

This demonstrated the importance of distinguishing
authentication from authorization.

### 3. Separating API and Database Responsibilities

**Challenge:** Combining HTTP handling, validation,
authentication, and database operations in one
module would make the application harder to
maintain and test.

**Approach:** I organized functionality into API
routes, service functions, security utilities,
Pydantic schemas, and SQLAlchemy models.

Database sessions and authenticated-user information
are provided through FastAPI dependencies.

**Verification:** The application was tested across
authentication and note-management workflows,
including database-backed operations.

This strengthened my understanding of modular
backend application design.

### 4. Improving Security Configuration

**Challenge:** During a later repository review,
I identified that the application allowed a
publicly known fallback JWT signing secret.

**Approach:** I changed the configuration to
require the JWT signing secret through an
environment variable.

I also updated the example environment configuration,
preserved the exclusion of local secret files from
version control, and cleaned up minor code-quality
issues.

**Verification:** I added security-related regression
tests and reran automated and manual authentication
and ownership checks.

The application has only been used locally and
has not been publicly deployed.

This maintenance work reinforced the importance
of secure configuration defaults and periodically
reviewing completed projects.

## Testing and Validation

I used Pytest and FastAPI's testing capabilities
to verify application behavior.

Testing covers authentication, protected requests,
note-management operations, and ownership enforcement.

Additional security regression tests verify
configuration behavior following the JWT secret
improvement.

I also manually exercised authentication and
note-access workflows to confirm expected behavior.

## Limitations and Future Improvements

The application is a local-development backend
project and has not been deployed to a public
production environment.

Potential future improvements include:

- Deployment to a hosted environment with appropriate
  production configuration.
- Expanded API documentation and usage examples.
- Additional authentication lifecycle features,
  such as refresh-token rotation or token revocation.
- More advanced note filtering and sorting.
- Continued expansion of automated edge-case tests.

These are potential enhancements rather than
features currently implemented.

## What I Learned

This project helped me develop a stronger
understanding of backend API engineering.

My key takeaways were:

- Authentication and authorization solve different problems.
- Password hashing and JWT validation require careful
  handling of sensitive credentials.
- Database queries must enforce resource ownership.
- Pydantic schemas help validate API inputs and outputs.
- Service functions and dependency injection improve
  separation of concerns.
- Database migrations make schema changes more manageable.
- Automated tests should cover both expected behavior
  and security-related failure cases.
- Secure configuration defaults are an important part
  of maintaining backend applications.
