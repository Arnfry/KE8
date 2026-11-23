# KE8 Engineering Workflow — ECC Adaptation

This document adapts the useful operating ideas in the supplied Everything Claude Code archive to KE8's actual ChatGPT/Codex/GitHub workflow. It is a project playbook, not a claim that Claude Code hooks or agents execute natively in ChatGPT.

## 1. Orchestration lanes

| Request type | Workflow | Required output |
|---|---|---|
| New feature | Planner → Architect → TDD → Frontend → Code Review → Security Review → Verify | Plan, implementation, checks, PR |
| Bug fix | Reproduce → Root-cause analysis → Regression check → Minimal fix → Review → Verify | Cause, fix, regression evidence |
| Refactor | Baseline → Architect → Small refactor steps → Regression checks → Review | Behavior-preserving diff |
| UI redesign | UX audit → Preserve identity/content → Responsive implementation → Accessibility review → Verify | Design rationale and QA notes |
| Release/PR | Diff audit → Verification → Security/resource scan → PR summary | Honest test report and merge recommendation |

## 2. Feature workflow
1. Define the user problem and observable acceptance criteria.
2. Inspect current implementation and existing localStorage/resource contracts.
3. Identify files, risks, and rollback boundaries.
4. Add a repeatable test or verification assertion.
5. Implement in small increments.
6. Verify syntax, navigation targets, unique IDs, persistence contracts, and critical journeys.
7. Run code/security review; resolve critical and high-severity findings.
8. Open a PR. The repository owner reviews and merges.

## 3. KE8-specific quality gates
- Static HTML remains deployable by GitHub Pages without a build step.
- Existing sections remain reachable through navigation and URL hashes.
- No existing Google Drive URL, logo, learning resource, or question-bank entry is removed.
- Practice Arena timer/session lifecycle remains isolated; restarting a session must not leave an old interval active.
- Existing progress keys and Insight Lab history remain backward compatible.
- New local data uses a new versioned key, validates its shape, and degrades gracefully when storage is blocked.
- Persisted text is escaped before HTML rendering.
- Controls work with keyboard and touch; narrow layouts and reduced-motion preferences are considered.
- Browser/device testing is reported separately from static checks.

## 4. Verification
Run `node scripts/verify-ke8.js`. The checker validates inline JavaScript syntax, unique HTML IDs, navigation-to-page targets, required sections, localStorage compatibility markers, and resource-link references. It is a static guard, not a replacement for browser QA.

## 5. Pull request requirements
Every PR should include:
- User-visible outcome and design rationale.
- Files and data contracts changed.
- Confirmation that existing resources/content were preserved.
- Exact checks run and their results.
- Manual browser/mobile checks still outstanding.
- Risks, migration notes, and rollback considerations.

## 6. Adaptation boundaries
- **Agents:** explicit specialist review passes and handoff notes.
- **Skills:** repeatable project procedures and checklists.
- **Commands:** natural-language task requests and the verification script.
- **Rules:** this file and `AGENTS.md`.
- **Hooks:** not assumed to run inside ChatGPT; deterministic checks are exposed as scripts.
- **Memory persistence:** project decisions live in version-controlled documentation; browser learning data stays local to the learner.
- **MCP/connectors:** use approved integrations only; never commit API tokens or secrets.
