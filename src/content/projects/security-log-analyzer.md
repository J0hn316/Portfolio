
---
title: "Security Log Analyzer"
description: "A Python command-line tool that analyzes CSV authentication logs, detects suspicious login patterns, and generates severity-labeled security reports."
category: "Python / Security"
technologies:
  - Python
  - CSV
  - JSON
  - Python Data classes
  - Pytest
highlights:
  - "Parses and normalizes authentication log data while tracking malformed records"
  - "Implements four rule-based detections for suspicious authentication activity"
  - "Uses grouping, sets, chronological sorting, and event-state tracking"
  - "Supports configurable detection thresholds and business hours"
  - "Generates severity-labeled findings and text or JSON reports"
featured: true
status: completed
repositoryUrl: "https://github.com/J0hn316/security-log-analyzer"
order: 1
---

## Project Overview

Security Log Analyzer is a Python command-line application
designed to identify potentially suspicious authentication
activity in CSV log files.

The tool parses authentication events, applies four
rule-based detections, and produces findings with
severity levels and related log evidence.

I built this project to strengthen my Python skills while
exploring practical security monitoring, event analysis,
and defensive software development.

## Architecture and Technologies

The application follows a modular processing workflow:

1. Read authentication events from a CSV file.
2. Validate and normalize input records.
3. Convert valid records into structured `LogEvent` objects.
4. Apply authentication detection rules.
5. Represent detected activity as `Finding` objects.
6. Generate a terminal report or JSON output.

The implementation separates parsing, data models,
detection rules, command-line execution, and reporting.

Python data classes provide consistent representations
of events and findings across these modules.

## Log Parsing and Data Validation

The CSV parser reads authentication records containing
timestamps, event types, usernames, IP addresses,
authentication statuses, and user-agent information.

It checks required fields, removes unnecessary
whitespace, normalizes selected string values,
and converts timestamps into Python datetime objects.

The parser also handles ISO-formatted timestamps that
end in `Z` by converting that suffix into a format
supported by `datetime.fromisoformat()`.

Malformed records are skipped and counted rather than
causing the entire analysis to stop.

This approach allows valid records to continue through
the detection pipeline while preserving information
about data-quality problems.

## Detection Engine

I implemented four detection rules to identify different
patterns of potentially suspicious authentication
behavior.

Each rule returns structured findings containing a
rule identifier, severity level, description, and
related authentication events.

### AUTH-001: Repeated Failed Logins

**Severity: High**

This rule identifies repeated failed authentication
attempts against the same username from the same
IP address.

The implementation groups failed login events using
a dictionary keyed by the IP address and username.

It then compares each group's number of events
against a configurable threshold.

When the threshold is reached, the rule generates a
finding containing the associated failed attempts.

This rule demonstrates dictionary-based grouping,
counting, and configurable threshold detection.

### AUTH-002: Possible Password Spraying

**Severity: Critical**

This rule identifies an IP address that generates
failed login attempts against multiple distinct
usernames.

The implementation groups failed authentication
activity by IP address and stores targeted usernames
in a Python set.

Using a set ensures that repeated attempts against
one username do not increase the distinct-account
count.

When the number of unique usernames reaches the
configured threshold, the analyzer produces a
finding with the relevant failed login events.

This rule demonstrates how choosing the correct
data structure improves detection logic.

### AUTH-003: Successful Login After Failures

**Severity: Critical**

This rule identifies a successful authentication
following multiple failed attempts involving the
same IP address and username.

The implementation sorts authentication events
chronologically and tracks failed attempts for
each IP-address and username pair.

When a successful login occurs after the configured
number of failures, the rule produces a finding
containing both the earlier failures and the success.

The tracked failures for that pair are then reset
after the successful login.

This rule demonstrates chronological event
processing and stateful detection logic.

### AUTH-004: Off-Hours Successful Login

**Severity: Medium**

This rule identifies successful authentication
events outside configured business hours.

