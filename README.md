# OAuth Path — APM Integrations take-home

A working slice of an OAuth guide library for developers building AI agents. Three source-checked examples cover GitHub registration, Slack pilot/commercial distribution, and Gmail scope-dependent verification. Live research uses a Firecrawl agent and produces an explicitly labeled AI draft.

## What to submit

1. Your working deployment URL.
2. This GitHub repository URL.
3. This README, which is included in the repository.

**Static GitHub Pages alone does not run live research.** For the simplest complete deployment, deploy this repository as a Node web service (instructions below). Never commit credentials.

## Local setup

Requires Node.js 22 or newer; there are no external dependencies.

```sh
npm start
# Open http://localhost:3000
npm test
```

Opening `index.html` directly works for the seed guides, progress and Markdown export. To test live generation, use the local server, choose Research an app, and enter your own Firecrawl API key. It stays in memory, is forwarded only to Firecrawl via the backend, and is not included in guide links or exports. Each run is capped at 100 credits and can consume your allowance. A key is not bundled. Do not enter an OAuth client secret.

## Upload to GitHub — no command line needed

1. Sign in to GitHub and create a public repository named `oauth-path`.
2. Extract the source ZIP on your computer.
3. Upload the **contents** of the `oauth-path` folder into the repository root, preserving `src`, `tests` and `evidence`. Do not upload only the ZIP.
4. Commit the files. The root should contain `index.html`, `server.mjs`, `package.json` and `README.md`.
5. Your source URL is `https://github.com/sriharigrao-beep/oauth-app`. The README is displayed automatically; it does not need a separate email attachment.

## Recommended: deploy the complete app from GitHub

1. In Render, choose New → Web Service and connect this repository.
2. Select Node. Build command: `npm install`. Start command: `npm start`.
3. Choose a hosting plan appropriate for your needs; review any costs before confirming.
4. Deploy. The server uses Render's `RENDER_EXTERNAL_URL` and `PORT` automatically. On another host, set `PUBLIC_ORIGIN` to the public HTTPS origin and provide `PORT` as needed.
5. Open the deployment URL. Test seed guides, share/export and a real unfamiliar-app generation with your Firecrawl key before sending it to reviewers.

The entire HTML app and research backend run on one origin in this option. No HTML edits are required. The live generation flow remains BYOK: tell reviewers they need a Firecrawl key, or demonstrate with your own key during the interview without sharing it.

## Optional: GitHub Pages frontend + separately hosted backend

1. In GitHub → repository Settings → Pages, choose Deploy from a branch, `main`, `/(root)`, then Save.
2. The project site normally appears at `https://sriharigrao-beep.github.io/oauth-app/`; use the exact URL shown by GitHub.
3. The guides work now, but live generation needs the Node web service described above.
4. In `index.html`, change `<meta name="research-api-base" content="">` to use the backend HTTPS origin, e.g. `<meta name="research-api-base" content="https://YOUR-SERVICE.onrender.com">`.
5. In the backend hosting dashboard, set `ALLOWED_ORIGIN=https://sriharigrao-beep.github.io` (origin only, **without** `/oauth-path/`). Redeploy the backend and commit the HTML edit.
6. Use the GitHub Pages URL for this split-host configuration. Test generation there; a CORS error usually means the exact origin does not match.

Official hosting references: https://docs.github.com/en/pages/quickstart and https://render.com/docs/deploy-node-express-app . GitHub Pages is static hosting; it does not execute `server.mjs`.

## Key product decisions

- Focus on three contrasting apps instead of manufacturing 100 shallow guides.
- Explain managed OAuth before assuming developers need their own registration. Registration identifies the software; each end user separately grants consent for a connection.
- Separate engineering effort estimates from provider waiting time. Treat unknown timelines as unknown.
- Separate pilot, production and marketplace gates. Difficulty depends on audience and requested scopes.
- Include sources, blocker remedies, human handoffs and unresolved questions in every guide.
- Keep generated guides labeled AI draft. Validate structured fields and source indices, but do not misrepresent that as factual verification.
- Research agents inspect docs and draft guidance. They do not create accounts, handle OAuth secrets, submit approvals or accept terms.

## Research and evidence

`src/research.mjs` contains the actual prompt, output schema, validation and upstream API flow. The browser sends an app identifier/scenario to `/api/research`, receives a real job ID, then polls `/api/status`. No seed answer is substituted for a live result. Unknown providers can return no supported steps. Errors and credit-limit stops are shown explicitly.

The library was researched with a Firecrawl agent and sampled against official documents. `evidence/validation.md` records corrections and verification limits. The actual unfamiliar-app Notion research result is retained in `evidence/notion-live-result.json`. That run used a native research tool with the same prompt/schema; it does not prove this export's hosted transport works.

Seed content and HTML are bundled together in `index.html` for easy upload. `src/guides.mjs` retains the source data. If editing guide data later, also update the embedded `GUIDES` value in the HTML; this export does not automatically regenerate it.

## What is tested / not tested

Local automated tests check guide validation, citation indices, malformed output, credential omission, origin handling, CORS, routing and client script syntax. External research responses in these HTTP tests are mocked, not live API results.

No authenticated provider app registration, token exchange or approval submission was completed. Browser visual/interaction QA and a live credentialed call through this exported hosting setup remain untested. Run the demo checklist after deploying. Source repository: https://github.com/sriharigrao-beep/oauth-app .

## Limitations and demo checklist

- Source checks are dated 20 October 2026 and can become stale. Generated claims need human review, even with source links.
- Live generation requires a Firecrawl key. A run may incur charges or hit the 100-credit cap. There is no shared service credential.
- Share links embed guide JSON in a URL fragment; there is no guide database. Treat shared drafts as untrusted. Checklist progress remains browser-local and is not proof of approval.
- Closing the research dialog does not cancel a job. Refresh loses the job handle. Use the Firecrawl activity log if needed; no cancellation, distributed rate limits or persistent job recovery is implemented.
- Scaling to 100 requires refresh scheduling, official-domain validation, claim-level review and version history; the prototype has three reviewed examples, not 100.

Before submission: open the website signed out; open each seed guide; check mobile layout; mark/reload progress; export a guide; open a share link in a fresh session; generate an unfamiliar app with a key; inspect its sources; confirm a missing/bad key shows an error; confirm the public repository contains no credentials.
