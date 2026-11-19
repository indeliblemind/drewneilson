---
# Copy into src/content/pieces and rename; filename is the stable record ID.
# Required: record name, type, and a short description.
title: "Name your project"
kind: project
summary: "What it is, in one or two sentences."
# Optional: defaults to true (hidden). Set false when ready to include locally.
draft: true

# Optional: short map label; falls back to title.
# label: "Short name"
# Optional secondary description (stored) and interior-page editorial headline.
# subtitle: "A secondary description"
# headline: "An editorial headline"
# Optional ochre lines appended to the headline; omit for an ordinary headline.
# headlineHighlights: ["A highlighted conclusion", "A second line"]
# Optional interior introduction; defaults to summary. Empty string hides it.
# introduction: "A longer opening, separate from the short preview summary."
# Optional real-world status, not a publishing control.
# status: "In progress"
# Optional chronology: quote dates, use YYYY or YYYY-MM; omit unknown dates.
# endDate may be omitted for ongoing work. period is a readable fallback.
# startDate: "2022-04"
# endDate: "2023-06"
# period: "2022–2023"
# Optional descriptive topics; these do not activate competency buttons.
# topics: ["Public spaces", "Communication"]
# Optional filter IDs from src/data/competencies.ts; multiple selections match ANY.
# competencies: [experience-design, communication]
# Optional collaborator credits or contribution notes.
# attribution: "Created with a fictional team"

# Optional typed connections FROM this record TO existing filename IDs.
# Default is []; record each connection once. No self-links or duplicates.
connections: []
# Replace the line above with (do not keep two connections fields):
# connections:
#   - to: existing-record-id
#     relation: informed
#     note: "Why this connection matters."
# part-of: this is part of target; led-to: this led to target;
# informed: this informed target; related: neutral association.
# note is optional; reverse wording is automatic. Draft links remain hidden.

# Optional Project descriptors; free text, no required case-study form.
# recordClass: "experiment" # E.g. production, initiative, organization founding.
# problem: "What problem or opportunity prompted the work?"
# hypothesis: "What outcome or assumption did you intend to test?"
# approach: "What did you attempt?"
# outcome: "What actually happened, including unfinished or negative results?"
# lessons: "Optional conclusions."
# Optional existing role field for your contribution.
# role: "Designer and facilitator"

# Optional résumé evidence on Jobs/Projects only; never creates map nodes.
# Defaults to []; text is canonical; id must be unique within this file.
# accomplishments:
#   - id: clearer-handoff
#     text: "A factual accomplishment, using fictional evidence while testing."
#     competencies: [operations, process-improvement] # Optional; default [].
#     default: true # Optional; false by default, true shows in curated résumé.
#     priority: 80 # Optional; default 0. Higher breaks relevance ties first.
#     supporting: existing-record-id # Optional; defaults to this record's page.
---

<!-- Write freely in Markdown. These are not mandatory headings.
Quotations, images, experiments, and narrative sections belong in this body. -->

Describe what you made, attempted, or tested. Include a narrative if it helps.
