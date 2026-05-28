# Job Portal MVP — Non-Functional Requirements

This document defines **security**, **performance**, and **accessibility** non-functional requirements (NFRs) for the Job Portal MVP. Each subsection includes **measurable criteria** and **testable acceptance criteria** suitable for verification, audit, and sign-off.

---

## 1. Security

**Objective:** Protect confidentiality, integrity, and availability of user data and platform operations, aligned with common web application risks as categorized by the **OWASP Top 10** (2021).

### 1.1 Measurable criteria (OWASP Top 10 mapping)

| OWASP category | Requirement (measurable) |
|----------------|---------------------------|
| **A01:2021 – Broken Access Control** | Every API and UI route enforces **role-based access** (Employer, Candidate, Admin). Object-level checks prevent one tenant from accessing another’s jobs, applications, or documents by ID tampering. |
| **A02:2021 – Cryptographic Failures** | Passwords stored with a **modern adaptive hash** (e.g. Argon2id or bcrypt with appropriate cost). **TLS 1.2+** for all browser and API traffic. Sensitive data at rest encrypted where stored (DB fields, object storage) per platform policy. |
| **A03:2021 – Injection** | User-controlled input is **parameterized** or ORM-bound; no string-concatenated SQL. HTML output is **context-escaped**; rich text (if any) uses an allowlist sanitizer. |
| **A04:2021 – Insecure Design** | Threat modeling notes for auth, file upload, and admin actions are documented; **least privilege** is default for service accounts and API keys. |
| **A05:2021 – Security Misconfiguration** | Production builds disable debug endpoints and verbose errors to clients. **Security headers** (e.g. `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`) applied per baseline. Dependencies scanned in CI for known CVEs. |
| **A06:2021 – Vulnerable and Outdated Components** | **Dependency inventory** maintained; **automated scans** (e.g. SCA) in CI; critical/high findings triaged before release. |
| **A07:2021 – Identification and Authentication Failures** | Session tokens or JWTs use **secure, HttpOnly, SameSite** cookies where applicable; **rate limiting** on login and password reset; **account lockout or backoff** after repeated failures (configurable). |
| **A08:2021 – Software and Data Integrity Failures** | CI pipeline and artifacts are **integrity-protected** (signed commits or protected branches as policy allows); third-party scripts minimized and pinned. |
| **A09:2021 – Security Logging and Monitoring Failures** | **Authentication failures**, privilege denials, and admin actions are logged with timestamp, actor, and outcome. Logs avoid storing secrets or full PII unnecessarily. |
| **A10:2021 – Server-Side Request Forgery (SSRF)** | Any URL fetch by the server (webhooks, imports) uses **allowlists** or strict validation; no arbitrary internal network access from user-supplied URLs. |

### 1.2 Testable acceptance criteria (security)

- **AC-S1 (Access control):** Automated and/or manual tests confirm that a Candidate cannot access Employer-only or Admin-only endpoints and UI routes; attempting forbidden actions returns **403** (or equivalent) without leaking existence of resources where policy requires opacity.
- **AC-S2 (Object-level authorization):** Given two Employer accounts, Employer A cannot read, update, or delete Employer B’s job postings or applications by changing resource IDs in requests.
- **AC-S3 (AuthN session):** After logout, session/JWT cannot be reused to access protected resources. Password reset flow invalidates active sessions if required by policy.
- **AC-S4 (Injection):** Security tests (DAST or guided manual) show no exploitable SQLi or reflected/stored XSS on MVP surfaces; file uploads reject executable content types per configured rules.
- **AC-S5 (Headers & TLS):** Production deployment passes an automated scan (e.g. SSL Labs grade **A** or org equivalent) and header checks against the agreed baseline.
- **AC-S6 (Dependencies):** CI fails or blocks release on policy-defined **critical** SCA findings; a current report is archived with the release artifact.
- **AC-S7 (Logging):** Sample audit confirms failed logins and admin actions are present in logs with required fields; logs contain no plaintext passwords or tokens.

---

## 2. Performance

**Objective:** Deliver a responsive user experience such that primary pages load within **≤ 2 seconds** under defined conditions.

### 2.1 Measurable criteria

