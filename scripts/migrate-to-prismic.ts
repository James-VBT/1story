import { config } from "dotenv";
config({ path: ".env.local" });

import * as prismic from "@prismicio/client";
import * as fs from "node:fs";
import * as path from "node:path";

const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT!;
const writeToken = process.env.PRISMIC_WRITE_TOKEN!;

if (!writeToken) {
  console.error(
    "Missing PRISMIC_WRITE_TOKEN in .env.local\n" +
      "Get one from: Prismic Dashboard → Settings → API & Security → Generate a Migration/Write token"
  );
  process.exit(1);
}

const writeClient = prismic.createWriteClient(repositoryName, {
  writeToken,
});

const migration = prismic.createMigration();

// --- Helper: load local image as Buffer ---
function loadImage(relativePath: string) {
  const fullPath = path.resolve(__dirname, "..", "public", relativePath);
  return fs.readFileSync(fullPath);
}

// --- Assets ---
const heroBgImage = migration.createAsset(
  loadImage("images/hero-bg.jpg"),
  "hero-bg.jpg",
  { alt: "Mountain landscape" }
);

const aboutImage = migration.createAsset(
  loadImage("images/about.jpg"),
  "about.jpg",
  { alt: "Allan Johnson - Personal Life Coach" }
);

const serviceImages = {
  "health-wellness": migration.createAsset(
    loadImage("images/services/health-wellness.jpg"),
    "health-wellness.jpg",
    { alt: "Health & Wellness Coaching" }
  ),
  "personal-life": migration.createAsset(
    loadImage("images/services/personal-life.jpg"),
    "personal-life.jpg",
    { alt: "Personal Life Coaching" }
  ),
  "career-executive": migration.createAsset(
    loadImage("images/services/career-executive.jpg"),
    "career-executive.jpg",
    { alt: "Career Coaching - Executive" }
  ),
  "intro-consultation": migration.createAsset(
    loadImage("images/services/intro-consultation.jpg"),
    "intro-consultation.jpg",
    { alt: "Introductory Consultation" }
  ),
  "master-finances": migration.createAsset(
    loadImage("images/services/master-finances.jpg"),
    "master-finances.jpg",
    { alt: "Master Your Finances" }
  ),
  "career-individual": migration.createAsset(
    loadImage("images/services/career-individual.jpg"),
    "career-individual.jpg",
    { alt: "Career Coaching - Individual" }
  ),
  "team-group": migration.createAsset(
    loadImage("images/services/team-group.jpg"),
    "team-group.jpg",
    { alt: "Team Coaching - Group" }
  ),
};

// --- Settings (singleton) ---
migration.createDocument(
  {
    type: "settings",
    lang: "en-us",
    data: {
      site_title: "Allan Johnson",
      site_tagline: "Personal Life Coach",
      meta_description:
        "Personal life coaching services to help you achieve your goals.",
      navigation: [
        { label: "About", href: "/#about" },
        { label: "Gallery", href: "/book-now" },
        { label: "Plans", href: "/plans" },
        { label: "Contact", href: "/#contact" },
      ],
      address: "500 Terry Francine Street, San Francisco, CA 94158",
      phone: "123-456-7890",
      fax: "123-456-7890",
      email: "info@mysite.com",
      social_links: [
        { platform: "Facebook", url: "https://facebook.com" },
        { platform: "X", url: "https://x.com" },
        { platform: "Instagram", url: "https://instagram.com" },
        { platform: "YouTube", url: "https://youtube.com" },
      ],
    },
  },
  "Settings"
);

// --- Services (repeatable) ---
const servicesData = [
  {
    title: "Health & Wellness Coaching",
    description: "Transform your life, one healthy habit at a time.",
    price_label: "$100",
    duration: "1 hr",
    category: "Personal Growth",
    image: serviceImages["health-wellness"],
    sort_order: 1,
  },
  {
    title: "Personal Life Coaching",
    description:
      "Make, meet and exceed your personal and professional goals.",
    price_label: "$100",
    duration: "1 hr",
    category: "Personal Growth",
    image: serviceImages["personal-life"],
    sort_order: 2,
  },
  {
    title: "Career Coaching - Executive",
    description:
      "Enhance your leadership and management skills. Tailored to executives.",
    price_label: "$250",
    duration: "1.5 hrs",
    category: "Career Ambitions",
    image: serviceImages["career-executive"],
    sort_order: 3,
  },
  {
    title: "Introductory Consultation",
    description:
      "Get a free assessment and find out if life coaching is right for you.",
    price_label: "Free",
    duration: "15 min",
    category: "Personal Growth",
    image: serviceImages["intro-consultation"],
    sort_order: 4,
  },
  {
    title: "Master Your Finances",
    description: "Take control of your finances once and for all.",
    price_label: "$100",
    duration: "1 hr",
    category: "Personal Growth",
    image: serviceImages["master-finances"],
    sort_order: 5,
  },
  {
    title: "Career Coaching - Individual",
    description:
      "Unlock your potential and enjoy the professional success you deserve.",
    price_label: "$100",
    duration: "1 hr",
    category: "Career Ambitions",
    image: serviceImages["career-individual"],
    sort_order: 6,
  },
  {
    title: "Team Coaching - Group",
    description:
      "Improve your team's productivity, efficiency, communication and more.",
    price_label: "$550",
    duration: "5 hrs",
    category: "Career Ambitions",
    image: serviceImages["team-group"],
    sort_order: 7,
  },
];

