# Mayray AI Frontend Project Documentation

## Project Overview

**Mayray AI** is a Next.js-based marketing landing page for an AI automation platform that enables businesses to automate conversations, workflows, and operations using intelligent AI agents. The platform integrates with 16+ popular business tools (Gmail, Salesforce, Slack, Google Calendar, etc.) and serves different industries with tailored automation solutions.

**Project Version:** 0.1.0  
**Tech Stack:** Next.js 16.2.4, React 19.2.4, TypeScript, Tailwind CSS, Framer Motion, Lenis (smooth scroll)

---

## Core Architecture

### Framework & Setup
- **Next.js 16.2.4** - Latest with Turbopack and React 19 integration
- **React 19.2.4** - Latest with improved server components
- **TypeScript** - For type safety
- **Tailwind CSS 4** with PostCSS
- **Lucide React** - Icon library (Menu, X, ChevronDown)
- **Framer Motion** - Animation library
- **Lenis** - Smooth scrolling

### Directory Structure
```
frontend/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage (imports all sections)
│   └── globals.css         # Global styles
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Navigation bar with mobile menu
│   │   └── Footer.tsx      # Footer with links and integrations
│   ├── sections/           # Page sections (15+ components)
│   │   ├── Hero.tsx
│   │   ├── Integrations.tsx
│   │   ├── VoiceAgents.tsx
│   │   ├── FeaturesA.tsx
│   │   ├── FeaturesA2.tsx
│   │   ├── FeaturesB.tsx
│   │   ├── Scaling.tsx
│   │   ├── HealthCheck.tsx
│   │   ├── AgentAreas.tsx
│   │   ├── OceanSection.tsx
│   │   ├── Languages.tsx
│   │   ├── IndustryROI.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Marquee.tsx
│   │   ├── Blog.tsx
│   │   └── ... (more sections)
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── AnimateIn.tsx
│   │   ├── SmoothScroll.tsx
│   │   └── AIToolsModal.tsx
│   └── ...
├── lib/
│   ├── data.ts            # Central data file with all content
│   └── assetUtils.ts      # Asset utility functions
├── public/
│   ├── svg/               # SVG assets (logos, icons)
│   ├── assets/            # Images and backgrounds
│   ├── agentareacard/     # Use case card icons
│   ├── blogs/             # Blog post images
│   ├── footer/            # Footer images and logos
│   ├── features-svg/      # Feature video placeholder assets
│   └── videos/            # Video assets
└── package.json
```

---

## Page Structure & Components

### 1. **Hero Section** (`components/sections/Hero.tsx`)
- **Purpose:** First impression, main CTA
- **Features:**
  - Animated headline with rotating underline decoration
  - Call-to-action buttons (Try now, How it works)
  - Interactive "What would you like to automate?" card
  - AI Tools modal selector with 15 integration options
- **State Management:** 
  - `toolsOpen` - Modal open/close state
  - `selectedTool` - Selected integration index
- **Dependencies:** Framer Motion animations, Button component, AIToolsModal
- **Content Source:** `lib/data.ts` (tools data in AIToolsModal)

### 2. **Navbar** (`components/layout/Navbar.tsx`)
- **Features:**
  - Sticky positioned header
  - Logo with Mayray branding
  - Navigation links: Features, Use Cases, Pricing, Contact Us
  - Mobile hamburger menu with dropdown animation
  - Login button (configurable callback)
- **Props:**
  ```typescript
  interface NavbarProps {
    items?: NavbarItem[];
    brandName?: string;
    className?: string;
    sticky?: boolean;
    loginLabel?: string;
    onLoginClick?: () => void;
  }
  ```
- **Default Items:** Features, Use Cases, Pricing, Contact Us

### 3. **Integrations Section** (`components/sections/Integrations.tsx`)
- **Purpose:** Show 16 supported integrations
- **Data Source:** `integrationLogos` from `lib/data.ts`
- **Integrations Supported:**
  - Google Calendar, Microsoft Teams, Slack, Google Keep, PowerPoint
  - Google Drive, SAP, Salesforce, Chrome, Instagram
  - Excel, Word, LinkedIn, Gmail, Sheets, Outlook
