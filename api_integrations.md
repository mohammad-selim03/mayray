# Mayray AI — API Integration Reference

**Base URL:** `http://localhost:5000/api`  
**Production:** replace with your deployed backend URL

---

## Authentication

All protected endpoints require a `Bearer` token in the `Authorization` header.

```
Authorization: Bearer <token>
```

Tokens are obtained from `POST /auth/login` and expire according to `JWT_EXPIRES_IN` (default `7d`).

### Roles

| Role | Permissions |
|------|-------------|
| `admin` | Full access to all endpoints |
| `editor` | Create / edit content; read contacts, newsletter, health checks |
| `viewer` | Read-only; cannot create, edit, or delete anything |

### Error format

All errors return:
```json
{ "success": false, "message": "Human-readable error" }
```

Common HTTP status codes: `400` bad request · `401` not authenticated · `403` access denied · `404` not found · `500` server error

---

## System

### Health check
```
GET /health
```
No auth required.

**Response**
```json
{ "status": "ok", "timestamp": "2026-05-19T10:00:00.000Z" }
```

---

## Auth

### Login
```
POST /auth/login
```
No auth required.

**Body**
```json
{
  "email": "admin@mayray.com",
  "password": "Admin@123456"
}
```

**Response `200`**
```json
{
  "success": true,
  "token": "<jwt>",
  "user": {
    "id": "cuid",
    "name": "Admin",
    "email": "admin@mayray.com",
    "role": "admin",
    "isActive": true,
    "lastLogin": "2026-05-19T10:00:00.000Z",
    "avatar": null,
    "createdAt": "2026-05-01T00:00:00.000Z"
  }
}
```

---

### Get current user
```
GET /auth/me
```
Auth required.

**Response `200`**
```json
{
  "success": true,
  "user": { /* same shape as login */ }
}
```

---

### Change password
```
PATCH /auth/password
```
Auth required.

**Body**
```json
{
  "currentPassword": "OldPass@123",
  "newPassword": "NewPass@456"
}
```

**Response `200`**
```json
{ "success": true, "token": "<new-jwt>" }
```

> The response includes a fresh token — store it to replace the old one.

---

## Blog

### List published posts (public)
```
GET /blog
```
No auth required. Returns only `published` posts, latest first.

**Response `200`**
```json
{
  "success": true,
  "posts": [
    {
      "id": "cuid",
      "title": "Post title",
      "slug": "post-title",
      "excerpt": "Short description",
      "image": "https://...",
      "author": "Mayray AI Team",
      "publishedAt": "2026-05-10T00:00:00.000Z",
      "tags": ["AI", "automation"]
    }
  ]
}
```

---

### Get post by slug (public)
```
GET /blog/slug/:slug
```
No auth required. Returns 404 if post is not published.

**Response `200`**
```json
{
  "success": true,
  "post": {
    "id": "cuid",
    "title": "Post title",
    "slug": "post-title",
    "excerpt": "...",
    "content": "<p>Full HTML content...</p>",
    "image": "https://...",
    "author": "Mayray AI Team",
    "tags": ["AI"],
    "status": "published",
    "publishedAt": "2026-05-10T00:00:00.000Z",
    "views": 142,
    "metaTitle": null,
    "metaDescription": null,
    "createdAt": "2026-05-01T00:00:00.000Z",
    "createdBy": { "name": "Admin", "email": "admin@mayray.com" }
  }
}
```

---

### Get post by ID
```
GET /blog/:id
```
No auth required.

**Response** — same shape as get-by-slug.

---

### Track view
```
POST /blog/:id/view
```
No auth required. Increments the view counter by 1.

**Response `200`**
```json
{ "success": true }
```

---

### List all posts (admin)
```
GET /blog/admin
```
Auth required.

**Query params**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Default `1` |
| `limit` | number | Default `10` |
| `status` | `draft` \| `published` \| `scheduled` | Filter by status |
| `search` | string | Full-text search on title and excerpt |

**Response `200`**
```json
{
  "success": true,
  "total": 42,
  "page": 1,
  "posts": [ /* full post objects with createdBy */ ]
}
```

---

### Create post
```
POST /blog
```
Auth required · `admin` or `editor`

**Body**
```json
{
  "title": "My New Post",
  "excerpt": "A short summary",
  "content": "<p>Full content HTML</p>",
  "author": "Mayray AI Team",
  "tags": ["AI", "business"],
  "status": "draft",
  "image": "https://...",
  "scheduledAt": "2026-06-01T09:00:00.000Z",
  "metaTitle": "SEO title",
  "metaDescription": "SEO description"
}
```

