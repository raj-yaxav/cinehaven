# CineHaven LeadDesk Mini

CineHaven is a full-stack private-theatre booking platform adapted as a realistic
LeadDesk Mini implementation for the Digital Heroes Full Stack Development
training task. Visitors submit an enquiry on the public site, and authenticated
staff can search those leads and move them through `New`, `Contacted`, and
`Closed` states.

## Submission links

- Live landing page: `ADD_LIVE_URL_BEFORE_SUBMISSION`
- Public lead form: `ADD_LIVE_URL_BEFORE_SUBMISSION/contact`
- Admin login: `ADD_LIVE_URL_BEFORE_SUBMISSION/admin/login`
- Admin leads: `ADD_LIVE_URL_BEFORE_SUBMISSION/admin/leads`
- Public repository: https://github.com/raj-yaxav/cinehaven
- Loom walkthrough: `ADD_LOOM_URL_BEFORE_SUBMISSION`

Test credentials are provided privately in the submission document. They are
intentionally not committed to this public repository.

## Required task flow

1. A visitor opens `/contact`.
2. The visitor submits their name, email, budget range, and message.
3. Both the browser and server validate the request.
4. The API stores a new lead in MongoDB with status `new`.
5. `/admin` requires a valid signed session cookie.
6. An authenticated admin opens `/admin/leads`, searches the lead, and changes
   its status to `contacted` or `closed`.
7. Status changes persist in MongoDB and remain after refresh.

## Tech stack

- Next.js 14 App Router and TypeScript
- React and Tailwind CSS
- MongoDB with Mongoose
- JWT sessions stored in an HTTP-only, secure production cookie
- bcrypt password hashing

## Local setup

Requirements: Node.js 18+ and a MongoDB database.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Environment variables

Create `.env.local` from `.env.example`. Never commit real secrets.

Required for the LeadDesk flow:

- `MONGODB_URI`
- `JWT_SECRET` (use a long random value)
- `ADMIN_SEED_SECRET` (protects the one-time seed endpoint)
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD` (minimum 12 characters)
- `NEXT_PUBLIC_APP_URL`

SMTP, Cloudinary, Google login, and NextAuth variables are optional for the
larger CineHaven booking features.

## Creating the first admin

After configuring the admin environment variables, send a one-time `POST`
request to `/api/admin/seed`:

```json
{
  "secretKey": "value-of-ADMIN_SEED_SECRET"
}
```

Remove `ADMIN_SEED_SECRET`, or rotate it, after provisioning the reviewer
account. The endpoint never returns the password.

## Data model

The `Lead` collection stores:

- identity: `name`, `email`, and optional `phone`
- qualification: `budgetRange`, optional `occasion`, and the enquiry message
- workflow: `status` (`new`, `contacted`, `closed`) and `source`
- operations: notes, assignment, last-contact time, and timestamps

Budget is stored as a controlled enum rather than free text so it can be
validated consistently and filtered reliably later.

The `Admin` collection stores a unique email, bcrypt-hashed password, role,
active state, login-attempt count, temporary lock time, and timestamps.

## Authentication and API security

Admin passwords are hashed with bcrypt. Successful login issues a signed JWT in
an HTTP-only cookie. In production the cookie is also `secure` and uses
`SameSite=Strict`. The dashboard layout verifies the session before rendering.

Lead-management APIs verify the same session independently. This is important:
hiding `/admin` in the UI is not sufficient protection. Anonymous visitors can
submit through `/api/contact`, but cannot list, edit, or delete leads.

No default JWT secret or default production password is present in the code.

## Validation

Client-side validation uses required fields, semantic input types, length
limits, and submission feedback. Server-side validation independently trims
input, validates required fields, email format, accepted budget values, and
length limits. Only server-approved fields are persisted.

## Design decisions

1. **Domain adaptation:** LeadDesk is implemented inside a private-theatre
   business instead of as a generic CRM mock-up. This demonstrates a coherent,
   real customer journey while preserving every required task capability.
2. **Separate public and admin APIs:** `/api/contact` is the only public lead
   creation path. `/api/leads` is reserved for authenticated operations, which
   reduces accidental data exposure and mass-assignment risk.
3. **Cookie-based session:** An HTTP-only cookie prevents client-side JavaScript
   from reading the token and works naturally with server-rendered admin route
   protection.

## Assumptions

- Phone number and occasion are useful to this business but optional because
  they are not required by the task.
- “Closed” represents any completed lead outcome. A future version could add a
  separate outcome such as won/lost without changing the required workflow.
- Search is performed client-side because this training dataset is small. For a
  large dataset, it should move to an indexed, paginated server query.

## AI usage

I used AI to review the task against my existing implementation, identify
validation and API-authorization gaps, and pressure-test the data model and
submission documentation. I reviewed every suggestion, adapted it to the
CineHaven workflow, kept the existing visual identity, and verified the final
code with TypeScript and a production build.

## Verification

```bash
npm run typecheck
npm run build
```

Before submitting, test the complete form-to-status flow in a fresh private
browser and follow [SUBMISSION_CHECKLIST.md](./SUBMISSION_CHECKLIST.md).
