# Requirements Traceability Matrix — Job Portal MVP

This matrix links each requirement identifier to one or more user story identifiers. Use it in Confluence by copying the **Confluence storage / wiki table** block below, or paste the **Markdown table** into Confluence if your space supports Markdown.

**Source note:** Requirement and story IDs align with [functional requirements](../docs/requirements-specification/functional-requirements-section.md) (`FR-*`), [user stories](../docs/requirements/user-stories.md) (`US-*` with acceptance criteria), and [personas](../docs/design/personas/README.md). Update this matrix when backlog IDs change before formal sign-off (`REQ-DOC-002`).

---

## Markdown table (review & version control)

| Requirement ID | Description | User Story ID(s) |
|----------------|-------------|-------------------|
| REQ-AUTH-001 | Provide secure authentication for Employer, Candidate, and Admin roles. | US-001, US-002, US-003 |
| REQ-AUTH-002 | Enforce role-based access so users only access features and data permitted for their role. | US-004 |
| REQ-EMP-001 | Employer can create, edit, publish, and retire job listings. | US-005 |
| REQ-EMP-002 | Employer can view, sort, and manage applications submitted to their listings. | US-006 |
| REQ-CAN-001 | Candidate can search and filter job listings. | US-007 |
| REQ-CAN-002 | Candidate can submit applications with resume upload. | US-008 |
| REQ-CAN-003 | Candidate can track status of submitted applications. | US-009 |
| REQ-ADM-001 | Admin can manage user accounts (create, disable, roles as applicable). | US-010 |
| REQ-ADM-002 | Admin can moderate job listings and related content. | US-011 |
| REQ-ADM-003 | Admin can configure system settings within defined policy. | US-012 |
| REQ-ADM-004 | Admin can access reporting for operations and compliance needs. | US-013 |
| REQ-NFR-A11Y-001 | User interface meets **WCAG 2.1 Level AA** for responsive layouts and accessibility. | US-014 |
| REQ-NFR-SEC-001 | Apply security best practices for authentication, authorization, data protection, and secure configuration. | US-015 |
| REQ-NFR-PERF-001 | Meet agreed performance and scalability targets for MVP workloads. | US-016 |
| REQ-NFR-OPS-001 | Support cloud-native deployment with **CI/CD**: automated tests, linting, security scans, and continuous delivery. | US-017 |
| REQ-DOC-001 | Compile functional, security, performance, and accessibility requirements with this traceability matrix into a version-controlled specification package. | US-018 |
| REQ-DOC-002 | Obtain formal approval of the specification package from Product Owner and Project Manager. | US-018 |

---

## Confluence wiki table (copy into Confluence editor)

Paste into Confluence **Wiki Markup** or use **Insert → Markup** if your instance still supports it. For **Confluence Cloud**, use the Markdown table above or Confluence’s native table and paste row-by-row.

```
||Requirement ID||Description||User Story ID(s)||
|REQ-AUTH-001|Provide secure authentication for Employer, Candidate, and Admin roles.|US-001, US-002, US-003|
|REQ-AUTH-002|Enforce role-based access so users only access features and data permitted for their role.|US-004|
|REQ-EMP-001|Employer can create, edit, publish, and retire job listings.|US-005|
|REQ-EMP-002|Employer can view, sort, and manage applications submitted to their listings.|US-006|
|REQ-CAN-001|Candidate can search and filter job listings.|US-007|
|REQ-CAN-002|Candidate can submit applications with resume upload.|US-008|
|REQ-CAN-003|Candidate can track status of submitted applications.|US-009|
|REQ-ADM-001|Admin can manage user accounts (create, disable, roles as applicable).|US-010|
|REQ-ADM-002|Admin can moderate job listings and related content.|US-011|
|REQ-ADM-003|Admin can configure system settings within defined policy.|US-012|
|REQ-ADM-004|Admin can access reporting for operations and compliance needs.|US-013|
|REQ-NFR-A11Y-001|User interface meets WCAG 2.1 Level AA for responsive layouts and accessibility.|US-014|
|REQ-NFR-SEC-001|Apply security best practices for authentication, authorization, data protection, and secure configuration.|US-015|
|REQ-NFR-PERF-001|Meet agreed performance and scalability targets for MVP workloads.|US-016|
|REQ-NFR-OPS-001|Support cloud-native deployment with CI/CD: automated tests, linting, security scans, and continuous delivery.|US-017|
|REQ-DOC-001|Compile functional, security, performance, and accessibility requirements with this traceability matrix into a version-controlled specification package.|US-018|
|REQ-DOC-002|Obtain formal approval of the specification package from Product Owner and Project Manager.|US-018|
```

---

## User story reference (for ID alignment)

Detailed **As a / I want / So that** stories and acceptance criteria: [docs/requirements/user-stories.md](../docs/requirements/user-stories.md).

| User Story ID | Title / scope | Primary persona |
|---------------|----------------|-----------------|
| US-001 | Employer registration and authentication | Jordan Reyes (Employer) |
| US-002 | Candidate registration and authentication | Priya Sharma (Candidate) |
| US-003 | Admin authentication and access | Morgan Lee (Admin) |
| US-004 | Role-based access control | All |
| US-005 | Employer job posting and listing management | Employer |
| US-006 | Employer application management | Employer |
| US-007 | Candidate job search and filters | Candidate |
| US-008 | Candidate apply with resume upload | Candidate |
| US-009 | Candidate application status tracking | Candidate |
| US-010 | Admin user management | Admin |
| US-011 | Admin content moderation | Admin |
| US-012 | Admin system settings | Admin |
| US-013 | Admin reporting | Admin |
| US-014 | Responsive UI and WCAG 2.1 AA | All |
| US-015 | Security and data protection | All |
| US-016 | Performance and scalability | All |
| US-017 | CI/CD and cloud deployment | Operations |
| US-018 | Finalize requirements specification document and obtain sign-off | PO / PM |

---

## Product Owner validation (completeness)

Use this checklist with the Product Owner; step 3 of your process is satisfied when these are explicitly confirmed or updated.

1. **Coverage:** Every requirement in the authoritative Requirements Document appears in the matrix (add rows for any missing REQ IDs).
2. **Backlog alignment:** Every `US-*` in the matrix exists in the backlog with matching intent; split or merge stories if IDs change.
3. **Multi-story requirements:** For REQ rows with multiple story IDs, confirm each story is necessary or narrow the mapping.
4. **NFRs:** Performance, security, and accessibility targets are documented elsewhere (e.g. NFR annex) and referenced from REQ-NFR-* rows.
5. **Sign-off:** Record approval of the matrix together with the specification package (REQ-DOC-002).

---

## Traceability summary

| Category | Requirement IDs |
|----------|-------------------|
| Authentication & authorization | REQ-AUTH-001, REQ-AUTH-002 |
| Employer | REQ-EMP-001, REQ-EMP-002 |
| Candidate | REQ-CAN-001, REQ-CAN-002, REQ-CAN-003 |
| Admin | REQ-ADM-001 – REQ-ADM-004 |
| Non-functional | REQ-NFR-A11Y-001, REQ-NFR-SEC-001, REQ-NFR-PERF-001, REQ-NFR-OPS-001 |
| Documentation / governance | REQ-DOC-001, REQ-DOC-002 |
