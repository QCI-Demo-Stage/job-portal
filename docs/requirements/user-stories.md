# User Stories and Acceptance Criteria — Job Portal MVP

**Project:** Job Portal MVP  
**Story:** Define User Personas and Draft Detailed User Stories (`5c02ce1a-05aa-4724-b035-e037fdef5206`)  
**Task:** Draft User Stories and Acceptance Criteria (`a2386df9-ecc7-4f2a-abf5-dcb5e618ecc8`)  
**Version:** 1.0  
**Personas:** [Employer](../design/personas/employer-persona.md) · [Candidate](../design/personas/candidate-persona.md) · [Admin](../design/personas/admin-persona.md)

Stories use **As a… / I want… / So that…** format. Each story links to **functional** (`FR-*`), **matrix** (`REQ-*`), and **non-functional** acceptance criteria where applicable.

---

## Authentication and authorization

### US-001 — Employer registration and login

**Persona:** Jordan Reyes (Employer)  
**Requirement IDs:** `FR-AUTH-001`, `FR-AUTH-002`, `REQ-AUTH-001`

**Story:** As an **Employer**, I want to **register and sign in with my employer role**, so that **I can manage job listings and applications securely**.

| Type | Acceptance criteria |
|------|---------------------|
| Functional | Given valid registration data, when I complete employer signup, then my account has the Employer role and I reach the employer dashboard. |
| Functional | Given valid credentials, when I log in, then I receive an authenticated session and see employer-only navigation. |
| Security | Given invalid credentials, when I attempt login repeatedly, then the system applies rate limiting/backoff per `AC-S7` and does not reveal whether the email exists beyond policy. |
| Security | Passwords are stored with an adaptive hash (Argon2id or bcrypt); sessions use secure cookie flags where applicable (`REQ-NFR-SEC-001`). |
| Performance | Login page LCP ≤ 2.0s at p75 on reference lab profile (`AC-P1`). |
| Accessibility | Login and registration forms have associated labels, keyboard-operable controls, and identifiable errors (`AC-A1`, `AC-A2`). |

---

### US-002 — Candidate registration and login

**Persona:** Priya Sharma (Candidate)  
**Requirement IDs:** `FR-AUTH-001`, `FR-AUTH-002`, `REQ-AUTH-001`

**Story:** As a **Candidate**, I want to **register and sign in**, so that **I can apply to jobs and track my applications**.

| Type | Acceptance criteria |
|------|---------------------|
| Functional | Given valid registration data, when I complete candidate signup, then my account has the Candidate role. |
| Functional | Given I am authenticated, when I open protected candidate routes, then I can access search, apply, and my applications. |
| Security | After logout, my session token cannot access protected resources (`AC-S3`). |
| Performance | Authentication API read paths (post-login profile) p95 ≤ 300ms under agreed test load (`AC-P3`). |
| Accessibility | I can complete registration using keyboard only without traps (`AC-A2`). |

---

### US-003 — Admin authentication and access

**Persona:** Morgan Lee (Admin)  
**Requirement IDs:** `FR-AUTH-001`, `FR-AUTH-002`, `REQ-AUTH-001`

**Story:** As an **Admin**, I want to **sign in with admin privileges**, so that **I can moderate content and manage users**.

| Type | Acceptance criteria |
|------|---------------------|
| Functional | Given admin credentials, when I log in, then I reach the admin console with admin-only menu items. |
| Security | Admin routes return **403** for Employer and Candidate sessions (`AC-S1`). |
| Security | Failed admin logins are logged with timestamp and outcome without storing passwords (`AC-S7`). |
| Accessibility | Admin login meets WCAG 2.1 AA on automated axe scan or documented exception (`AC-A1`). |

---

### US-004 — Role-based access control

**Personas:** All  
**Requirement IDs:** `FR-AUTH-001`, `REQ-AUTH-002`

**Story:** As a **platform user**, I want **features and data limited to my role**, so that **other users cannot access my confidential information**.

| Type | Acceptance criteria |
|------|---------------------|
| Functional | Employer UI routes are inaccessible to Candidate and Admin roles except where explicitly shared (e.g. public job browse). |
| Security | Automated tests confirm forbidden API calls return **403** (`AC-S1`). |
| Security | Employer A cannot read or modify Employer B’s jobs or applications by ID tampering (`AC-S2`). |
| Security | Candidates cannot access employer dashboards or admin consoles. |

