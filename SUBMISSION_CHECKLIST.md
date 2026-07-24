# Digital Heroes Full Stack Submission Checklist

Replace every `ADD_...` placeholder before sharing anything.

## 1. Final technical verification

- [ ] Deploy the latest Git commit to Vercel or another public host.
- [ ] Configure `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`,
      `ADMIN_PASSWORD`, `ADMIN_SEED_SECRET`, and `NEXT_PUBLIC_APP_URL`.
- [ ] Provision the reviewer admin account using `/api/admin/seed`.
- [ ] Rotate or remove `ADMIN_SEED_SECRET` after provisioning.
- [ ] Open a fresh/incognito browser with no local state.
- [ ] Confirm `/contact` accepts name, email, budget range, and message.
- [ ] Confirm invalid/missing fields show a sensible error.
- [ ] Submit a lead and confirm it appears in `/admin/leads`.
- [ ] Confirm anonymous `/api/leads` requests return HTTP 401.
- [ ] Confirm `/admin` redirects anonymous visitors to `/admin/login`.
- [ ] Log in with the reviewer account.
- [ ] Search by the submitted lead's name or email.
- [ ] Change status `New → Contacted → Closed`.
- [ ] Refresh and confirm the status persisted.
- [ ] Confirm the Digital Heroes credit is visible and correctly linked.
- [ ] Run `npm run typecheck` and `npm run build`.
- [ ] Push the final commit to the public GitHub repository.

## 2. Record the required Loom

Target length: 2–3 minutes.

Suggested recording flow:

1. **0:00–0:20 — Context:** “I interpreted LeadDesk Mini as the enquiry
   workflow for a private-theatre booking business.”
2. **0:20–0:55 — Public flow:** Open `/contact`, point out the required fields,
   intentionally show one validation error, then submit a valid lead.
3. **0:55–1:20 — Authentication:** Open `/admin` in a fresh browser, show the
   login redirect, and sign in with the reviewer account.
4. **1:20–1:55 — Admin flow:** Find the new lead with search and change its
   status from New to Contacted and then Closed.
5. **1:55–2:30 — Code:** Show `models/Lead.ts`, the protected lead API, and the
   HTTP-only cookie approach in `lib/auth.ts`.
6. **2:30–2:50 — Self-critique:** Explain that with another day you would add
   pagination/server-side search, rate limiting, and automated end-to-end tests.

Make sure the browser URL, successful database-backed status change, and your
face or voice are clear.

## 3. Create the Google Drive folder

Folder name required by the brief:

`Full_Stack_Development_YOUR_FULL_NAME`

Set access to **Anyone with the link → Viewer**. Open the link in incognito to
verify access.

Put one document named `Submission Links` in the folder containing:

```text
Candidate: ADD_YOUR_FULL_NAME
Role: Full Stack Development

Live landing page:
ADD_LIVE_URL

Public lead form:
ADD_LIVE_URL/contact

Admin URL:
ADD_LIVE_URL/admin/login

Reviewer credentials:
Email: ADD_REVIEWER_EMAIL
Password: ADD_REVIEWER_PASSWORD

Public GitHub repository:
https://github.com/raj-yaxav/cinehaven

Loom walkthrough:
ADD_LOOM_URL

Assumption:
I interpreted LeadDesk Mini as the enquiry-management workflow for a
private-theatre booking business. Optional phone and occasion fields support
the domain while name, email, budget range, and message remain the required
lead fields.

AI usage:
I used AI to review the brief against my implementation, identify validation
and API-authorization gaps, and pressure-test the documentation. I reviewed and
adapted the suggestions to the CineHaven workflow, retained my existing visual
identity, and manually verified the final form-to-admin flow.
```

Do not put database credentials, JWT secrets, seed secrets, or environment
files in Drive.

## 4. What to submit

The single Google Drive folder link must give the reviewer access to:

- [ ] Live landing-page URL
- [ ] Admin URL
- [ ] Reviewer test credentials
- [ ] Public GitHub repository
- [ ] README in the repository
- [ ] Loom walkthrough
- [ ] Assumption statement
- [ ] AI-usage paragraph

The live site's footer must also contain the linked text:

`Built for Digital Heroes Training Task`

## 5. Instagram submission

Follow `@realshreyanshsingh` before sending the message. The brief says Instagram
DM is the only submission channel.

Suggested DM:

```text
Hi, I’m ADD_YOUR_FULL_NAME. I completed both Full Stack Development tasks.

Submission folder:
ADD_GOOGLE_DRIVE_FOLDER_LINK

The folder includes the live landing/admin URLs, reviewer credentials, public
GitHub repository, README, and Loom walkthrough. I have also verified the
complete flow in a fresh browser.

Thank you for reviewing my submission.
```

Send only after confirming the Drive link works in incognito. Do not send the
project files separately unless they ask.
