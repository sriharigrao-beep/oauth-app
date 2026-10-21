# Evidence and validation log

Research date: 2026-10-20 UTC. Scope: external agent integrations, with scenario-specific pilot/production distinctions.

## Method

A Firecrawl research agent investigated GitHub, Slack and Gmail using official documentation (job `01a15aa2-779e-7467-8baf-30ec9589c1ec`, completed). Direct retrieval then sampled load-bearing claims. These are documentation checks, not authenticated console tests. Retrieved pages can be cached by the research service; the date records when we checked them, not a guarantee of provider freshness.

| Claim / assumption | Source checked | Result / correction |
| --- | --- | --- |
| Developers always need their own app | https://docs.composio.dev/toolkits/managed-auth | Incorrect: managed OAuth can supply app registration and credentials. End users still consent. Added an early managed-OAuth decision. |
| GitHub permits only one callback | https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app | Current retrieved docs allow up to 10. Corrected the guide. |
| GitHub OAuth access tokens are always long lived | Same GitHub registration page | Retrieved docs show expiring user access tokens enabled by default. Added refresh and settings handoff. |
| Slack public distribution equals commercial launch readiness | https://docs.slack.dev/app-management/distribution/ | Incorrect. Separated pilot from commercial Marketplace path and retained admin approval gate. |
| Slack review is just a short queue | https://docs.slack.dev/slack-marketplace/slack-marketplace-review-guide/ | Added 10 active-workspace prerequisite (28-day definition and stated exception), preliminary feedback up to 10 business days, and new-app functional review up to 10 weeks. These are estimates, not guarantees. |
| All Gmail scopes have the same approval burden | https://developers.google.com/workspace/gmail/api/auth/scopes | Incorrect. labels is non-sensitive; send sensitive; readonly/modify restricted. Set scenario to external server-based reading. |
| No official indication of restricted-scope waiting time | https://developers.google.com/identity/protocols/oauth2/production-readiness/restricted-scope-verification | Agent's first synthesis was incomplete. Direct reading says potentially several weeks. Corrected wait guidance; retained uncertainty about exact total and assessment cost. |

## Setup attempt boundary

An unauthenticated retrieval of GitHub's registration entry URL (`https://github.com/settings/applications/new`) did not produce usable setup evidence. We do not infer what the authenticated form looks like from that result. No account registration, token exchange, console submission or provider approval occurred. Human login and provider-side actions remain explicit handoffs.

## Software checks

`npm test`: 9 meaningful server/schema tests passed at build time. `npm run build`: standalone Worker artifact validated. Client inline script also receives a syntax check. HTTP transport is tested with mocks to avoid charges and credential leakage; those mocks are not described as live provider results.

Browser visual QA and interactive end-to-end tests were not available. Hosted key-based research and evaluator access still require a final check before external submission.

## Live research probe

A second native Firecrawl agent job, using the app's actual prompt builder and output schema, investigates Notion outside the three-guide library. Job: `01a15aa9-0729-77a1-8a43-6c52f12b21f8`. This exercises research generation independently of the hosted HTTP transport. See the run result added alongside this log when completed.

Result: **completed**. `notion-live-result.json` records the actual native-tool output (7 sources, 8 setup steps). It passes the app's `validGuide` function. The result correctly retains Unknown provider wait and records a missing token-reference page. It is an AI draft; we have not independently verified every Notion claim. This result is not silently loaded as a fourth curated guide or substituted for a live run.