| Metric | Target | Measurement context |
|--------|--------|---------------------|
| **Initial page load (LCP)** | **≤ 2.0 s** at **p75** | Lab: Lighthouse or WebPageTest on agreed **reference pages** (e.g. login, job search, job detail, employer dashboard shell) over **cable-class** throttling or org-standard profile. |
| **Time to Interactive (TTI)** | **≤ 2.5 s** at **p75** (recommended companion) | Same pages/context; ensures interactivity is not deferred far beyond LCP. |
| **API latency (server)** | **≤ 300 ms** at **p95** for standard read operations | Measured server-side or via APM for representative GET endpoints (e.g. job list, single job) excluding cold start, with **warm** instances. |
| **Error budget** | **≥ 99.5%** successful HTTP **2xx/3xx** for MVP scope | Monthly or per-release window, production monitoring. |

**Scope note:** “Page load” applies to **above-the-fold meaningful content** (LCP element) on reference pages; heavy assets deferred below the fold should not block the LCP budget. File upload and batch report flows may have separate SLAs documented elsewhere.

### 2.2 Testable acceptance criteria (performance)

- **AC-P1 (LCP budget):** On each agreed reference page, **three consecutive** lab runs on the standard profile achieve **LCP ≤ 2.0 s**; **p75** across a **minimum of 20** runs per page meets **≤ 2.0 s** before sign-off.
- **AC-P2 (Regression gate):** CI or scheduled synthetic checks alert if LCP on reference pages regresses **> 10%** from the signed baseline without explicit approval.
- **AC-P3 (API budget):** Load or APM evidence shows **p95** latency for designated read APIs **≤ 300 ms** under agreed test load (e.g. **50 RPS** sustained **5 minutes** on staging with production-like data volume order-of-magnitude).
- **AC-P4 (Availability):** Production monitoring shows **≥ 99.5%** successful responses for MVP routes over the first month post-launch (or agreed window), excluding planned maintenance.

---

## 3. Accessibility

**Objective:** The web application conforms to **WCAG 2.1 Level AA** for MVP user-facing flows.

### 3.1 Measurable criteria

| WCAG theme | Requirement (measurable) |
|------------|---------------------------|
| **Perceivable** | Non-text content has **text alternatives**; **1.4.3 Contrast (Minimum)** met (4.5:1 normal text); **1.4.4 Resize text** to 200% without loss of content or functionality; **1.4.10 Reflow** at 320 CSS px width without horizontal scroll for content. |
| **Operable** | All functionality available from **keyboard** only; **2.4.7 Focus Visible**; **2.1.2 No Keyboard Trap**; **2.2.1 Timing Adjustable** where time limits exist; **2.4.4 Link Purpose (In Context)** clear. |
| **Understandable** | **3.3.1 Error Identification** and **3.3.2 Labels or Instructions** for forms; **3.2.4 Consistent Identification** for components. |
| **Robust** | **4.1.2 Name, Role, Value** for UI components; **4.1.3 Status Messages** for dynamic updates where applicable. |

**Scope:** Employer, Candidate, and Admin **core flows** in MVP (authentication, job search, apply, employer job management, admin user listing) are in scope unless explicitly excluded with rationale.

### 3.2 Testable acceptance criteria (accessibility)

- **AC-A1 (Automated scan):** Agreed pages pass **axe-core** (or equivalent) with **zero WCAG 2.1 AA violations** in automated ruleset, or each violation is documented with **remediation or exception** approved by Product Owner.
- **AC-A2 (Manual / semi-manual):** A **keyboard-only** walkthrough completes primary flows without traps; focus order is logical; visible focus on interactive elements.
- **AC-A3 (Contrast):** Spot-check plus tool verification: text/graphics meeting **1.4.3** and **1.4.11** (non-text contrast) for UI controls in scope.
- **AC-A4 (Screen reader):** Primary flows are usable with at least one **supported screen reader** + browser combo (documented in test plan), including form errors and dynamic status updates (**4.1.3**).
- **AC-A5 (Documentation):** An **accessibility statement** or conformance summary lists scope, known limitations, and contact for feedback (process NFR).

---

## Document control

| Field | Value |
|-------|--------|
| **Project** | Job Portal MVP |
| **Related epic** | Requirements & Specification Documentation |
| **Review** | Product Owner, Project Manager (sign-off per release checklist) |

*This NFR document is intended to be version-controlled with the specification package and updated when metrics or tooling baselines change.*
