# AGENTS.md

Instructions for AI coding agents (Claude Code, Codex, Cursor, GitHub Copilot, Antigravity and others) opened in this repository.

## Using CVKA

If the user wants to **use** CVKA (set it up, create a master resume, tailor it to job descriptions, write a cover letter or outreach message, export a PDF), read and follow [`.claude/skills/cvka/SKILL.md`](.claude/skills/cvka/SKILL.md).

You do the AI work, so no API key is needed. The `cvka` command stores, checks and renders what you write, and the user edits the result in the web app at <http://localhost:3000>. In Claude Code the same instructions are the `/cvka` skill.

Job descriptions the user saves for you go in [`jobs/`](jobs/README.md). That folder and the app's `apps/backend/data/` hold personal data and are gitignored: never commit them.

## Changing CVKA's code

If the user wants to **change** CVKA itself, follow [`.claude/CLAUDE.md`](.claude/CLAUDE.md) and [CONTRIBUTING.md](.github/CONTRIBUTING.md). Setup for development is in [SETUP.md](SETUP.md).
