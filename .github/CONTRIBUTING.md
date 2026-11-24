# Contributing to CVKA on GitHub

Thank you for taking the time to contribute to [CVKA](https://github.com/NikodemBoniecki/cvka).

We want you to have a great experience making your first contribution.

This contribution could be anything from a small fix to a typo in our
documentation or a full feature.

Tell us what you enjoy working on and we would love to help!

If you would like to contribute, but don't know where to start, check the
issues that are labeled
`good first issue`
or
`help wanted`.

Contributions make the open-source community a fantastic place to learn, inspire, and create. Any contributions you make are greatly appreciated.

The development branch is `main`. This is the branch where all pull requests should be made.

## Reporting Bugs

Please try to create bug reports that are:

- Reproducible. Include steps to reproduce the problem.
- Specific. Include as much detail as possible: which version, what environment, etc.
- Unique. Do not duplicate existing opened issues.
- Scoped to a Single Bug. One bug per report.

## Testing

Please test your changes before submitting the PR. See [Running the tests](#running-the-tests).

## Good First Issues

We have a list of `help wanted` and `good first issue` that contains small features and bugs with a relatively limited scope. Nevertheless, this is a great place to get started, gain experience, and get familiar with our contribution process.

## Development

Follow these steps to set up the environment and run the application.

## How to install

1. Fork the repository [here](https://github.com/NikodemBoniecki/cvka/fork).

2. Clone the forked repository.

   ```bash
   git clone https://github.com/<YOUR-USERNAME>/CVKA.git
   cd CVKA
   ```

3. Follow [SETUP.md](../SETUP.md) to install prerequisites (Python 3.14+, Node.js, [uv](https://docs.astral.sh/uv/)) and configure an LLM provider.

4. Install dependencies and run the backend and frontend (separate terminals):

   ```bash
   # Backend: FastAPI on :8000
   cd apps/backend
   uv sync --extra dev
   uv run uvicorn app.main:app --reload --port 8000

   # Frontend: Next.js on :3000
   cd apps/frontend
   npm install
   npm run dev
   ```

5. Open <http://localhost:3000>.

### Docker

```bash
docker compose up -d
```

See [Docker Deployment](../SETUP.md#docker-deployment) for details and the optional PostgreSQL setup.

## Running the tests

```bash
(cd apps/backend && uv run pytest)     # backend
(cd apps/frontend && npm run test)     # frontend (vitest)
```

## Code Formatting

Format only the files you changed. Never run a whole-repo format, which rewrites files you didn't touch.

```bash
(cd apps/backend && uv run ruff format <files>)    # Python (ruff)
(cd apps/frontend && npx oxfmt <files>)            # Frontend (oxfmt)
(cd apps/frontend && npm run lint)                 # Frontend lint
```

## Git Hooks

The repo ships a `pre-push` hook that runs backend Ruff checks and tests, locale parity, and frontend Vitest and TypeScript checks when the local Node tools are available. Activate it once per clone:

```bash
git config core.hooksPath .githooks
```

See [`.githooks/README.md`](../.githooks/README.md) for details.

## Join Us, Contribute!

Pull Requests & Issues are not just welcomed, they're celebrated! Let's create together.

🎉 Join our lively [Discord](https://221studio.pl/) community and discuss away!

💡 Spot a problem? Create an issue!

👩‍💻 Dive in and help resolve existing [issues](https://github.com/NikodemBoniecki/cvka/issues).

🔔 Share your thoughts in our [Discussions & Announcements](https://github.com/NikodemBoniecki/cvka/discussions).

🚀 Explore and improve our [Landing Page](https://github.com/NikodemBoniecki/website-for-cvka). PRs always welcome!

📚 Contribute to the [CVKA Docs](https://github.com/NikodemBoniecki/cvka-Docs) and help people get started with using the software.