> `slug` is auto-generated from `title`. `tags` can also be a comma-separated string.  
> If `status` is `"published"`, `publishedAt` is set automatically.  
> If `status` is `"scheduled"`, the post goes live automatically when `scheduledAt` is reached.

**Response `201`**
```json
{ "success": true, "post": { /* full post object */ } }
```

---

### Update post
```
PATCH /blog/:id
```
Auth required · `admin` or `editor`

**Body** — any subset of create fields.

**Response `200`**
```json
{ "success": true, "post": { /* updated post */ } }
```

---

### Delete post
```
DELETE /blog/:id
```
Auth required · `admin` only

**Response `200`**
```json
{ "success": true, "message": "Post deleted" }
```

---

## Testimonials

### List testimonials (public)
```
GET /testimonials
```
No auth required. Returns only `isActive: true` records, ordered by `order` ascending.  
When called **with** `Authorization` header, returns all records regardless of `isActive`.

**Response `200`**
```json
{
  "success": true,
  "testimonials": [
    {
      "id": "cuid",
      "quote": "Mayray AI saved us 20+ hours weekly.",
      "name": "Olivia Chen",
      "role": "Operations Manager",
      "company": null,
      "avatar": null,
      "rating": 5,
      "isActive": true,
      "order": 0,
      "createdAt": "2026-05-01T00:00:00.000Z"
    }
  ]
}
```

---

### Get testimonial
```
GET /testimonials/:id
```
Auth required.

**Response `200`**
```json
{ "success": true, "testimonial": { /* full object */ } }
```

---

### Create testimonial
```
POST /testimonials
```
Auth required · `admin` or `editor`

**Body**
```json
{
  "quote": "Amazing product.",
  "name": "John Doe",
  "role": "CEO",
  "company": "Acme Inc",
  "avatar": "https://...",
  "rating": 5,
  "isActive": true,
  "order": 0
}
```

**Response `201`**
```json
{ "success": true, "testimonial": { /* full object */ } }
```

---

### Update testimonial
```
PATCH /testimonials/:id
```
Auth required · `admin` or `editor`

**Body** — any subset of create fields.

**Response `200`**
```json
{ "success": true, "testimonial": { /* updated object */ } }
```

---

### Delete testimonial
```
DELETE /testimonials/:id
```
Auth required · `admin` only

**Response `200`**
```json
{ "success": true, "message": "Deleted" }
```

---

### Reorder testimonials
```
POST /testimonials/reorder
```
Auth required · `admin` or `editor`

**Body**
```json
{ "ids": ["cuid3", "cuid1", "cuid2"] }
```

> Pass all IDs in the desired display order. Each item's `order` field is updated to match the array index.

**Response `200`**
```json
{ "success": true }
```

---

## Integrations

### List integrations (public)
```
GET /integrations
```
No auth required. Returns only `isActive: true`, ordered by `order` ascending.  
With `Authorization` header, returns all.

**Response `200`**
```json
{
  "success": true,
  "integrations": [
    {
      "id": "cuid",
      "name": "Gmail",
      "logo": null,
      "description": null,
      "category": "communication",
      "isActive": true,
      "order": 0
    }
  ]
}
```

**Categories:** `productivity` · `communication` · `crm` · `storage` · `analytics` · `other`

---

### Get integration
```
GET /integrations/:id
```
No auth required.

---

### Create integration
```
POST /integrations
```
Auth required · `admin` only

**Body**
```json
{
  "name": "Notion",
  "logo": "https://...",
  "description": "All-in-one workspace",
  "category": "productivity",
  "isActive": true,
  "order": 5
}
```

**Response `201`**
```json
{ "success": true, "integration": { /* full object */ } }
```

---

### Update / Delete / Reorder integrations

Same pattern as Testimonials — `PATCH /:id`, `DELETE /:id`, `POST /reorder`.  
`DELETE` and `/reorder` are `admin` only.

---

## Features

### List features (public)
```
GET /features
```
No auth required. Returns only `isActive: true`, ordered by `order` ascending.  
With `Authorization` header, returns all.

**Query params**

| Param | Type | Description |
|-------|------|-------------|
| `group` | `A` \| `A2` \| `B` | Filter by feature group |

