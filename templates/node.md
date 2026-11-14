---
# START HERE
# Copy this file into src/content/pieces and rename the copy, e.g. garden-radio.md.
# The filename becomes its ID (garden-radio) and address (/pieces/garden-radio/).
# Keep filenames stable once other pieces link to them.
# Lines beginning with # inside this block are comments; they won't appear on the site.

# REQUIRED: the headline on the page and its homepage card.
title: "Your title here"

# REQUIRED: choose exactly one: job, project, or idea.
# job = a sustained professional work context.
# project = something created, built, changed, attempted, or tested, even if unfinished.
# idea = an observation, question, discovery, or concept worth exploring independently.
# Any type can tell a story in the writing below.
kind: project

# REQUIRED: a short introduction used on cards, the page, and map profiles.
summary: "Describe this subject in one or two sentences."

# KEEP TRUE while preparing the piece. Change to false to include it in the local site.
# A draft has no generated page, homepage listing, or map node.
# Making it visible locally does not publish the website online.
draft: true

# OPTIONAL: a shorter name for the map and directory. Otherwise the title is used.
# Uncomment by removing the leading # and space.
# label: "Short name"

# OPTIONAL: secondary description and editorial headline (stored, not automatically rendered).
# subtitle: "A secondary description"
# headline: "An editorial headline"
# OPTIONAL Job details; employer falls back to title in the résumé.
# employer: "Fictional organization"
# location: "Fictional Northport"
# workArrangement: "hybrid"
# employmentType: "contractor"
# OPTIONAL Project descriptors (plain text, stored without automatic page sections).
# recordClass: "experiment"
# problem: "The problem or opportunity."
# hypothesis: "The intended outcome or assumption."
# approach: "What was attempted."
# outcome: "What actually happened."
# lessons: "Optional conclusions."
# OPTIONAL Idea descriptors (plain text).
# proposition: "The central statement or question."
# origin: "Origin or context."
# limitations: "Qualifications or uncertainty."

# OPTIONAL: development stage, such as Concept, In progress, Tested, or Completed.
# This is descriptive text, not another node type. Omit it if it isn't useful.
# status: "In progress"

# OPTIONAL: descriptive topics. Competency IDs below drive the current filters.
# topics: ["Experience design", "Participation"]

# OPTIONAL: a date range for a Job; omit rather than invent dates.
# period: "2021–2024"
# For a proportional timeline bar, use dates with only the precision you know:
# startDate: "2021-03"
# endDate: "2024-08"
# YYYY also works. Omit endDate for an ongoing role.

# OPTIONAL: strengths used by the shared map/résumé competency buttons.
# Use IDs from src/data/competencies.ts. Multiple selections use OR matching.
# competencies: [operations, process-improvement]

# OPTIONAL: canonical résumé evidence, attached to this Job or Project.
# No new map nodes are created. IDs must be unique within this file.
# default: true = curated default résumé; false = reveal only when matching a filter.
# Higher priority appears earlier when relevance scores are equal.
# supporting is an optional existing content ID; otherwise this page is linked.
# accomplishments:
#   - id: improve-handoff
#     text: "Write a verified accomplishment here, not an invented result."
#     competencies: [operations, process-improvement]
#     default: true
#     priority: 80
#     supporting: an-existing-project

# OPTIONAL: your role, usually for a Job.
# role: "Founder and operator"

# OPTIONAL: credit collaborators, identify the originator, or explain your contribution.
# attribution: "Created with ...; my contribution was ..."

# OPTIONAL: connections FROM this subject TO other subjects.
# Leave [] when there are none. A node can stand independently.
connections: []

# To add connections, REPLACE the connections: [] line above with a block like this.
# Remove the leading # and one space from each line, preserving indentation.
# Replace the example IDs with existing filenames without .md.
# Don't leave two connections: fields in this file.
#
# connections:
#   - to: another-project
#     relation: related
#     note: "Why these subjects are worth exploring together."
#   - to: an-idea
#     relation: led-to
#     note: "What this work helped me discover."
#
# RELATIONSHIP VOCABULARY — read each from THIS file toward the target:
# part-of  = this subject is part of the target; the target says "Includes".
# led-to   = this subject led to the target; the target says "Emerged from".
# informed = this subject informed the target; the target says "Informed by".
# related  = a neutral association, shown as "Related to" from either end.
#
# Record each connection once. Reverse wording is generated automatically.
# note is optional. Only claim influence or causation when the account supports it.
# Targets must exist, even when this file is a draft. No self-links or duplicates.
# Links involving drafts remain hidden until both subjects are visible.
---

<!--
WRITING STARTS BELOW THE SECOND --- LINE.

This is one subject's page, not a mandatory case-study form.
Replace the starter paragraph below with your writing.

Optional prompts, depending on the type:

JOB: What was the setting? What was your role? What did you take responsibility for?
PROJECT: What was it? Why attempt it? What did you contribute? What happened,
or what do you propose? What remains unfinished or uncertain?
IDEA: What is the question or observation? How did it arise? Why does it matter?
What examples, limitations, or counterexamples help explain it?

These are prompts, not required headings. An anecdote can stay within this page;
it doesn't need its own node. Short pages are fine. Don't invent missing details.

Markdown basics:
  ## A section heading
  **bold** and *italic*
  [Link text](https://example.com)
  - A bullet point

Use a blank line between paragraphs.
Comments enclosed in these HTML comment markers are not displayed as page text,
but can be visible in generated page source. Don't put private information in them.

Save this file and check the browser. Pages, connections, and map positions are
created automatically; no component or separate relationship-file edit is needed.

CURRENT DEMO NOTE: the site still labels active content as fictional. Keep real
portfolio writing private/draft until we deliberately switch out of demo mode.
-->

Write your opening paragraph here.
