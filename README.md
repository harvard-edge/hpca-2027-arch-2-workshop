# Architecture 2.0 @ HPCA 2027

**Workshop & Tutorials on Agentic AI for Computing Systems Design**

Full-day workshop at [HPCA 2027](https://conf.researchr.org/home/hpca-2027), Salt Lake City, Utah (March 20–24, 2027; workshop day TBA).
Contributed papers, invited talks, and hands-on tutorials. Expected participation: 40–80 attendees.

Website: https://harvard-edge.github.io/hpca-2027-arch-2-workshop/ *(after GitHub Pages is enabled)*

## About

AI agents are beginning to participate directly in computing-system design: they reason about architectural tradeoffs, generate and optimize kernels, run experiments, and interpret simulation and physical-design feedback. This workshop examines how agents should incorporate architectural knowledge, which tools and feedback enable effective design exploration, and how to establish correctness, measure improvements against strong baselines, and account for the cost of agent-driven experimentation.

The HPCA event is also a community-building primer for an approved **Computing Community Consortium (CCC) Visioning Workshop** on this topic at ISCA in June 2027. The closing discussion will be synthesized into community input for the CCC workshop. Participation at HPCA is open to everyone.

## Program (tentative)

| Part | Content |
| --- | --- |
| Morning | Industry keynote, contributed presentations, research discussion |
| Afternoon | Academic keynote, three hands-on tutorials, closing discussion with CCC organizers |

### Tutorial modules

Each module follows one structure: formulate a task → run an agent workflow → inspect its trajectory → validate the result → analyze limitations.

- **Software — Hardware-aware GPU kernel optimization.** Agent-guided optimization of a GPU kernel on cloud GPUs, with validation, profiling, and trajectory analysis.
- **Architecture — Benchmarks and reasoning.** Evaluate an LLM on a public subset of QuArch and examine ArchEval's settings, simulator use, and baseline-normalized scores.
- **EDA — Macro placement.** Use visual feedback to guide macro placement, with reasoning traces and placement animations from a vision-language model and an analytical placer.

Participants bring a laptop and basic architecture and programming knowledge. The organizers provide cloud GPU access, inference credits, prepared environments, and precomputed fallback results.

## Call for papers

Topics include AI for architecture (microarchitecture and accelerator design, DSE, RTL and physical design, memory and interconnects, performance/power/reliability modeling), systems (kernel generation and tuning, compiler/runtime/OS optimization, resource management, bottleneck diagnosis, HW–SW co-design), and infrastructure and evaluation (datasets, domain-specialized models, simulators, benchmarks, correctness checking, reproducible agentic workflows, evaluation of agents).

| Category | Length |
| --- | --- |
| Work-in-progress paper | up to 4 pages |
| Research summary (completed or previously published work, clearly identified) | up to 2 pages |
| Position paper | up to 2 pages |

**Submission window:** December 1, 2026 – February 1, 2027 (AoE). Review is **single-blind** (include author names and affiliations).

The workshop is **nonarchival**. Accepted papers and slides are posted on the website with author permission. Submissions go through OpenReview (link coming soon).

## Organizers

- Vijay Janapa Reddi (Harvard University)
- Zishen Wan (Columbia University)
- Souvik Kundu (Intel Labs)
- Ankita Nayak (Gimlet Labs)
- Arya Tschand (Modal)
- Alexander Ingare (Harvard University) — primary contact
- Andy Cheng (Harvard University)
- Chenyu Wang (Harvard University)
- Shvetank Prakash (Harvard University)

## Previous editions

| Venue | Date | Program | Attendees |
| --- | --- | --- | --- |
| [ASPLOS '26](https://harvard-edge.github.io/asplos-26-arch-2-workshop/) | March 23, 2026 | 13 papers, 2 keynotes, 1 introduction | 100–150 |
| [ISCA '26](https://harvard-edge.github.io/isca-26-arch-2-workshop/) | June 27, 2026 | 13 papers, 4 keynotes, 1 tutorial | 100–150 |
| [IISWC '26](https://harvard-edge.github.io/iiswc-26-arch-2-tutorial/) | September 27, 2026 | 5 technical tutorial sessions | 60–70 |

---

## Website development

Static site. No build step and no dependencies.

```text
index.html        Page content (all sections)
styles.css        Styles; color and font tokens are in :root at the top
script.js         Mobile menu, active-nav highlight, date status and countdown, hero animation
images/           Organizer photos (placeholder.svg for missing photos)
favicon.png       Architecture 2.0 favicon
.nojekyll         Serve files as-is on GitHub Pages
```

### Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

### Common edits

- **OpenReview link:** set `openreviewUrl` in the `SITE_CONFIG` block near the end of `index.html`. All "Submit" buttons use it.
- **Important dates:** in `#important-dates`, set `data-date="YYYY-MM-DD"` and the display text. Past dates are struck through, and the next date gets a countdown (AoE).
- **CFP status badge:** `#cfp-status` reads `data-open` and `data-close` and shows "opens", "open", or "closed" by date.
- **Schedule:** edit the `#program` timeline. Replace "Speaker TBA" and add times when confirmed.
- **Accepted papers:** put PDFs in `papers/` and slides in `slides/`, then link them from the program.
- **Organizer photo:** add the image to `images/` and update the `src` in `#team`.

Search for `TODO` in `index.html` to find every placeholder.

### Deploy to GitHub Pages

1. Push `main` to GitHub.
2. Open **Settings → Pages**.
3. Set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)`.

### Open items

- [ ] OpenReview venue URL
- [x] CFP window (Dec 1, 2026 – Feb 1, 2027)
- [ ] Notification and camera-ready dates
- [ ] Workshop day and room at HPCA 2027
- [ ] Keynote speakers and tutorial presenters (TBA)
- [ ] HPCA 2027 LaTeX template link
- [x] Review model (single-blind)
- [x] Souvik Kundu photo
- [ ] Souvik Kundu homepage link