**Response `200`**
```json
{
  "success": true,
  "features": [
    {
      "id": "cuid",
      "title": "AI Automation",
      "description": "Automate repetitive tasks",
      "videoUrl": null,
      "thumbnail": null,
      "apps": ["Gmail", "Slack"],
      "group": "A",
      "isActive": true,
      "order": 0
    }
  ]
}
```

---

### Get feature
```
GET /features/:id
```
No auth required.

---

### Create feature
```
POST /features
```
Auth required · `admin` or `editor`

**Body**
```json
{
  "title": "Smart Replies",
  "description": "AI-generated email replies",
  "videoUrl": "https://...",
  "thumbnail": "https://...",
  "apps": ["Gmail", "Outlook"],
  "group": "A",
  "isActive": true,
  "order": 1
}
```

> `apps` can be an array or a comma-separated string: `"Gmail, Slack"`.

**Response `201`**
```json
{ "success": true, "feature": { /* full object */ } }
```

---

### Update / Delete / Reorder features

Same pattern — `PATCH /:id` · `DELETE /:id` (admin only) · `POST /reorder` (admin or editor).

---

## Use Cases

### List use cases (public)
```
GET /use-cases
```
No auth required. Returns only `isActive: true`, ordered by `order` ascending.  
With `Authorization` header, returns all.

**Query params**

| Param | Type | Description |
|-------|------|-------------|
| `category` | string | Filter by category |

**Response `200`**
```json
{
  "success": true,
  "useCases": [
    {
      "id": "cuid",
      "title": "Marketing",
      "description": "Drive faster growth with automated campaigns",
      "icon": null,
      "category": "marketing",
      "isActive": true,
      "order": 0
    }
  ]
}
```

**Categories:** `marketing` · `sales` · `operations` · `customer_experience` · `finance` · `it` · `hr` · `productivity`

---

### Get use case
```
GET /use-cases/:id
```
No auth required.

---

### Create use case
```
POST /use-cases
```
Auth required · `admin` or `editor`

**Body**
```json
{
  "title": "Finance",
  "description": "Automated invoicing and reporting",
  "icon": "https://...",
  "category": "finance",
  "isActive": true,
  "order": 4
}
```

**Response `201`**
```json
{ "success": true, "useCase": { /* full object */ } }
```

---

### Update / Delete / Reorder use cases

Same pattern — `PATCH /:id` · `DELETE /:id` (admin only) · `POST /reorder` (admin or editor).

---

## Contact

### Submit contact form (public)
```
POST /contact
```
No auth required.

**Body**
```json
{
  "name": "Jane Smith",
  "email": "jane@company.com",
  "message": "I'd like to learn more about your product.",
  "type": "contact"
}
```

**`type` values:** `contact` (default) · `health_check` · `support`

**Response `201`**
```json
{ "success": true, "message": "Message received. We'll get back to you soon." }
```

> An email notification is sent to `ADMIN_EMAIL` on each submission.

---

### List contacts (admin)
```
GET /contact
```
Auth required.

**Query params**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Default `1` |
| `limit` | number | Default `20` |
| `status` | `new` \| `read` \| `replied` \| `archived` | Filter by status |
| `type` | `contact` \| `health_check` \| `support` | Filter by type |

**Response `200`**
```json
{
  "success": true,
  "total": 58,
  "items": [
    {
      "id": "cuid",
      "name": "Jane Smith",
      "email": "jane@company.com",
      "message": "...",
      "type": "contact",
      "status": "new",
      "ipAddress": "123.45.67.89",
      "createdAt": "2026-05-19T10:00:00.000Z"
    }
  ]
}
```

---

### Update contact status
```
PATCH /contact/:id/status
```
Auth required · `admin` or `editor`

**Body**
```json
{ "status": "read" }
```

**Status values:** `new` → `read` → `replied` → `archived`

**Response `200`**
```json
{ "success": true, "contact": { /* updated object */ } }
```

---

## Newsletter

### Subscribe (public)
```
POST /newsletter/subscribe
```
No auth required.

**Body**
```json
{ "email": "user@example.com" }
```

**Response `201`** (new subscriber)
```json
{ "success": true, "subscriptionId": "cuid" }
```

**Response `200`** (already subscribed)
```json
{ "success": true, "message": "Already subscribed" }
```

**Response `200`** (re-subscribe after unsubscribing)
```json
{ "success": true, "message": "Re-subscribed", "subscriptionId": "cuid" }
```

---

### Unsubscribe (public)
```
POST /newsletter/unsubscribe
```
No auth required.

**Body**
```json
{ "email": "user@example.com" }
```

**Response `200`**
```json
{ "success": true, "message": "Unsubscribed" }
```

