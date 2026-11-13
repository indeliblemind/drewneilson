# DrewNeilson.com — Portfolio Implementation Handoff

I'm building an employer-facing personal portfolio at **drewneilson.com**. I'm attaching a working HTML prototype that establishes the visual design and core interaction.

**Treat the attached Version 2 prototype as the design and interaction baseline, not merely inspiration.**

The prototype is the result of extensive design exploration. Its central interaction works, and I particularly like the animation. Your task is to refine, implement, and integrate it into the website—not redesign it from scratch.

## 1. Project objective

Create an unconventional but professional portfolio that demonstrates how my jobs, projects, ideas, and accomplishments connect across my career.

The site must work on two levels:

- A conventional résumé provides a recognizable, chronological view of my experience.
- An interactive network reveals connections across jobs, projects, and ideas.

These views must be synchronized.

The intended visitor experience is exploratory. Someone should be able to click a job, discover a project, follow an idea to another job, and gradually develop an understanding of how I work.

The portfolio should communicate broad capabilities in operations, systems improvement, experience design, experimentation, and business leadership without pigeonholing me in entertainment.

## 2. Preserve the established design

Use the attached HTML prototype as the starting point.

Preserve:

- Bold modernist/editorial typography.
- Warm off-white background and charcoal text.
- Muted teal, rust, and ochre as category colors.
- Strong typographic hierarchy and restrained graphic elements.
- Vertical-first page structure.
- Chronological résumé above the interactive map.
- Contextual detail panel.
- The existing animated network reorganization.

Do not introduce neon, glowing effects, space imagery, gradients, decorative blobs, torn-paper effects, scrapbook styling, or unnecessary ornamentation.

**Most importantly, preserve the character of the current animation.** Its smooth reorganization when selecting nodes is a central part of the experience.

Do not replace it with a static graph or a generic network visualization without demonstrating a compelling reason.

## 3. Core interaction requirements

The résumé and map must remain synchronized.

Selecting a job in the résumé should:

- Select the corresponding map node.
- Animate the network into a new arrangement.
- Bring directly connected nodes closer.
- Visually de-emphasize unrelated nodes without hiding them by default.
- Update the contextual information panel.

Selecting a map node should:

- Reorganize the network around that selection.
- Highlight related jobs in the résumé.
- Update the contextual information panel.
- Allow continued exploration by clicking connected nodes.

Preserve the optional **Only related** filter, which hides unrelated nodes.

The network should animate in response to selection and then settle. It should not move perpetually.

The chronological timeline should remain fixed while the network reorganizes.

## 4. Requested visual refinements

The prototype is successful, but several elements need refinement.

**Node labels and hierarchy**

Improve readability, particularly when many nodes are visible. Establish a clear distinction between the selected node, its direct connections, and unrelated nodes.

Avoid excessive label collisions, clutter, and oversized node markers.

**Default network arrangement**

The current initial arrangement is largely based on an index-driven spiral.

Improve it so the initial view reflects meaningful relationships and invites exploration before a node is selected.

Preserve the appealing movement and responsiveness of the existing selection animation.

**Timeline**

The current timeline accurately represents overlapping employment, but it occupies too much vertical space.

Explore a more compact presentation while preserving proportional tenure lengths, actual chronological gaps, and overlapping roles.

Do not sacrifice accuracy merely to make the timeline look tidy.

**Responsive behavior**

Ensure the interface works on desktop and mobile, with particular attention to navigation, labels, touch interactions, and the relationship between the timeline and network.

Desktop is the primary design reference.

## 5. Content is provisional

I am developing the final content strategy separately.

The prototype currently includes résumé-derived information, provisional projects, generic thematic ideas, and placeholder relationships.

**Do not treat these as approved final portfolio content.**

For now, use dummy or provisional content to test:

- Jobs with many projects.
- Jobs with few or no associated projects.
- Projects connected to multiple jobs.
- Ideas connecting otherwise unrelated experiences.
- Highly connected nodes.
- Standalone nodes.
- Long and short titles.
- Different amounts of descriptive text.
- Different connection types and directions.

The goal is to test the interface against realistic structural complexity, not to finalize the content.

Do not invent career accomplishments or publish speculative interpretations as facts.

## 6. Content architecture

Separate the portfolio's content data from its visualization and interaction code.

Use a maintainable structure supporting at least:

- Jobs
- Projects
- Ideas
- Relationships
- Chronological information
- Descriptions and detailed content
- Related content references
- Content status (draft, provisional, published)

Use stable identifiers rather than relying on display names.

Relationships should eventually support directionality and meaning. For example:

- A job led to an idea.
- An idea informed a project.
- A project influenced later work.
- A project belongs to a job.

The current prototype uses undirected relationships. Preserve existing behavior while designing the data model to support richer relationships later.

The structure must allow the final content to be integrated without rewriting the visualization.

## 7. Chronology

Preserve accurate employment dates and overlapping roles.

One important correction: **Smash*It began in March 2019, but opened to the public in September 2019.** These are distinct milestones.

Do not alter confirmed employment dates to simplify the timeline.

## 8. Implementation and deployment

The existing prototype is a self-contained HTML/CSS/JavaScript file.

I have a Mac with Node.js and npm installed, and I already use Cloudflare for hosting.

Do not introduce another hosting provider or account.

You may recommend a maintainable implementation architecture, but avoid unnecessary frameworks, dependencies, or infrastructure.

Prefer a straightforward, portable website that I can maintain and deploy through Cloudflare.

## 9. Workflow and deliverables

Begin by examining the attached prototype and identifying which parts can be preserved directly.

Then:

1. Establish a working project from the existing prototype.
2. Separate content data from presentation and interaction logic.
3. Implement the requested visual refinements incrementally.
4. Test the interaction with varied dummy content.
5. Verify timeline/map synchronization, animation, filters, keyboard interaction, and responsive behavior.
6. Provide a working local preview and clear instructions for continuing development.

Preserve the original Version 2 file as a reference.

Do not make sweeping design changes without discussing them first.

**Before implementing major changes, briefly explain your proposed architecture and the specific refinements you intend to make.**

The objective is to turn a successful interaction prototype into a maintainable website, while preserving what made the prototype successful in the first place.