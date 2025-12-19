# Vrindhana Restaurant Website - Walkthrough

## Overview
This is a complete frontend implementation for the **Vrindhana Restaurant** premium website. It features a "Dark Luxury" design with advanced glassmorphism effects, parallax animations, and a mobile-first responsive layout.

## Features Implemented

### 1. Public Pages
- **Home Page**: Parallax hero section, horizontal scrolling menu, events preview, and testimonials.
- **Menu Page**: Filterable menu with specific categories, search functionality, and grid layout.
- **Events Page**: List of upcoming events with a dedicated **Booking Modal** (seat selection).
- **Table Booking**: Multi-step reservation form with date/time selectors.

### 2. Core Experience
- **Cart & Checkout**: 3-step checkout process (Cart Review -> Address -> Payment -> Success).
- **Authentication**: Login (with role selector), Register, and Forgot Password screens.

### 3. Dashboards
- **Customer Dashboard**: Order history, active order tracking (real-time visual), profile stats.
- **Admin Dashboard**: Overview stats, recent orders, menu management table.
- **Staff Portal**: Kitchen Display System (KDS) for managing active orders.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS v4 (Glassmorphism, Custom Colors)
- **Icons**: Lucide React
- **Animations**: Framer Motion

## How to Run

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for Production**
   ```bash
   npm run build
   ```

## Key Components to Explore
- `components/home/HeroSection.tsx`: Parallax implementation.
- `components/events/EventBookingModal.tsx`: Complex modal interaction.
- `app/globals.css`: Custom Tailwind v4 theme configuration.
