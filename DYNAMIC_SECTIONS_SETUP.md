# Dynamic Marketing Sections Setup Guide

This guide covers the implementation of dynamic data management for IndustryROI, Languages, and OceanSection sections.

## What Was Done

### 1. Backend Implementation

#### IndustryROI Model (Prisma)
- Created new `IndustryROI` table in `schema.prisma`
- Fields: `id`, `industry`, `cvr`, `showUp`, `image`, `useCases`, `isActive`, `order`, `createdAt`, `updatedAt`
- Unique constraint on `industry` field

#### IndustryROI Controller & Routes
- Created `src/controllers/industryROIController.ts`
- Created `src/routes/industryROI.ts`
- Endpoints:
  - `GET /api/industry-roi` - List active ROI data (public)
  - `GET /api/industry-roi/admin` - List all ROI data (admin)
  - `POST /api/industry-roi` - Create (editor+)
  - `PATCH /api/industry-roi/:id` - Update (editor+)
  - `DELETE /api/industry-roi/:id` - Delete (admin only)
  - `POST /api/industry-roi/reorder` - Reorder (editor+)

#### Settings Integration
- Languages data stored in `SiteSetting` with key: `languages.codes`
- OceanSection data stored in `SiteSetting`:
  - `ocean.headline` - Section headline
  - `ocean.description` - Section description
  - `ocean.avatars` - JSON array of avatar URLs

### 2. Frontend Changes

#### Updated Components
1. **IndustryROI.tsx** - Now fetches from `/api/industry-roi`
2. **Languages.tsx** - Now fetches from settings (`languages.codes`)
3. **OceanSection.tsx** - Now fetches from settings (`ocean.headline`, `ocean.description`, `ocean.avatars`)

#### API Client Updates
- Added `industryROI.list()` method
- Added TypeScript interfaces for new data types

#### Admin Dashboard
- Created `IndustryROI.tsx` page for admin CRUD operations
- Allows creating, editing, deleting, and reordering ROI entries

## Setup Instructions

### Step 1: Database Migration

```bash
cd backend
npx prisma migrate dev --name add_industry_roi
# or if using db push:
npx prisma db push
```

### Step 2: Seed Default Data

```bash
cd backend

# Run the seeding script
npx ts-node scripts/seed-industry-roi.ts
```

This will insert the default IndustryROI data:
- Car (400% CVR, 20-40% showup)
- Real estate (250% CVR, 15-30% showup)
- Legal (180% CVR, 40-60% showup)
- Insurance (320% CVR, 25-45% showup)

### Step 3: Seed Settings (Languages & OceanSection)

Option A - Via Direct Database Insert:
```sql
INSERT INTO site_settings (key, value, "updatedAt") VALUES
('languages.codes', '["us","de","fr","bg","cu","hr","au","br","bw","bd","tr","az","in","kr","bf","my","se","nl","us","jp","il","fi"]', NOW()),
('ocean.headline', 'Made for one, serves thousands', NOW()),
('ocean.description', 'Build a process once, and let AI handle it everywhere. Turn manual work into smart workflows. Scale processes without complexity', NOW()),
('ocean.avatars', '["https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80","https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80"]', NOW())
ON CONFLICT (key) DO NOTHING;
```

Option B - Via Admin Dashboard (TBD):
Once admin dashboard is fully set up, you can manage these via UI settings page.

### Step 4: Start Services

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Admin Dashboard  
cd admin && npm run dev

