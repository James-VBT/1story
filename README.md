# Allan Johnson - Personal Life Coach

A static website clone built with Next.js, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Fonts:** Raleway (headings), Geist (body)
- **Icons:** react-icons

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, about, and services preview |
| `/book-now` | All services with category filtering |
| `/plans` | Pricing plans (Discovery, Development, Destiny) |
| `/guides` | Guides placeholder page |

## Project Structure

```
app/
  layout.tsx          Root layout with Header & Footer
  page.tsx            Home page
  globals.css         Tailwind theme & global styles
  book-now/page.tsx   Services page
  plans/page.tsx      Pricing plans page
  guides/page.tsx     Guides page

components/
  Header.tsx          Fixed navigation with mobile menu
  Footer.tsx          Footer with contact info & form
  Hero.tsx            Full-viewport hero section
  AboutSection.tsx    About me section
  ServiceCard.tsx     Individual service card
  ServicesPreview.tsx  Featured services section
  CategoryTabs.tsx    Service category filter tabs
  PlanCard.tsx        Pricing plan card
  ContactForm.tsx     Contact form UI
  SocialIcons.tsx     Social media icon links
  Button.tsx          Reusable CTA button
  SectionHeading.tsx  Decorative section heading

lib/
  data.ts             All static content data
```
