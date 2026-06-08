# Wiki: Candidate Persona — Priya Sharma

> **Published from:** [Shared design repository — candidate-persona.md](../../design/personas/candidate-persona.md)  
> **Story:** Define User Personas and Draft Detailed User Stories (`5c02ce1a-05aa-4724-b035-e037fdef5206`)  
> **Last synced:** 2026-05-28

This page is the **project wiki** entry for the Candidate persona. The canonical source is version-controlled under `docs/design/personas/`. Update the design repository first, then sync this wiki page.

---

## Background

**Priya Sharma** is a mid-career professional (7 years in customer success and operations) actively exploring roles while employed. She is 31, based in Denver, open to remote/hybrid work, and applies to 2–4 jobs per week on evenings and weekends.

---

## Goals

- Find relevant roles quickly with search and filters  
- Understand fit before applying (location, type, key requirements)  
- Submit complete applications with resume upload and clear confirmation  
- Track application status without emailing employers  
- Use the portal with keyboard, zoom, and assistive technology (WCAG 2.1 AA)  

---

## Frustrations

- Irrelevant search results and filters that reset  
- Silent apply failures on mobile or slow networks  
- No post-submit confirmation or status visibility  
- Resume upload rejected without clear guidance  
- Inaccessible forms (contrast, labels, keyboard traps)  
- Concern about resume privacy and unauthorized access  

---

## Job-search behavior

1. Search and browse listings  
2. Filter by location and job type  
3. Review job detail  
4. Sign in or register as Candidate  
5. Apply with resume  
6. Return later to check application status  

---

## Tech usage

| Area | Detail |
|------|--------|
| Devices | Android phone for browse; laptop for apply |
| Assistive tech | Keyboard navigation; 125–150% zoom; occasional screen reader |
| Files | PDF resume; needs stated file type/size limits |
| Performance | Expects search pages within LCP ≤ 2s (lab reference profile) |
| Security | Secure sessions; logout on shared devices |

---

## Accessibility needs

- WCAG 2.1 Level AA on search, detail, apply, and status flows  
- Visible focus, labeled fields, associated errors  
- Dynamic status announced where applicable (`4.1.3`)  
- Reflow at 320px without horizontal scroll  

---

## Application expectations

- Required fields validated before submit  
- Upload progress and success confirmation  
- “My applications” list with plain-language statuses  
- Resume visible only to the employer for that job  

---

## Requirement traceability

| Need | IDs |
|------|-----|
| Search / filter | `FR-CAN-001`, `FR-CAN-002`, `REQ-CAN-001` |
| Apply + resume | `FR-CAN-003`, `REQ-CAN-002` |
| Status tracking | `FR-CAN-004`, `REQ-CAN-003` |
| Auth | `FR-AUTH-001`, `REQ-AUTH-001` |
| A11y / performance | `FR-UI-002`, `REQ-NFR-A11Y-001`, `REQ-NFR-PERF-001` |

**Full persona:** [candidate-persona.md](../../design/personas/candidate-persona.md)