---

### List subscribers (admin)
```
GET /newsletter
```
Auth required.

**Query params**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Default `1` |
| `limit` | number | Default `30` |
| `active` | `true` \| `false` | Filter by subscription status |

**Response `200`**
```json
{
  "success": true,
  "total": 312,
  "items": [
    {
      "id": "cuid",
      "email": "user@example.com",
      "isActive": true,
      "subscribedAt": "2026-04-01T00:00:00.000Z",
      "unsubscribedAt": null,
      "source": "website"
    }
  ]
}
```

---

## Health Check

### Submit assessment (public)
```
POST /health-check
```
No auth required.

**Body**
```json
{
  "email": "cto@company.com",
  "company": "Acme Corp",
  "industry": "SaaS",
  "processDescription": "We manually process 200 invoices per week using spreadsheets."
}
```

**Response `201`**
```json
{
  "success": true,
  "assessmentId": "A3F9C2",
  "message": "Assessment submitted. We will contact you within 24 hours."
}
```

> A confirmation email is sent to the submitted address. `assessmentId` is a short unique code the team uses to reference the submission.

---

### List assessments (admin)
```
GET /health-check
```
Auth required.

**Query params**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Default `1` |
| `limit` | number | Default `20` |
| `status` | `pending` \| `reviewed` \| `completed` | Filter by status |

**Response `200`**
```json
{
  "success": true,
  "total": 24,
  "items": [
    {
      "id": "cuid",
      "email": "cto@company.com",
      "company": "Acme Corp",
      "industry": "SaaS",
      "processDescription": "...",
      "assessmentId": "A3F9C2",
      "estimatedSavings": null,
      "recommendations": [],
      "status": "pending",
      "notes": null,
      "createdAt": "2026-05-19T10:00:00.000Z"
    }
  ]
}
```

---

### Update assessment (admin)
```
PATCH /health-check/:id
```
Auth required · `admin` only

**Body**
```json
{
  "status": "reviewed",
  "estimatedSavings": 12000,
  "notes": "High automation potential in invoicing.",
  "recommendations": [
    "Automate invoice processing with Mayray AI",
    "Integrate with QuickBooks"
  ]
}
```

> `recommendations` can be an array or a single string (will be wrapped in an array).

**Response `200`**
```json
{ "success": true, "item": { /* updated object */ } }
```

---

## Analytics

All analytics endpoints require auth.

### Overview stats
```
GET /analytics/overview
```

**Response `200`**
```json
{
  "success": true,
  "stats": {
    "blogs":        { "total": 12, "published": 9 },
    "contacts":     { "total": 58, "new": 7 },
    "newsletter":   { "total": 312, "active": 289 },
    "healthChecks": { "total": 24, "pending": 6 },
    "testimonials": { "total": 8 },
    "totalBlogViews": 4821
  }
}
```

---

### Blog stats
```
GET /analytics/blogs
```

**Response `200`**
```json
{
  "success": true,
  "topPosts": [
    { "id": "cuid", "title": "How AI is transforming...", "views": 980, "publishedAt": "2026-04-01T00:00:00.000Z" }
  ],
  "byStatus": [
    { "_id": "published", "count": 9 },
    { "_id": "draft", "count": 3 }
  ]
}
```

---

### Contact stats
```
GET /analytics/contacts
```

**Response `200`**
```json
{
  "success": true,
  "byType": [
    { "_id": "contact", "count": 41 },
    { "_id": "support", "count": 12 },
    { "_id": "health_check", "count": 5 }
  ],
  "byStatus": [
    { "_id": "new", "count": 7 },
    { "_id": "read", "count": 23 },
    { "_id": "replied", "count": 20 },
    { "_id": "archived", "count": 8 }
  ],
  "recent": [ /* last 10 contact objects */ ]
}
```

---

## Users

All user endpoints require `admin` role.

### List users
```
GET /users
```

**Response `200`**
```json
{
  "success": true,
  "users": [
    {
      "id": "cuid",
      "name": "Admin",
      "email": "admin@mayray.com",
      "role": "admin",
      "isActive": true,
      "lastLogin": "2026-05-19T10:00:00.000Z",
      "avatar": null,
      "createdAt": "2026-05-01T00:00:00.000Z"
    }
  ]
}
```

---

### Get user
```
GET /users/:id
```

**Response `200`**
```json
{ "success": true, "user": { /* same shape */ } }
```

---

### Create user
```
POST /users
```