---

## Employer stories

### US-005 — Employer job posting and listing management

**Persona:** Jordan Reyes (Employer)  
**Requirement IDs:** `FR-EMP-001`, `FR-EMP-002`, `REQ-EMP-001`

**Story:** As an **Employer**, I want to **create, edit, publish, and withdraw job listings**, so that **I can keep open roles accurate and stop hiring when a position is filled**.

| Type | Acceptance criteria |
|------|---------------------|
| Functional | Given required fields (per data model), when I save a new job, then it is stored as draft or published per my action. |
| Functional | Given a published job I own, when I edit fields and save, then candidates see updated content in search/detail. |
| Functional | Given a published job I own, when I withdraw/close it, then it no longer accepts applications and is marked closed in employer views. |
| Security | I cannot edit or withdraw another employer’s job (`AC-S2`). |
| Performance | Employer dashboard shell LCP ≤ 2.0s at p75 (`AC-P1`). |
| Accessibility | Create/edit forms expose labels, errors, and focus order per WCAG 3.3.x (`AC-A2`, `AC-A3`). |

---

### US-006 — Employer application management

**Persona:** Jordan Reyes (Employer)  
**Requirement IDs:** `FR-EMP-003`, `REQ-EMP-002`

**Story:** As an **Employer**, I want to **view and update application status for my jobs**, so that **I can move candidates through our hiring pipeline**.

| Type | Acceptance criteria |
|------|---------------------|
| Functional | Given applications exist for my job, when I open the job’s application list, then I see applicant identifier, submitted date, and current status. |
| Functional | Given an application I own, when I set status to an allowed MVP value (e.g. Submitted, Under review, Interview, Declined, Closed), then the candidate sees the updated status in their portal. |
| Security | Resume files are only downloadable/viewable by the owning employer for that application. |
| Performance | Application list API p95 ≤ 300ms for agreed read load (`AC-P3`). |
| Accessibility | Status controls are keyboard operable with visible focus (`AC-A2`). |

---

## Candidate stories

### US-007 — Candidate job search and filters

**Persona:** Priya Sharma (Candidate)  
**Requirement IDs:** `FR-CAN-001`, `FR-CAN-002`, `REQ-CAN-001`

**Story:** As a **Candidate**, I want to **search and filter job listings**, so that **I can find roles that match my location and preferences**.

| Type | Acceptance criteria |
|------|---------------------|
| Functional | Given published jobs, when I enter search terms, then results include matching titles/descriptions per agreed search rules. |
| Functional | Given filter criteria (MVP: location, job type), when I apply filters, then the result set updates and filters persist until I clear them. |
| Performance | Job search reference page LCP ≤ 2.0s at p75; regression gate ≤ 10% from baseline (`AC-P1`, `AC-P2`). |
| Accessibility | Search and filters work with keyboard; contrast meets 1.4.3 (`AC-A2`, `AC-A3`). |

---

### US-008 — Candidate apply with resume upload

**Persona:** Priya Sharma (Candidate)  
**Requirement IDs:** `FR-CAN-003`, `REQ-CAN-002`

**Story:** As a **Candidate**, I want to **apply to a job with my resume**, so that **employers receive my materials in one submission**.

| Type | Acceptance criteria |
|------|---------------------|
| Functional | Given an open job, when I submit the apply form with required fields and a valid resume file, then an application record is created and I see a success confirmation. |
| Functional | Given an invalid file type or size, when I submit, then I see a specific error and the application is not created. |
| Security | Uploaded files reject executable content types per upload policy (`AC-S4`). |
| Performance | Apply submission completes with user-visible feedback within agreed UX timeout; upload errors return without hanging UI. |
| Accessibility | File input has accessible name/instructions; errors are programmatically associated (`AC-A2`, `AC-A4`). |

---

### US-009 — Candidate application status tracking

**Persona:** Priya Sharma (Candidate)  
**Requirement IDs:** `FR-CAN-004`, `REQ-CAN-003`

**Story:** As a **Candidate**, I want to **see the status of my applications**, so that **I know whether employers are still considering me**.

