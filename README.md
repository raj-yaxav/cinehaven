# CineHaven

A Next.js + MongoDB booking platform scaffold inspired by the CineHaven spec.

## Setup

1. Install Node.js 18+.
2. Run `npm install`.
3. Set environment variables in `.env.local`:
   - `MONGODB_URI=mongodb://localhost:27017/cinehaven`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL=http://localhost:3000`
4. Run `npm run dev`.

## Debugging commands

- `npm run dev` — start Next.js development server
- `npm run build` — production build
- `npm run lint` — lint code
- `npm run typecheck` — run TypeScript checks
- `npm run db:test` — test MongoDB connectivity
- `npm run health:test` — hit the local health API endpoint

While `npm run dev` is running, check backend status with:

```bash
curl http://localhost:3000/api/health
curl http://localhost:3000/api/locations
```

## Notes

This scaffold uses App Router, Tailwind CSS, and MongoDB with Mongoose.
Layout comments are added in key files so you can redesign later.