- **Display:** Marquee/carousel of logos

### 4. **Features A** (`components/sections/FeaturesA.tsx`)
- **Purpose:** Show 3 main use cases with videos
- **Features:**
  - Video with lazy loading management
  - Modal video player for fullscreen viewing
  - Text card overlapping video container
  - Integration logos badge (apps used for that feature)
  - "Watch video" CTA button
- **Data:** `storiesA` array from `lib/data.ts`
- **Stories:**
  1. AI Office Automation (Excel, Word, Google Keep)
  2. Email & Communication Management (Gmail, Outlook, Teams)
  3. AI-Powered Customer Support (Salesforce, LinkedIn, Chrome)
- **State:** `activeVideo` for modal control, `loadedVideos` tracking

### 5. **Features A2** (`components/sections/FeaturesA2.tsx`)
- Similar to FeaturesA but with `storiesA2` data (different app combinations)

### 6. **Agent Areas / Use Cases** (`components/sections/AgentAreas.tsx`)
- **Purpose:** Display 8 industry/function-specific use cases
- **Layout:** 4-column grid (responsive to 2 on tablets, 1 on mobile)
- **Use Cases:**
  1. Marketing - Drive faster growth with automated campaigns
  2. Sales - AI-driven outreach and deal closing
  3. Operations - Smart workflows for teams
  4. Customer Experience - 24/7 AI support management
  5. Finance - Automated invoicing and reporting
  6. IT - Infrastructure automation and control
  7. People/HR - Hiring to onboarding automation
  8. Workplace Productivity - Automate busy work
- **Data Source:** `agentAreaCards` from `lib/data.ts`
- **Card Component:** Animated on scroll with icon + title + description

### 7. **Scaling Section** (`components/sections/Scaling.tsx`)
- **Purpose:** Show 4-step implementation process + benefits
- **Steps:**
  1. Free Process Health Check - Workflow analysis
  2. Personalized AI & Automation Roadmap - Custom solutions
  3. Implementation & Testing - Engineering + integration
  4. Ongoing Support & Optimization - Maintenance packages
- **Bottom Cards (2):**
  1. Expertise That Turns Strategy Into Measurable Results
  2. Customer Train - Team training on AI/automation
- **Data Source:** `scalingSteps` and `scalingBottomCards` from `lib/data.ts`

### 8. **HealthCheck Section** (`components/sections/HealthCheck.tsx`)
- **Purpose:** Free assessment offering
- **Content:** Form/CTA for health check assessment

### 9. **Ocean Section** (`components/sections/OceanSection.tsx`)
- **Purpose:** Visual/atmospheric section
- **Assets:** Background image + video assets

### 10. **Languages Section** (`components/sections/Languages.tsx`)
- **Purpose:** Show supported programming languages/platforms
- **Data:** Array of 23 language logos from Figma assets
- **Data Source:** `languages` array from `lib/data.ts`

### 11. **Industry ROI Section** (`components/sections/IndustryROI.tsx`)
- **Purpose:** Show ROI benefits for different industries
- **Features B Section** (`storiesB` - 2 items):
  1. AI-Powered HR Automation
  2. AI Automation for E-commerce

### 12. **Testimonials Section** (`components/sections/Testimonials.tsx`)
- **Purpose:** Social proof with customer quotes
- **Data:** 3 testimonials with quote, name, role, avatar
- **Testimonials:**
  1. Olivia Chen - Operations Manager - "20+ hours saved weekly"
  2. Ethan Brooks - Head of Support - "24/7 customer support"
  3. Daniel Foster - Founder, Digital Agency - "Scale without hiring"
- **Data Source:** `testimonials` array from `lib/data.ts`

### 13. **Marquee Section** (`components/sections/Marquee.tsx`)
- **Purpose:** Scrolling announcement banner

