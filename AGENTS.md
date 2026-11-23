# KE8 — Agent & Engineering Instructions

## Product context
KE8 is the existing static, GitHub Pages learning platform for the SMADELTA Economics Olympiad team. It is not a greenfield rewrite. The production entry point remains `index.html`, using HTML, CSS, and vanilla JavaScript.

## Non-negotiable preservation rules
- Preserve SMADELTA identity, original logo/mascot assets, blue visual language, learning content, existing pages, and every Google Drive resource URL.
- Preserve Practice Arena and OSN Insight Lab behavior.
- Treat these localStorage keys as compatibility contracts: `ke8PracticeStatsV2`, `ke8PracticeStatsV1`, `ke8PracticeHistoryV1`, and `ke8DailyGoal`. Do not rename, clear, or silently reshape them.
- Add new persistence under a new versioned key. Handle malformed or unavailable localStorage without crashing.
- Never delete existing content/resources to make room for a feature.
- Do not add a framework, build system, paid dependency, analytics SDK, or remote data service without a clear requirement and explicit approval.

## Working protocol
1. **Plan:** inspect the live branch, relevant HTML/CSS/JS, data contracts, and prior decisions.
2. **Specify:** write acceptance criteria and identify regression risks.
3. **Test first:** add or update a repeatable verification check before implementation when practical.
4. **Implement narrowly:** prefer cohesive enhancements and small, reviewable changes. Keep the site deployable as a static page.
5. **Verify:** run `node scripts/verify-ke8.js`; run additional checks only when their tools are available.
6. **Review:** inspect the complete diff for regressions, unsafe DOM insertion, accessibility, mobile behavior, and resource loss.
7. **Deliver:** commit to a feature branch and open a PR against `main`. Never push directly to `main`, force-push, or merge without the owner's approval.

## Specialist roles (ECC-adapted)
- **Planner:** turns requests into user outcomes, acceptance criteria, dependencies, and a phased plan.
- **Architect:** protects the static-site architecture, data contracts, navigation, and progressive enhancement.
- **TDD guide:** defines a failing check first, then the smallest implementation that passes.
- **Frontend specialist:** owns semantic HTML, responsive layouts, keyboard support, reduced motion, and visual consistency.
- **Code reviewer:** checks correctness, maintainability, regressions, and scope discipline.
- **Security reviewer:** checks unsafe HTML insertion, untrusted storage values, external links, and privacy.
- **Build/error resolver:** diagnoses syntax and verification failures without unrelated refactoring.
- **E2E/QA specialist:** validates critical journeys on actual browser/device environments when available; never claims runtime QA that was not performed.
- **Documentation maintainer:** keeps this file, workflow documentation, and user-facing feature notes aligned.

## Frontend and code standards
- Use semantic HTML and accessible labels; interactive controls need keyboard access and visible focus.
- Design mobile-first for Android-sized screens; avoid horizontal overflow and tiny tap targets.
- Respect `prefers-reduced-motion`.
- Use vanilla JavaScript and existing CSS variables unless a justified exception is approved.
- Prefer small pure helpers, explicit state transitions, defensive storage reads, and clear error states.
- Escape persisted or user-controlled text before inserting it into HTML. Prefer `textContent` for plain text.
- Keep external resources and Google Drive links intact. Use `noopener,noreferrer` for new-tab links.
- Do not claim a test passed unless it was actually run.

## Handoff format
For multi-stage work, pass forward: context, findings, acceptance criteria, files changed, tests run, unresolved risks, and next action.