**Body**
```json
{
  "name": "Sarah Editor",
  "email": "sarah@mayray.com",
  "password": "SecurePass@123",
  "role": "editor"
}
```

**Roles:** `admin` · `editor` · `viewer`

**Response `201`**
```json
{ "success": true, "user": { /* new user, no password */ } }
```

---

### Update user
```
PATCH /users/:id
```

**Body** — any subset of: `name`, `role`, `isActive`, `avatar`

**Response `200`**
```json
{ "success": true, "user": { /* updated user */ } }
```

---

### Delete user
```
DELETE /users/:id
```

Cannot delete yourself — returns `400` if `id` matches the requester's own ID.

**Response `200`**
```json
{ "success": true, "message": "User deleted" }
```

---

## File Upload

### Upload file
```
POST /upload
```
Auth required. `multipart/form-data`.

**Form field:** `file` — image file (JPEG, PNG, GIF, WebP, SVG)  
**Max size:** `MAX_FILE_SIZE` env var (default 5 MB)

Files are stored in the **`mayray-assets`** Supabase Storage bucket and served via public CDN URL.

**Response `200`**
```json
{
  "success": true,
  "url": "https://YOUR_PROJECT_ID.supabase.co/storage/v1/object/public/mayray-assets/1716134400000-abc123.jpg",
  "filename": "1716134400000-abc123.jpg"
}
```

---

## Audit Logs

### List audit logs
```
GET /audit-logs
```
Auth required · `admin` only

**Query params**

| Param | Type | Description |
|-------|------|-------------|
| `page` | number | Default `1` |
| `limit` | number | Default `50` |
| `resource` | string | Filter by resource type (`blog`, `user`, etc.) |
| `userId` | string | Filter by the user who performed the action |

**Response `200`**
```json
{
  "success": true,
  "total": 134,
  "logs": [
    {
      "id": "cuid",
      "userId": "cuid",
      "action": "delete",
      "resource": "blog",
      "resourceId": "cuid",
      "details": { "title": "Old Post" },
      "ipAddress": "123.45.67.89",
      "createdAt": "2026-05-19T10:00:00.000Z"
    }
  ]
}
```

**Logged actions**

| Resource | Actions |
|----------|---------|
| `blog` | `create`, `update`, `delete` |
| `user` | `create`, `delete` |

---

## Rate Limiting

All `/api/*` routes share a single rate limit window:

| Window | Max requests |
|--------|-------------|
| 15 minutes | 200 requests per IP |

Exceeding the limit returns `429 Too Many Requests`.

---

## CORS

Allowed origins are configured via environment variables:

```
FRONTEND_URL=http://localhost:3000   # Next.js marketing site
ADMIN_URL=http://localhost:5173      # React admin dashboard
```

Credentials (cookies) are supported.

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default `5000`) |
| `NODE_ENV` | No | `development` or `production` |
| `SUPABASE_URL` | Yes | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (server-side only) |
| `DATABASE_URL` | Yes | Supabase connection pooling URL (PgBouncer) |
| `DIRECT_URL` | Yes | Supabase direct connection URL (for migrations) |
| `JWT_SECRET` | Yes | Secret key for signing JWTs |
| `JWT_EXPIRES_IN` | No | Token expiry (default `7d`) |
| `ADMIN_EMAIL` | No | Seed admin email (default `admin@mayray.com`) |
| `ADMIN_PASSWORD` | No | Seed admin password |
| `SMTP_HOST` | No | SMTP server host |
| `SMTP_PORT` | No | SMTP server port (default `587`) |
| `SMTP_USER` | No | SMTP username |
| `SMTP_PASS` | No | SMTP password |
| `FROM_EMAIL` | No | Sender address for outgoing emails |
| `FROM_NAME` | No | Sender name for outgoing emails |
| `FRONTEND_URL` | No | Allowed CORS origin for frontend (default `http://localhost:3000`) |
| `ADMIN_URL` | No | Allowed CORS origin for admin (default `http://localhost:5173`) |
| `MAX_FILE_SIZE` | No | Max upload size in bytes (default `5242880` = 5 MB) |

---

## Quick-start Setup

```bash
# 1. Install dependencies
cd backend && npm install

# 2. Copy and fill in environment variables
cp .env.example .env

# 3. Generate Prisma client
npx prisma generate

# 4. Push schema to Supabase (creates all tables)
npx prisma db push

# 5. Seed initial data
npm run seed

# 6. Start development server
npm run dev
```

The API will be available at `http://localhost:5000/api`.