### 14. **Blog Section** (`components/sections/Blog.tsx`)
- **Purpose:** Latest blog posts showcase
- **Data:** 3 blog posts with image, title, excerpt
- **Blog Posts:**
  1. "How AI Automation is Transforming Modern Businesses in 2026"
  2. "Tasks You Should Automate in Your Business Right Now"
  3. "Why AI Agents Are the Future of Work"
- **Data Source:** `blogPosts` array from `lib/data.ts`

### 15. **FAQ Section** (`components/sections/FAQ.tsx`)
- **Purpose:** Answer common questions
- **Features:**
  - Accordion-style Q&A
  - 5 FAQs with animations
  - Open/close toggle with chevron rotation
  - 2-column grid layout on desktop
- **FAQs:**
  1. What exactly does Mahar AI do?
  2. Can Mahar AI really replace human work?
  3. How is Mahar AI different from typical automation tools?
  4. How fast can I launch AI automation in my business?
  5. Are the courses beginner-friendly?

### 16. **Footer** (`components/layout/Footer.tsx`)
- **Purpose:** Navigation, links, legal, integrations showcase
- **Sections:**
  1. CTA Section - "Transform Your Office with AI Automation"
  2. Links Grid - 4 columns:
     - Services (6 items)
     - Pricing (2 items)
     - Resources (4 items)
     - Company (4 items)
  3. Service Images - 2 featured service images
  4. Integration Showcase - Animated logos orbiting (monday.com, dropbox, Hubspot, Twilio, Slack, Asana, X, Figma)
  5. Media Logos - X/Twitter, LinkedIn, TikTok, Product Hunt
- **Data Source:** `footerColumns` from `lib/data.ts`

---

## UI Components