| Type | Acceptance criteria |
|------|---------------------|
| Functional | Given I have submitted applications, when I open “My applications”, then I see job title, employer name (if policy allows), submitted date, and current status. |
| Functional | Given an employer updates my application status, when I refresh or revisit the list, then I see the new status label in plain language. |
| Security | I cannot view other candidates’ applications (`AC-S1`). |
| Accessibility | Status changes use live regions or status messages where updated dynamically (`4.1.3`, `AC-A4`). |

---

## Admin stories

### US-010 — Admin user management

**Persona:** Morgan Lee (Admin)  
**Requirement IDs:** `FR-ADM-001`, `REQ-ADM-001`

**Story:** As an **Admin**, I want to **create, disable, and assign roles to user accounts**, so that **I can onboard customers and stop abuse quickly**.

| Type | Acceptance criteria |
|------|---------------------|
| Functional | Given admin permissions, when I create a user with a role, then the user can authenticate with that role’s capabilities. |
| Functional | Given a user account, when I disable it, then login fails and active sessions are invalidated per policy. |
| Security | Admin user-management actions are audit-logged with actor, target, and outcome (`AC-S7`). |
| Accessibility | User management tables/forms meet WCAG 2.1 AA for keyboard and screen reader spot-check (`AC-A4`). |

---

### US-011 — Admin content moderation

**Persona:** Morgan Lee (Admin)  
**Requirement IDs:** `FR-ADM-002`, `REQ-ADM-002`

**Story:** As an **Admin**, I want to **moderate job listings and related content**, so that **the marketplace stays trustworthy and policy-compliant**.

| Type | Acceptance criteria |
|------|---------------------|
| Functional | Given a flagged or reported listing, when I open moderation detail, then I see listing content, employer, and flag reason. |
| Functional | Given a policy violation, when I remove or suspend a listing, then it is hidden from candidate search and the action is recorded. |
| Security | Only admins can perform moderation actions (`AC-S1`). |
| Performance | Moderation queue page loads within LCP budget on reference profile (`AC-P1`). |

---

### US-012 — Admin system settings

**Persona:** Morgan Lee (Admin)  
**Requirement IDs:** `FR-ADM-003`, `REQ-ADM-003`

**Story:** As an **Admin**, I want to **view and update MVP system settings**, so that **operations can adjust limits and behavior without a code deploy**.

| Type | Acceptance criteria |
|------|---------------------|
| Functional | Given defined MVP settings (e.g. max upload size, maintenance message), when I save valid values, then they apply to subsequent requests. |
| Security | Settings changes require admin role and are audit-logged. |
| Functional | Invalid values are rejected with validation messages and do not partially apply. |

---

### US-013 — Admin reporting

**Persona:** Morgan Lee (Admin)  
**Requirement IDs:** `FR-ADM-004`, `REQ-ADM-004`

**Story:** As an **Admin**, I want to **access operational reports**, so that **leadership can monitor usage and compliance**.

| Type | Acceptance criteria |
|------|---------------------|
| Functional | Given admin access, when I open MVP reports, then I see agreed metrics (e.g. new users, active listings, applications) for a selectable date range. |
| Functional | Given export is in scope, when I export, then I receive CSV (or documented format) without unrelated PII columns. |
| Security | Report endpoints enforce admin-only access (`AC-S1`). |
| Performance | Standard report generation completes within agreed timeout on staging data volume. |

---

## Cross-cutting non-functional stories

### US-014 — Responsive UI and WCAG 2.1 AA

**Personas:** All (emphasis: Candidate)  
**Requirement IDs:** `FR-UI-001`, `FR-UI-002`, `REQ-NFR-A11Y-001`

**Story:** As a **user**, I want **the interface to work on mobile and desktop and meet accessibility standards**, so that **I can complete tasks regardless of device or ability**.

| Type | Acceptance criteria |
|------|---------------------|
| Functional | Core flows render usable layouts from 320px to desktop widths without loss of primary actions (`FR-UI-001`). |
| Accessibility | Reference pages pass axe with zero WCAG 2.1 AA violations or approved exceptions (`AC-A1`). |
| Accessibility | Keyboard walkthrough of auth, search, apply, employer job management, and admin user list succeeds (`AC-A2`). |
| Accessibility | Accessibility statement documents scope and contact (`AC-A5`). |

---

