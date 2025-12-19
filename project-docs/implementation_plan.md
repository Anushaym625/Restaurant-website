# Implementation Plan - Vrindhana Restaurant Frontend

## Goal Description
Build a premium, mobile-first, glassmorphism-inspired frontend for "Vrindhana Restaurant". The app will be a complete frontend system including public pages, customer dashboard, admin dashboard, and staff portal, featuring advanced animations (parallax, framer motion) and a dark luxury aesthetic.

## User Review Required
> [!IMPORTANT]
> This is a **Frontend Only** implementation. Backend features (database, real auth, payment processing) will be visually simulated with state placeholders.

## Proposed Changes

### Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter / Playfair Display (or similar Google Fonts)

### Project Structure (New)
The project will be created at `C:\Users\anush\.gemini\antigravity\scratch\vrindhana-restaurant`.

### Design System Configuration
#### [MODIFY] tailwind.config.ts
- **Colors**:
  - Primary: Warm Orange / Amber
  - Secondary: Gold
  - Background: Near-black gradient
- **Utilities**:
  - `backdrop-blur-xl` for glass effects
  - Custom border opacities for "neon glow"

### Component Architecture

#### Core Components
- `GlassCard`: Reusable wrapper for glassmorphism panels.
- `Navbar`: Sticky, glass, responsive.
- `Footer`: Clean, informational.
- `PageTransition`: Wrapper for route transitions.

#### Page Components
- **Home**: `HeroSection`, `FeaturedScroll`, `EventPreview`, `Testimonials`.
- **Menu**: `MenuGrid`, `FilterTabs`, `CartDrawer`.
- **Events**: `EventCard`, `BookingModal`.
- **Booking**: `TableForm`, `DateSelector`.

### Dashboards
- **Admin**: Sidebar layout, Stats cards, Data tables (mock data).
- **User**: Order history list, Profile tracking.

## Verification Plan
### Automated Tests
- Build verification: `npm run build`
- Linting: `npm run lint`

### Manual Verification
- **Visual Check**: Verify glassmorphism effect on dark background.
- **Responsiveness**: Check mobile layout (hamburger menu, stacked grids).
- **Animations**: Verify scroll reveal and parallax smoothness.
- **Flows**: Test "Booking a table" and "Ordering food" flows (frontend state only).
