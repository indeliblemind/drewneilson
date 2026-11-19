# Markdown content reference

Create one `.md` file in `src/content/pieces`, fill in relevant YAML frontmatter, then write below the second `---`. No companion file is required. Use `templates/job.md`, `templates/project.md`, or `templates/idea.md`; `templates/node.md` is the general walkthrough.

Only **title, kind, and summary** are required. Every other field is optional. Minimal valid example:

```yaml
---
title: "A fictional subject"
kind: project
summary: "A short description."
---

Write here in ordinary Markdown.
```

This minimal record is a draft. Add `draft: false` to make it visible locally. Missing lists default to `[]`; missing new text fields remain absent. Descriptor fields do not generate article-body headings. The opening uses `headline` when provided and appends only explicitly supplied `headlineHighlights`. Use the body for quotations, images, experiments, and narrative sections. Descriptors are plain strings; use YAML `|` or `>` for multiline text.

## Common fields

| Field | Meaning / behavior | Required? |
| --- | --- | --- |
| title | Record name; page title and fallback map label/employer | Yes |
| kind | `job`, `project`, or `idea` | Yes |
| summary | Short description used in existing previews and pages | Yes |
| label | Short map/directory label; title is fallback | No |
| subtitle | Secondary description, stored for future display | No; new |
| headline | Interior headline; falls back to title. Record name/previews remain unchanged | No |
| headlineHighlights | List of explicit ochre headline lines appended after the plain headline; omit for no highlights | No; default `[]` |
| introduction | Interior opening summary; falls back to summary. Use `""` to omit the introduction | No |
| startDate | Quoted `YYYY` or `YYYY-MM`; timeline start for Jobs | No |
| endDate | Quoted `YYYY` or `YYYY-MM`; omit for ongoing work | No |
| period | Readable chronology fallback; existing parser recognizes year ranges | No |
| status | Real-world subject/project status; does not control visibility | No |
| topics | General topic strings; not the current competency buttons | No; default `[]` |
| competencies | IDs from `src/data/competencies.ts`; current synchronized map/résumé filters | No; default `[]` |
| connections | Existing typed outgoing relationships (details below) | No; default `[]` |
| accomplishments | Existing structured résumé evidence; nonempty lists on Jobs/Projects only | No; default `[]` |
| draft | Publication control; true excludes page/node and visible connections | No; default `true` |
| attribution | Existing collaborator/contribution credit, rendered on record page | No |

The small opening label uses `recordClass` when provided (for example, “Case study”), otherwise the node kind, followed by `label` or `title`.

The single collection keeps all fields available without introducing type-specific databases. The fields below are conventions for the corresponding kind, not extra required form sections. Existing `role` remains accepted on any kind.

## Job fields

| Field | Meaning / behavior | Required? |
| --- | --- | --- |
| employer | Organization name in résumé context; blank/omitted falls back to title | No; new |
| role | Existing role/contribution text | No |
| location | Geographic location or descriptive location | No; new |
| workArrangement | Free text, e.g. `remote`, `hybrid`, `on-site` | No; new |
| employmentType | Free text, e.g. employee, contractor, self-employed | No; new |

## Project fields

| Field | Meaning | Required? |
| --- | --- | --- |
| recordClass | Free-text classification, e.g. experiment, production, initiative, organization founding | No; new |
| problem | Problem or opportunity | No; new |
| hypothesis | Intended outcome or assumption | No; new |
| approach | What was attempted | No; new |
| outcome | What actually happened | No; new |
| lessons | Optional conclusions | No; new |

## Idea fields

| Field | Meaning | Required? |
| --- | --- | --- |
| proposition | Central statement or question | No; new |
| origin | Origin or context | No; new |
| limitations | Qualifications, uncertainty, or counterexamples | No; new |

All new descriptors are stored metadata, ready for future use; they add no map controls, page sections, or résumé headings. Only employer has a display integration, using an existing résumé slot.

## Relationships

Each `connections` entry requires `to` (existing filename ID without `.md`) and `relation`: `part-of`, `led-to`, `informed`, or `related`. Optional `note` explains the relationship. Read direction from this record to the target; reverse wording is automatic. Record a connection once. Self-links, unknown targets, and duplicate links fail validation. Links involving drafts stay hidden.

## Résumé evidence

Each `accomplishments` entry requires `id` (lowercase words/digits separated by hyphens, unique within this record) and nonempty `text` (canonical wording). Optional `competencies` defaults to `[]`; `default` defaults to `false`; `priority` defaults to `0` (higher breaks relevance ties first); `supporting` is an existing record ID and otherwise links to the parent. Supporting drafts fall back to the parent link. Evidence is nested in its Job/Project, never a map node. Ideas can omit this field or use `[]`; nonempty Idea accomplishments retain the existing validation error.

Competencies currently available: `operations`, `process-improvement`, `experience-design`, `communication`, `strategic-planning`. Selections match ANY selected competency. No selection shows curated default evidence. Map-node selection remains independent of résumé selection.

## Scope of this update

Added 15 optional text fields: subtitle, headline, employer, location, workArrangement, employmentType, recordClass, problem, hypothesis, approach, outcome, lessons, proposition, origin, limitations. No existing field was renamed and no defaults or validation rules were relaxed. The résumé now prefers employer over title when supplied. The three kind templates and general template document the fields. Harbor Studio, Wayfinding, and Clarity demonstrate fictional values; existing body text, relationships, dates, and accomplishments are preserved. No real career history was added.