# Terminal 3: Frontend
cd frontend && npm run dev
```

The frontend will now fetch:
- IndustryROI data from `/api/industry-roi`
- Languages from settings
- OceanSection from settings
- All with fallback to hardcoded defaults

## API Endpoints Reference

### IndustryROI Endpoints

#### Get Active ROI Data (Public)
```bash
GET /api/industry-roi
```

Response:
```json
{
  "success": true,
  "items": [
    {
      "id": "cuid",
      "industry": "Car",
      "cvr": "400%",
      "showUp": "20-40%",
      "image": "/assets/car.png",
      "useCases": ["Lead Qualification", "Support"],
      "isActive": true,
      "order": 0
    }
  ]
}
```

#### Create IndustryROI (Editor+)
```bash
POST /api/industry-roi
Authorization: Bearer <token>
```

Body:
```json
{
  "industry": "Healthcare",
  "cvr": "350%",
  "showUp": "30-50%",
  "image": "https://...",
  "useCases": ["Patient Intake", "Appointment Scheduling"],
  "isActive": true,
  "order": 4
}
```

#### Update IndustryROI (Editor+)
```bash
PATCH /api/industry-roi/:id
Authorization: Bearer <token>
```

#### Delete IndustryROI (Admin Only)
```bash
DELETE /api/industry-roi/:id
Authorization: Bearer <token>
```

#### Reorder IndustryROI (Editor+)
```bash
POST /api/industry-roi/reorder
Authorization: Bearer <token>
```

Body:
```json
{
  "ids": ["id3", "id1", "id2", "id4"]
}
```

### Settings Endpoints

#### Get Settings
```bash
GET /api/settings
```

Returns all settings as key-value pairs.

#### Update Setting
```bash
PATCH /api/settings
Authorization: Bearer <token>
```

Body:
```json
{
  "key": "ocean.headline",
  "value": "Your new headline"
}
```

## Managing Data

### Via Admin Dashboard

1. **IndustryROI Management**
   - Navigate to new "Industry ROI" page in admin
   - Create/Edit/Delete/Reorder entries
   - Each entry has: industry name, CVR %, showup %, image, use cases

2. **Languages & OceanSection**
   - Add a settings management page to edit these values
   - Languages: Store as JSON array of flag codes
   - OceanSection: Store headline, description, avatars as individual settings

### Via API (cURL Examples)

```bash
# Create new IndustryROI
curl -X POST http://localhost:5000/api/industry-roi \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "industry": "Finance",
    "cvr": "450%",
    "showUp": "35-55%",
    "useCases": ["Investment Analysis", "Risk Assessment"]
  }'

# Update Ocean Section headline
curl -X PATCH http://localhost:5000/api/settings \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "key": "ocean.headline",
    "value": "Scale Your Operations with AI"
  }'

# Update Languages
curl -X PATCH http://localhost:5000/api/settings \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "key": "languages.codes",
    "value": "[\"us\",\"de\",\"fr\",\"es\",\"it\"]"
  }'
```

## Frontend Component Behavior

### IndustryROI
- Fetches from `/api/industry-roi` on component mount
- Falls back to hardcoded data if API fails
- Displays tabs for each industry with CVR and showup stats
- Use cases displayed as chips

### Languages
- Fetches flag codes from `settings.languages.codes`
- Falls back to default codes if not found
- Displays flags in responsive grid (4 cols mobile, 6 cols tablet, 8 cols desktop)

### OceanSection
- Fetches headline, description, avatars from settings
- Falls back to default values if API fails
- Shows tagline + user avatars + video embed

## Fallback Data

All components have hardcoded fallback data, so the app works even if:
- Database hasn't been migrated yet
- Settings haven't been initialized
- API is temporarily down

Fallback data is displayed until real data is fetched from API.

## Admin Pages Needed

The following admin pages should be added:

1. **Industry ROI Management** ✅ (Created)
   - CRUD for ROI entries
   - Reordering functionality

2. **Settings Management** (TBD)
   - Edit languages codes
   - Edit OceanSection content
   - Other global settings

3. **Marketing Content Manager** (TBD - Optional)
   - Unified UI for all dynamic sections
   - Drag-to-reorder
   - Preview live changes

## Future Enhancements

1. Add activity logging for IndustryROI changes
2. Create marketing content manager admin page
3. Add image upload for IndustryROI
4. Bulk operations for ROI entries
5. Import/Export functionality
6. Version history for settings

## Troubleshooting

### Migration Failed
```bash
# Check database connection
npx prisma db execute --stdin < /dev/null

# Reset database (⚠️ Destructive)
npx prisma migrate reset
```

### Settings Not Loading
```bash
# Check if settings exist
SELECT * FROM site_settings WHERE key LIKE 'ocean.%' OR key LIKE 'languages.%';

# Insert if missing
INSERT INTO site_settings (key, value, "updatedAt") 
VALUES ('ocean.headline', 'Made for one, serves thousands', NOW());
```

### Admin Pages Not Showing
- Ensure IndustryROI.tsx is imported in admin router/layout
- Check browser console for import errors
- Verify API endpoints are accessible

## Support

For issues or questions:
1. Check API endpoints are responding: `curl http://localhost:5000/api/industry-roi`
2. Verify database migration ran successfully: `npx prisma migrate status`
3. Check browser DevTools > Network tab for API calls
4. Review fallback data is displaying (means API is failing)