The analyzer compares each successful login's
timestamp with the configured start and end hours.

By default, normal business hours begin at 08:00
and end at 18:00, with the end hour excluded.

A successful login outside that range creates a
finding containing the corresponding event.

This rule demonstrates time-based analysis and
configurable detection behavior.

An off-hours login is not automatically malicious;
it is an event that may warrant additional context
or investigation.

## Configurable Command-Line Interface

The application provides command-line options for
adjusting detection behavior without changing
the source code.

Supported configuration includes:

- Repeated failed-login threshold.
- Password-spraying username threshold.
- Success-after-failures threshold.
- Business-hour start and end times.
- Terminal text or JSON report output.
- Output path for generated JSON reports.

This flexibility allows the analyzer to be tested
with different detection settings and log datasets.

## Security Findings and Reporting

Detection rules return structured `Finding` objects
that contain rule IDs, titles, severity levels,
descriptions, and related events.

The reporting functionality uses these findings
to generate human-readable terminal output or
machine-readable JSON reports.

Reports also summarize processing information,
including the number of parsed events, malformed
rows, and detected findings.

Separating detection from reporting allows the
analysis logic to remain independent of its
output format.

## Engineering Challenges and Solutions

### 1. Handling Imperfect Log Data

**Challenge:** Authentication log files may contain
missing fields or invalid timestamps.

**Approach:** I added required-field validation,
timestamp conversion, normalized event objects,
and malformed-row tracking.

**Verification:** The project's test suite includes
coverage for timestamp parsing, valid CSV input,
and malformed-record handling.

This reinforced the importance of defensive
input processing when building data-analysis tools.

### 2. Implementing Distinct Detection Strategies

**Challenge:** Different suspicious authentication
patterns require different methods of analysis.

**Approach:** I used dictionary grouping for repeated
failures, sets for distinct usernames, chronological
sorting and state tracking for login sequences,
and time comparisons for off-hours activity.

**Verification:** The test suite includes scenarios
for each of the four detection rules.

This helped me understand how the choice of data
structure and algorithm should follow the behavior
being detected.

### 3. Keeping Detection and Reporting Separate

**Challenge:** Security analysis needs consistent
findings that can be presented in multiple formats.

**Approach:** I introduced structured event and
finding models, keeping the detection rules separate
from terminal and JSON reporting.

**Verification:** Automated tests cover JSON report
construction and file output.

This strengthened my understanding of modular
application design and separation of concerns.

## Testing and Validation

I created automated tests using Pytest to verify
the application's major processing stages.

The repository includes tests covering:

- Timestamp parsing.
- Valid CSV authentication records.
- Malformed-row handling.
- Repeated failed login detection.
- Possible password-spraying detection.
- Successful login after previous failures.
- Off-hours successful logins.
- JSON report generation and file output.

Sample authentication logs also provide input for
manual command-line testing.

## Limitations and Future Improvements

The analyzer is a rule-based tool for examining
supplied authentication logs. It does not prove
that an account was compromised.

The current threshold-based rules do not use bounded
time windows. Therefore, authentication events
occurring far apart in a log file can still
contribute to the same threshold.

The off-hours rule also compares the hour represented
in the parsed timestamp rather than applying a
separate configurable local timezone.

Potential future enhancements include:

- Time-window-based detection.
- Explicit timezone configuration.
- More detailed input-format validation.
- Additional authentication detection rules.
- Support for other log formats.

These are proposed improvements rather than
features currently implemented.

## What I Learned

This project strengthened my understanding of
Python programming, defensive data processing,
and rule-based security analysis.

My key takeaways were:

- Normalize external data before performing analysis.
- Choose data structures based on the detection problem.
- Use chronological state tracking when event order matters.
- Separate data parsing, detection, and reporting.
- Provide useful evidence with security findings.
- Test both valid behavior and malformed input.
- Recognize the limitations of threshold-based
  security detections.
