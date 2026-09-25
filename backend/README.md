# Mayray AI — Backend + Admin Dashboard

Full-stack setup: **Express REST API** (Prisma + Supabase PostgreSQL) + **React Admin Dashboard** (Vite + Tailwind).

---

## Stack

| Layer | Tech |
|-------|------|
| Backend API | Node.js, Express |
| Database | Supabase (PostgreSQL) |
| ORM | Prisma |
| File Storage | Supabase Storage |
| Auth | JWT (bcryptjs) |
| Email | Nodemailer |
| Admin UI | React 18, Vite, Tailwind CSS |
| Data Fetching | TanStack Query (React Query) |
| Charts | Recharts |

---

## Project Structure

```
Mayray/
├── backend/          ← Express API
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/   (prisma.js, supabase.js, database.js)
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/   (legacy — replaced by Prisma schema)
│   │   ├── routes/
│   │   └── utils/    (email.js, seeder.js)
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── admin/            ← React Admin Dashboard
    ├── src/
    │   ├── components/
    │   ├── contexts/
    │   ├── pages/
    │   └── services/
    └── package.json
```

---

## Setup

### 1. Supabase Project

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Settings > API** → copy your `Project URL` and `service_role` key
3. Go to **Settings > Database > Connection Pooling** → copy the **Transaction** connection string
4. Go to **Storage** → create a bucket named `mayray-assets` (set it to **public**)

### 2. Backend

```bash
cd backend
cp .env.example .env
# Fill in your Supabase values in .env
npm install
npx prisma generate
npx prisma db push        # Creates tables in Supabase
npm run seed              # Seeds admin user + sample data
npm run dev               # Starts on :5000
```

### 3. Admin Dashboard

```bash
cd admin
npm install
npm run dev               # Starts on :5173
```

Open [http://localhost:5173](http://localhost:5173) and login with:
- **Email:** `admin@mayray.com`
- **Password:** `Admin@123456`

---

## API Endpoints

### Public
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/blog` | Published blog posts |
| GET | `/api/testimonials` | Active testimonials |
| GET | `/api/integrations` | Active integrations |
| GET | `/api/features` | Active features |
| GET | `/api/use-cases` | Active use cases |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/newsletter/subscribe` | Subscribe to newsletter |
| POST | `/api/newsletter/unsubscribe` | Unsubscribe |
| POST | `/api/health-check` | Submit health check assessment |

### Protected (requires Bearer token)
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/auth/me` | Current user |
| PATCH | `/api/auth/password` | Change password |
| GET | `/api/blog/admin` | All blog posts (with filters) |
| POST | `/api/blog` | Create blog post |
| PATCH | `/api/blog/:id` | Update blog post |
| DELETE | `/api/blog/:id` | Delete blog post |
| POST | `/api/testimonials` | Create testimonial |
| PATCH | `/api/testimonials/:id` | Update testimonial |
| DELETE | `/api/testimonials/:id` | Delete testimonial |
| GET | `/api/contacts` | All contact submissions |
| PATCH | `/api/contact/:id/status` | Update contact status |
| GET | `/api/newsletter` | All subscribers |
| GET | `/api/health-check` | All assessments |
| PATCH | `/api/health-check/:id` | Update assessment |
| GET | `/api/analytics/overview` | Dashboard stats |
| GET | `/api/analytics/blogs` | Blog analytics |
| GET | `/api/analytics/contacts` | Contact analytics |
| GET | `/api/users` | Admin: list users |
| POST | `/api/users` | Admin: create user |
| PATCH | `/api/users/:id` | Admin: update user |
| DELETE | `/api/users/:id` | Admin: delete user |
| POST | `/api/upload` | Upload file to Supabase Storage |

---

## Admin Dashboard Pages

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/dashboard` | Stats overview + quick links |
| Analytics | `/analytics` | Charts + top posts + recent contacts |
| Blog | `/blog` | CRUD blog posts with status management |
| Blog Editor | `/blog/new`, `/blog/:id/edit` | Rich form + image upload |
| Testimonials | `/testimonials` | CRUD with rating management |
| Integrations | `/integrations` | Manage 16+ integrations |
| Features | `/features` | Manage feature sections (Group A/A2/B) |
| Use Cases | `/use-cases` | Manage 8 industry use cases |
| Contacts | `/contacts` | View + update submission status |
| Newsletter | `/newsletter` | Subscriber list |
| Health Checks | `/health-checks` | Manage assessments + notes |
| Users | `/users` | Admin: CRUD admin users (admin only) |

---

## Environment Variables

Copy `.env.example` to `.env` and fill in:

```env
SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
DATABASE_URL=postgresql://...   # Pooling URL from Supabase
DIRECT_URL=postgresql://...     # Direct URL (for migrations)
JWT_SECRET=your_secret_here
ADMIN_EMAIL=admin@mayray.com
ADMIN_PASSWORD=Admin@123456
```

---

## User Roles

| Role | Permissions |
|------|-------------|
| `admin` | Full access including users management + delete |
| `editor` | Create/edit content, view contacts |
| `viewer` | Read-only access |