### US-015 — Security and data protection

**Personas:** All  
**Requirement IDs:** `FR-AUTH-002`, `REQ-NFR-SEC-001`

**Story:** As a **stakeholder**, I want **the platform to follow security best practices**, so that **user data and operations are protected**.

| Type | Acceptance criteria |
|------|---------------------|
| Security | RBAC and object-level authorization tests pass (`AC-S1`, `AC-S2`). |
| Security | TLS 1.2+ in production; security headers baseline (`AC-S5`). |
| Security | CI blocks or triages critical dependency findings (`AC-S6`). |
| Security | No SQLi/XSS on MVP surfaces in agreed security testing (`AC-S4`). |

---

### US-016 — Performance and scalability

**Personas:** All (emphasis: Candidate search)  
**Requirement IDs:** `REQ-NFR-PERF-001`

**Story:** As a **user**, I want **pages and APIs to respond quickly**, so that **I stay engaged and complete tasks without delay**.

| Type | Acceptance criteria |
|------|---------------------|
| Performance | Reference pages meet LCP ≤ 2.0s at p75 (`AC-P1`). |
| Performance | LCP regression ≤ 10% without approval (`AC-P2`). |
| Performance | Designated read APIs p95 ≤ 300ms under agreed load (`AC-P3`). |
| Performance | ≥ 99.5% successful HTTP responses for MVP routes in monitoring window (`AC-P4`). |

---

### US-017 — CI/CD and cloud deployment

**Personas:** Morgan Lee (Admin) / engineering stakeholders  
**Requirement IDs:** `REQ-NFR-OPS-001`

**Story:** As an **operator**, I want **automated build, test, and deploy pipelines**, so that **releases are repeatable and scanned for quality and security**.

| Type | Acceptance criteria |
|------|---------------------|
| Functional | CI runs unit/integration tests and lint on each merge to main. |
| Security | Dependency scanning runs in CI per `AC-S6`. |
| Functional | Deployment pipeline promotes artifacts to staging/production with documented rollback. |

---

### US-018 — Finalize specification package and sign-off

**Personas:** Product Owner, Project Manager  
**Requirement IDs:** `FR-REL-001`, `FR-REL-002`, `REQ-DOC-001`, `REQ-DOC-002`

**Story:** As a **Product Owner**, I want **a complete, traceable specification package**, so that **the team can implement and verify the MVP with shared understanding**.

| Type | Acceptance criteria |
|------|---------------------|
| Functional | Personas, user stories, functional requirements, NFRs, and traceability matrix are in version control and cross-linked. |
| Functional | Every `REQ-*` in the matrix maps to at least one `US-*` with acceptance criteria. |
| Governance | Product Owner and Project Manager sign-off recorded for specification package (`REQ-DOC-002`). |

---

## Product Owner review (completeness)

**Review date:** 2026-05-28  
**Reviewer:** Product Owner (Job Portal MVP)  
**Outcome:** **Approved for MVP backlog refinement** — pending formal sign-off with PM on full specification package (`US-018`).

| Check | Status | Notes |
|-------|--------|-------|
| All three personas represented in stories | ✅ | US-001–US-013 map to Jordan, Priya, Morgan |
| Each core `FR-*` covered by at least one story | ✅ | See traceability matrix |
| Security ACs reference NFR `AC-S*` | ✅ | US-001–US-004, US-015 |
| Performance ACs reference NFR `AC-P*` | ✅ | US-007, US-016 |
| Accessibility ACs reference NFR `AC-A*` | ✅ | US-002, US-007, US-008, US-014 |
| Requirement IDs on every story | ✅ | FR-* and REQ-* in each header |
| Gaps / follow-up | ⚠️ | Exact filter list and application status enum to be finalized in UX; interview transcripts to be linked when available |

**PO comment:** Stories are sufficient to seed sprint planning. Split US-005/US-008 if implementation teams need smaller increments.

---

## Story index by persona

| Persona | Story IDs |
|---------|-----------|
| Employer (Jordan) | US-001, US-004, US-005, US-006 |
| Candidate (Priya) | US-002, US-004, US-007, US-008, US-009, US-014, US-016 |
| Admin (Morgan) | US-003, US-004, US-010, US-011, US-012, US-013 |
| Governance | US-015, US-017, US-018 |