for (const service of servicesData) {
  migration.createDocument(
    {
      type: "service",
      lang: "en-us",
      data: service,
    },
    `Service: ${service.title}`
  );
}

// --- Plans (repeatable) ---
const plansData = [
  {
    name: "Discovery",
    price: 275,
    savings: "$25",
    duration: "3 Months",
    description: "Take the first steps on your path to a better future",
    featured: false,
    features: [{ feature_text: "3 Personal Life Coaching Sessions" }],
    sort_order: 1,
  },
  {
    name: "Development",
    price: 550,
    savings: "$50",
    duration: "6 Months",
    description: "Dive deeper into your personal and professional goals",
    featured: true,
    features: [
      { feature_text: "6 Personal and Career Coaching Sessions" },
    ],
    sort_order: 2,
  },
  {
    name: "Destiny",
    price: 900,
    savings: "$100",
    duration: "1 Year",
    description: "Elevate your future with a total transformation",
    featured: false,
    features: [{ feature_text: "Mix from all coaching session types" }],
    sort_order: 3,
  },
];

for (const plan of plansData) {
  migration.createDocument(
    {
      type: "plan",
      lang: "en-us",
      data: plan,
    },
    `Plan: ${plan.name}`
  );
}

// --- Home Page (singleton with slices) ---
migration.createDocument(
  {
    type: "home_page",
    lang: "en-us",
    data: {
      meta_title: "Allan Johnson | Personal Life Coach",
      meta_description:
        "Personal life coaching services to help you achieve your goals.",
      slices: [
        {
          slice_type: "hero",
          slice_label: null,
          variation: "default",
          version: "initial",
          primary: {
            background_image: heroBgImage,
            eyebrow_text: "Ambition is the first step towards",
            heading: "Success",
            subtitle: "Now Available for Online Coaching",
            cta_text: "Book Now",
            cta_link: "/book-now",
          },
          items: [],
        },
        {
          slice_type: "about_section",
          slice_label: null,
          variation: "default",
          version: "initial",
          primary: {
            heading: "About Me",
            body_text: [
              {
                type: "paragraph",
                text: "With over 15 years of experience in personal and professional development, I've helped hundreds of individuals transform their lives. My approach combines proven coaching methodologies with a deep understanding of human behavior to create lasting change.",
                spans: [],
              },
              {
                type: "paragraph",
                text: "Whether you're looking to advance your career, improve your health and wellness, or find greater balance in your life, I'm here to guide you every step of the way.",
                spans: [],
              },
            ],
            quote_text:
              "Success is the doing, not the getting; in the trying, not the triumph.",
            quote_author: "Zig Ziglar",
            portrait_image: aboutImage,
            cta_text: "Read More",
            cta_link: "/book-now",
          },
          items: [],
        },
        {
          slice_type: "services_preview",
          slice_label: null,
          variation: "default",
          version: "initial",
          primary: {
            heading: "Services",
            subtitle: "What I Offer",
            max_services: 3,
            cta_text: "More Services",
            cta_link: "/book-now",
          },
          items: [],
        },
      ],
    },
  },
  "Home Page"
);

// --- Gallery Page (singleton) ---
migration.createDocument(
  {
    type: "gallery_page",
    lang: "en-us",
    data: {
      meta_title: "Gallery | Allan Johnson",
      meta_description: "Browse our coaching services and book a session.",
      heading: "Gallery",
      subtitle: "Explore Our Services",
    },
  },
  "Gallery Page"
);

// --- Plans Page (singleton) ---
migration.createDocument(
  {
    type: "plans_page",
    lang: "en-us",
    data: {
      meta_title: "Plans | Allan Johnson",
      meta_description: "Choose a coaching plan that fits your needs.",
      heading: "Coaching Plans",
      subtitle: "Find the Right Plan for You",
    },
  },
  "Plans Page"
);

// --- Execute migration ---
async function run() {
  console.log("Starting migration to Prismic...\n");

  await writeClient.migrate(migration, {
    reporter: (event) => {
      if (event.type === "assets:creating") {
        console.log(`Uploading ${event.data.current}/${event.data.total} assets...`);
      } else if (event.type === "documents:creating") {
        console.log(`Creating ${event.data.current}/${event.data.total} documents...`);
      } else {
        console.log(`[${event.type}]`);
      }
    },
  });

  console.log("\nMigration complete!");
  console.log(
    "Go to https://shiny-flaons-6l6fb5.prismic.io to review and publish all documents."
  );
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
