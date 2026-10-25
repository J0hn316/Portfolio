
---
title: "Personal Finance Tracker"
description: "A Django web application for managing income, expenses, and categories with user-specific data protection, financial summaries, and automated testing."
category: "Django / Full-Stack"
technologies:
  - Python
  - Django
  - SQLite
  - HTML
  - CSS
  - Django ORM
highlights:
  - "Implemented authenticated, user-owned transaction and category management"
  - "Enforced data integrity through forms, model validation, and database constraints"
  - "Built financial summaries using Django ORM aggregations"
  - "Added transaction search, filtering, and pagination"
  - "Created automated tests covering functionality and user isolation"
featured: true
status: completed
repositoryUrl: "https://github.com/J0hn316/Django-Expense-Tracker"
order: 2
---

## Project Overview

Personal Finance Tracker is a full-stack Django web application
for organizing income, expenses, and financial categories.

Registered users can manage their transactions, review financial
summaries, and search or filter their transaction history. The
application keeps each user's financial records separate through
authenticated, ownership-aware database queries.

I built the application to strengthen my understanding of Django,
relational database design, form validation, access control,
and automated testing.

## Architecture and Technologies

The application uses Django's server-rendered architecture,
with the following components:

- **Django models:** Represent categories and financial
  transactions, including their relationships to users.
- **Django forms:** Validate submitted data and provide
  feedback when input is invalid.
- **Views and URL routing:** Handle authenticated requests
  and coordinate database operations.
- **Django templates:** Render the dashboard, transaction
  pages, category pages, and forms.
- **SQLite:** Stores application data during local development.
- **HTML and CSS:** Provide the user interface and responsive
  page layouts.

I used Django's built-in authentication system rather than
implementing a custom authentication mechanism.

## Key Features

### Transaction and Category Management

Authenticated users can create, view, edit, and delete income
and expense transactions.

Users can also manage their own categories. Each transaction
is associated with a category and an owning user.

Category deletion is restricted when existing transactions
depend on that category, helping prevent unintended data loss.

### Financial Dashboard

The dashboard displays total income, total expenses, current
balance, recent transactions, and expense totals grouped
by category.

I used Django ORM aggregation to calculate financial totals
from stored transaction data.

### Transaction Search and Filtering

Users can search transactions by description or category name.

Additional filters support transaction type, category,
month, and year.

The transaction list uses pagination, and the active
filters are preserved when navigating between pages.

## Engineering Challenges and Solutions

### 1. Protecting User-Owned Data

**Challenge:** A multi-user financial application must prevent
users from viewing or modifying records belonging to
another account.

**Approach:** I associated categories and transactions with
their owning user and restricted database queries using
the authenticated request user.

I also applied ownership checks when retrieving individual
records for operations such as editing and deletion.

**Verification:** Automated tests check that one user's
transactions and dashboard calculations do not expose
another user's financial information.

This reinforced that authorization must be enforced
server-side rather than relying on the user interface
to hide inaccessible records.

### 2. Maintaining Data Integrity

**Challenge:** Financial transactions require consistent
amounts, valid category relationships, and predictable
behavior when submitted data is invalid.

**Approach:** I used Django forms, model validation, and
database constraints to enforce application rules.

For monetary values, I used decimal-based fields rather
than floating-point values.

I also validated relationships between transactions,
categories, and users to prevent inconsistent records.

**Verification:** During development, I investigated failing
tests, corrected validation-related behavior, and reran
automated and manual checks to verify the changes.

This strengthened my understanding of how validation
responsibilities are distributed across the form,
model, and database layers.

### 3. Building Financial Summaries and Search

**Challenge:** Financial information needs to be presented
in a useful way without manually calculating every value
in application code.

**Approach:** I used Django ORM queries and aggregation
functions to calculate income, expenses, balances, and
category totals.

I also implemented searching and filtering through request
query parameters, with pagination for longer transaction
histories.

**Verification:** Automated tests check expected financial
totals, category grouping, empty dashboards, user-specific
results, and transaction-list behavior.

This helped me become more comfortable using the ORM for
data retrieval, aggregation, and filtering.

## Testing and Validation

I developed automated tests using Django's testing framework.

The tests cover areas including:

- User registration, authentication, and protected routes.
- Category and transaction management.
- Model and form validation.
- Ownership restrictions and cross-user access.
- Dashboard calculations and empty states.
- Searching, filtering, and pagination.

I also manually tested application workflows throughout
development to confirm that the rendered pages behaved
as expected.

## Security and Configuration Improvements

During a later repository review, I identified an exposed
development secret key and improved the application's
configuration management.

I moved the Django secret key, debug setting, and allowed
hosts configuration into environment-based settings.

I also excluded the local environment file from version
control, added a safe example configuration, and introduced
tests for configuration behavior.

The application was developed and tested locally and
has not been publicly deployed.

This maintenance work reinforced the importance of reviewing
existing projects for security and configuration issues,
even after their original feature development is complete.

## What I Learned

This project strengthened my understanding of how the
different layers of a Django application work together.

My main takeaways were:

- Enforce authorization at the database-query and view layers.
- Use forms, models, and database constraints together to
  protect data integrity.
- Use ORM aggregations to produce meaningful application data.
- Test both expected behavior and important failure cases.
- Revisit completed projects to improve security,
  maintainability, and configuration practices.

## Future Improvements

Potential future enhancements include more advanced financial
reporting, data export functionality, and deployment to a
production hosting environment.

These are possible future additions, not features currently
implemented.