### **Button** (`components/ui/Button.tsx`)
- **Variants:**
  - `primary` - Blue background (#13a0e7)
  - `secondary` - White background
  - `black` - Black background
  - `outline` - Bordered style
  - `pill` - Rounded pill shape
  - `active-pill` - Active state pill
- **Default Props:** Rounded-full, medium font weight, transition animations
- **Usage:** Used across all CTAs in the site

### **AnimateIn** (`components/ui/AnimateIn.tsx`)
- **Purpose:** Scroll-triggered entrance animations
- **Props:**
  - `delay` - Animation delay
  - `direction` - Animation direction (up, left, right, down)
  - `onViewportEnter` - Callback when entering viewport
  - `children` - Content to animate
- **Used By:** Almost every section for entrance effects

### **SmoothScroll** (`components/ui/SmoothScroll.tsx`)
- **Purpose:** Wrap app with smooth scrolling using Lenis
- **Features:** Smooth scroll animation across entire page
- **Wraps:** Root layout with children

### **AIToolsModal** (`components/ui/AIToolsModal.tsx`)
- **Purpose:** Interactive tool selection modal
- **Features:**
  - Grid of 15 tools with icons
  - Dynamic description text update
  - Portal rendering to document.body
  - Click outside to close
  - Scroll listener to close modal
- **Tools Array:**
  ```typescript
  const tools = [
    { name: "Gmail", src: "/svg/gmail.svg", text: "Automate your Gmail inbox..." },
    { name: "Word", src: "/svg/ms-word 1.svg", text: "Generate documents..." },
    // ... 13 more tools
  ];
  ```
- **Props:**
  ```typescript
  interface AIToolsModalProps {
    open: boolean;
    onClose: () => void;
    triggerRef: RefObject<HTMLButtonElement | null>;
    selectedTool: number | null;
    onSelectTool: (i: number | null) => void;
  }
  ```

---

## Data Model

### **Central Data File** (`lib/data.ts`)

All content is centralized in `lib/data.ts` with the following data structures:

#### 1. **Integration Logos**
```typescript
integrationLogos: Array<{
  name: string;
  src: string;
}> // 16 items
```

#### 2. **Agent Area Cards** (Use Cases)
```typescript
agentAreaCards: Array<{
  title: string;
  description: string;
  icon: string;
}> // 8 items
```

#### 3. **Stories A & A2** (Feature Stories)
```typescript
storiesA/storiesA2: Array<{
  title: string;
  description: string;
  video: string;
  apps: string[];
}> // 2-3 items each
```

#### 4. **Scaling Steps**
```typescript
scalingSteps: Array<{
  step: string; // "01", "02", etc.
  title: string;
  body: string;
  icon: string; // Figma asset URL
}> // 4 items

scalingBottomCards: Array<{
  title: string;
  body: string;
  icon: string;
}> // 2 items
```

#### 5. **Stories B** (Industry ROI)
```typescript
storiesB: Array<{
  title: string;
  body: string;
  image: string; // Figma asset URL
}> // 2 items
```

#### 6. **Languages**
```typescript
languages: string[] // 23 Figma asset URLs
```

#### 7. **Testimonials**
```typescript
testimonials: Array<{
  quote: string;
  name: string;
  role: string;
  avatar: string;
}> // 3 items
```

#### 8. **Blog Posts**
```typescript
blogPosts: Array<{
  image: string;
  title: string;
  body: string;
}> // 3 items
```

#### 9. **Footer Columns**
```typescript
footerColumns: Array<{
  title: string;
  links: string[];
}> // 4 columns: Services, Pricing, Resources, Company
```

### **Asset Sanitization**
- `sanitizeFigmaAssetsInPlace()` is called on all data arrays to clean up Figma API URLs
- Converts Figma asset URLs to proper image paths

---

## Styling & Design System

### **Color Palette**
- **Primary Blue:** `#13a0e7`
- **Text Darkest:** `#1c1917`, `#201d1a`, `#231f20`
- **Text Mid:** `#44403c`, `#57534e`
- **Text Light:** `#78716c`, `#a8a29e`
- **Borders:** `#e7e5e4`, `#ece6e2`
- **Backgrounds:** `#fafaf9`, `#f6f5f3`, `#f4f4f4`, `#f7f4fe` (FAQ), `#ebf8ff` (active)
- **Accent Orange:** `#FF8B66`

### **Typography**
- **Font Sans:** Inter (Google Font)
- **Font Mono:** Geist Mono
- **Font Sizes:** Responsive from 14px to 60px for headings
- **Font Weights:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### **Layout & Spacing**
- **Max Width:** 1170px-1235px for content containers
- **Padding:** Responsive (4px to 8px on mobile, 6-8px on tablet, 8px on desktop)
- **Gap:** 8px-24px depending on context
- **Border Radius:** 16px-40px for cards, 300px+ for section tops

### **Responsive Breakpoints** (Tailwind)
- **Mobile:** Default styles
- **Tablet (sm):** 640px+
- **Desktop (lg):** 1024px+

---

## Animation & Motion

### **Framer Motion Usage**
- **Page Transitions:** Entry animations on scroll via `AnimateIn`
- **Hover Effects:** Button scale, card hover, logo animations
- **Modal Animations:** Fade, scale, slide effects
- **Continuous Animations:** 
  - Logo rotation and scale in footer
  - Chevron rotation in FAQ (180° on open)
  - Marquee scrolling
  - Floating integrations in footer with staggered delays
  - Animated underline in hero title

### **Animation Timing**
- **Duration:** 150-600ms for most transitions
- **Delay:** 0.1s-0.5s staggered for list items
- **Repeat:** Infinity for continuous animations (4-5s cycle)
- **Easing:** `easeInOut` for smooth, natural motion

### **Lenis Smooth Scroll**
- Global smooth scrolling applied to entire page
- Enhances scrolling experience
- Wrapped at root layout level

---

## API & Backend Integration Points

### **Current State**
- **Frontend Only:** No API calls currently implemented
- **Static Content:** All data in `lib/data.ts`
- **Client-Side Routing:** Links use `href` anchors for smooth scroll

### **Future Backend Requirements**

#### **1. Blog Section**
```typescript
GET /api/blog
Response: {
  posts: Array<{
    id: string;
    title: string;
    excerpt: string;
    image: string;
    slug: string;
    publishedAt: date;
    author?: string;
  }>;
}
```

#### **2. Testimonials**
```typescript
GET /api/testimonials
Response: {
  testimonials: Array<{
    id: string;
    quote: string;
    name: string;
    role: string;
    company?: string;
    avatar: string;
  }>;
}
```

#### **3. Contact Form** (Footer/FAQ)
```typescript
POST /api/contact
Body: {
  email: string;
  name: string;
  message?: string;
  type?: "contact" | "health-check" | "support";
}
Response: {
  success: boolean;
  message: string;
}
```

#### **4. Newsletter Signup**
```typescript
POST /api/newsletter
Body: {
  email: string;
}
Response: {
  success: boolean;
  subscriptionId: string;
}
```

#### **5. Integrations Catalog**
```typescript
GET /api/integrations
Response: {
  integrations: Array<{
    id: string;
    name: string;
    logo: string;
    description?: string;
    category?: string;
  }>;
}
```

#### **6. Feature Videos**
```typescript
GET /api/features
Response: {
  features: Array<{
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    apps: string[];
    thumbnail?: string;
  }>;
}
```

#### **7. Use Cases / Agent Areas**
```typescript
GET /api/use-cases
Response: {
  useCases: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    category: string; // marketing, sales, operations, etc.
  }>;
}
```

#### **8. Health Check Assessment**
```typescript
POST /api/health-check
Body: {
  email: string;
  company?: string;
  industry?: string;
  processDescription?: string;
}
Response: {
  assessmentId: string;
  estimatedSavings?: number;
  recommendations?: string[];
}
```

#### **9. Authentication** (for future dashboard)
```typescript
POST /api/auth/login
Body: {
  email: string;
  password: string;
}
Response: {
  token: string;
  user: { id, email, name };
}
```

---

## Performance Optimizations

### **Image Optimization**
- **Next.js Image Component:** Used for all images
- **Lazy Loading:** Images load on viewport enter
- **Responsive Images:** `sizes` prop for responsive loading
- **Formats:** SVG for icons/logos, PNG/JPG for photos

### **Code Splitting**
- **Dynamic Imports:** All section components use `dynamic()` for lazy loading
  ```typescript
  const Integrations = dynamic(() => 
    import("../components/sections/Integrations").then(mod => mod.Integrations)
  );
  ```
- **Only Hero imported statically** - Other sections load on demand

### **Video Optimization**
- **Lazy Load:** Videos only play when loaded
- **Preload Metadata:** Video player shows thumbnail before playing
- **Controls:** `loop`, `muted`, `playsInline` for autoplay
- **Format:** MP4 with `nodownload` controlsList

### **Bundle Size Considerations**
- Framer Motion is ~40KB (used for all animations)
- Lenis smooth scroll is ~10KB
- Lucide icons are tree-shakeable (~5-10KB)
- Tailwind CSS purges unused styles in production

---

## Mobile Responsiveness

### **Navbar**
- Logo and menu visible on all screens
- Hamburger menu shows on mobile (hidden on `lg:`)
- Mobile dropdown menu with animated entrance
- Full navigation visible on desktop

### **Hero Section**
- Single column on mobile
- Two-column grid on desktop (1fr_470px)
- Responsive text sizes (40px→60px)

### **Cards & Grids**
- 1 column on mobile
- 2 columns on tablets (`sm:grid-cols-2`)
- 3-4 columns on desktop (`lg:grid-cols-4`)

### **Images & Videos**
- Aspect ratios adjust for mobile (square → 4:3)
- Padding reduces on mobile (6px → 8px)
- Font sizes scale with breakpoints

---

## SEO & Metadata

### **Root Layout**
```typescript
export const metadata: Metadata = {
  title: "Mayray AI | Next-Gen AI Voice & Workflow Agents",
  description: "Transform your business with Mayray AI. Automate conversations, backend operations, and repetitive tasks with our intelligent AI agents 24/7.",
  keywords: ["AI automation", "AI voice agents", "workflow automation", "business efficiency", "Mayray AI"],
};
```

### **Section IDs for Anchor Links**
- `#hero` - Hero section
- `#features` - Features A section
- `#use-cases` - Agent Areas section
- `#pricing` - Footer pricing section
- `#contact` - Footer contact section

### **Open Graph** (To be configured)
- og:title, og:description, og:image
- twitter:card, twitter:title

---

## Browser Support

- **Modern Browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile:** iOS Safari 14+, Android Chrome 90+
- **Features:** CSS Grid, Flexbox, CSS Custom Properties, `prefers-reduced-motion`

---

## Development Notes

### **Key Configuration Files**
- `tsconfig.json` - TypeScript configuration
- `next.config.js` - Next.js build config
- `tailwind.config.js` - Tailwind CSS customization
- `.eslintrc.json` - ESLint rules

### **Environment Variables**
- Currently: None required for frontend
- **Future:** API_URL, AUTH_TOKEN, etc.

### **Build & Deployment**
- **Dev:** `npm run dev` - Next.js dev server on :3000
- **Build:** `npm run build` - Turbopack production build
- **Start:** `npm run start` - Production server
- **Lint:** `npm run lint` - ESLint checks

### **Common Patterns**

#### Component with Client-Side State
```typescript
"use client";
import { useState } from "react";

export const Component = () => {
  const [state, setState] = useState(false);
  // ...
};
```

#### Scroll-Triggered Animation
```typescript
<AnimateIn delay={0.2} direction="up">
  <div>Content</div>
</AnimateIn>
```

#### Dynamic Section Import
```typescript
const Component = dynamic(
  () => import("../components/sections/Component").then(mod => mod.Component)
);
```

---

## Admin Dashboard Requirements

For the backend + admin dashboard project, implement:

1. **Content Management System (CMS)**
   - CRUD operations for all data (blogs, testimonials, use cases, etc.)
   - Rich text editor for descriptions
   - Image upload & management
   - Asset library for icons/logos

2. **Analytics Dashboard**
   - Page views, click tracking
   - Blog post performance
   - Testimonial engagement
   - Contact form submissions
   - Newsletter subscriber count

3. **User Management**
   - Admin authentication
   - Role-based access control
   - Audit logs

4. **Integration Management**
   - Add/remove supported integrations
   - Update integration details
   - Manage integration logos

5. **Content Scheduling**
   - Publish/schedule blog posts
   - Feature rotation
   - Campaign scheduling

6. **Email Management**
   - Contact form email sending
   - Newsletter sending
   - Notification emails

7. **SEO Management**
   - Meta tag editor
   - Sitemap generation
   - Open Graph image manager
   - Canonical URL management

---

## File Summary

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout, metadata, smooth scroll wrapper |
| `app/page.tsx` | Homepage with all section imports |
| `components/layout/Navbar.tsx` | Navigation with mobile menu |
| `components/layout/Footer.tsx` | Footer with links and integrations |
| `components/sections/*.tsx` | 15+ page sections |
| `components/ui/*.tsx` | Reusable UI components |
| `lib/data.ts` | All content data |
| `lib/assetUtils.ts` | Asset utility functions |
| `public/` | Images, videos, SVGs |

---

## Contact & Metadata

- **Email:** selim.nill1@gmail.com
- **Project Version:** 0.1.0
- **Node Version:** Latest (16.2.4 Next.js requires Node 18.17+)
- **Documentation Generated:** 2026-05-19

---

## Next Steps for Backend Implementation

1. ✅ Review this API documentation
2. Setup database schema based on data structures above
3. Create API endpoints for all data types
4. Implement authentication system
5. Build admin dashboard UI
6. Create content management interface
7. Setup email service for forms
8. Implement analytics tracking
9. Add image/file upload handling
10. Setup deployment infrastructure

