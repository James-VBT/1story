import { config } from "dotenv";
config({ path: ".env.local" });

const repo = "shiny-flaons-6l6fb5";
const token = process.env.PRISMIC_WRITE_TOKEN!;
const MIGRATION_API = "https://migration.prismic.io/documents";

// Asset IDs from media library (using the first set of uploads)
const assets = {
  heroBg: "aYje-t0YXLCxVlTD",
  about: "aYje_N0YXLCxVlTF",
  healthWellness: "aYje_t0YXLCxVlTG",
  personalLife: "aYje_90YXLCxVlTH",
  careerExecutive: "aYjfAd0YXLCxVlTI",
  introConsultation: "aYjfA90YXLCxVlTJ",
  masterFinances: "aYjfBd0YXLCxVlTL",
  careerIndividual: "aYjfB90YXLCxVlTN",
  teamGroup: "aYjfCd0YXLCxVlTO",
};

// Document IDs from the API
const docIds = {
  settings: "aYjgNxIAAC4AW--l",
  home_page: "aYjelhIAACoAW-00",
  gallery_page: "aYjelBIAAC0AW-0v",
  plans_page: "aYjekhIAACsAW-0o",
  services: [
    "aYjeoxIAACcAW-1Z",
    "aYjeqhIAACoAW-1r",
    "aYjeqBIAACwAW-1k",
    "aYjeoRIAAC0AW-1S",
    "aYjerBIAACoAW-1w",
    "aYjephIAAC0AW-1e",
    "aYjenxIAACsAW-1N",
  ],
  plans: [
    "aYjemRIAACcAW-05",
    "aYjenRIAACgAW-1G",
    "aYjemxIAAC4AW-1B",
  ],
};

function imageField(assetId: string) {
  return { id: assetId };
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function updateDoc(id: string, title: string, data: Record<string, unknown>) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(`${MIGRATION_API}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        repository: repo,
      },
      body: JSON.stringify({ title, data }),
    });

    if (res.status === 429) {
      console.log(`  Rate limited, waiting 5s...`);
      await delay(5000);
      continue;
    }

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Failed to update ${title} (${id}): ${res.status} ${err}`);
    }
    console.log(`  Updated: ${title}`);
    await delay(1500);
    return;
  }
  throw new Error(`Failed after 3 retries: ${title}`);
}

async function run() {
  console.log("Updating Settings...");
  await updateDoc(docIds.settings, "Settings", {
    site_title: "Allan Johnson",
    site_tagline: "Personal Life Coach",
    meta_description: "Personal life coaching services to help you achieve your goals.",
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
  });

  console.log("\nUpdating Services...");
  const servicesData = [
    {
      title: "Health & Wellness Coaching",
      description: "Transform your life, one healthy habit at a time.",
      price_label: "$100",
      duration: "1 hr",
      category: "Personal Growth",
      image: imageField(assets.healthWellness),
      sort_order: 1,
    },
    {
      title: "Personal Life Coaching",
      description: "Make, meet and exceed your personal and professional goals.",
      price_label: "$100",
      duration: "1 hr",
      category: "Personal Growth",
      image: imageField(assets.personalLife),
      sort_order: 2,
    },
    {
      title: "Career Coaching - Executive",
      description: "Enhance your leadership and management skills. Tailored to executives.",
      price_label: "$250",
      duration: "1.5 hrs",
      category: "Career Ambitions",
      image: imageField(assets.careerExecutive),
      sort_order: 3,
    },
    {
      title: "Introductory Consultation",
      description: "Get a free assessment and find out if life coaching is right for you.",
      price_label: "Free",
      duration: "15 min",
      category: "Personal Growth",
      image: imageField(assets.introConsultation),
      sort_order: 4,
    },
    {
      title: "Master Your Finances",
      description: "Take control of your finances once and for all.",
      price_label: "$100",
      duration: "1 hr",
      category: "Personal Growth",
      image: imageField(assets.masterFinances),
      sort_order: 5,
    },
    {
      title: "Career Coaching - Individual",
      description: "Unlock your potential and enjoy the professional success you deserve.",
      price_label: "$100",
      duration: "1 hr",
      category: "Career Ambitions",
      image: imageField(assets.careerIndividual),
      sort_order: 6,
    },
    {
      title: "Team Coaching - Group",
      description: "Improve your team's productivity, efficiency, communication and more.",
      price_label: "$550",
      duration: "5 hrs",
      category: "Career Ambitions",
      image: imageField(assets.teamGroup),
      sort_order: 7,
    },
  ];

  for (let i = 0; i < servicesData.length; i++) {
    await updateDoc(
      docIds.services[i],
      `Service: ${servicesData[i].title}`,
      servicesData[i]
    );
  }

  console.log("\nUpdating Plans...");
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
      features: [{ feature_text: "6 Personal and Career Coaching Sessions" }],
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

  for (let i = 0; i < plansData.length; i++) {
    await updateDoc(
      docIds.plans[i],
      `Plan: ${plansData[i].name}`,
      plansData[i]
    );
  }

  console.log("\nUpdating Home Page...");
  await updateDoc(docIds.home_page, "Home Page", {
    meta_title: "Allan Johnson | Personal Life Coach",
    meta_description: "Personal life coaching services to help you achieve your goals.",
    slices: [
      {
        slice_type: "hero",
        slice_label: null,
        variation: "default",
        version: "initial",
        primary: {
          background_image: imageField(assets.heroBg),
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
          quote_text: "Success is the doing, not the getting; in the trying, not the triumph.",
          quote_author: "Zig Ziglar",
          portrait_image: imageField(assets.about),
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
  });

  console.log("\nUpdating Gallery Page...");
  await updateDoc(docIds.gallery_page, "Gallery Page", {
    meta_title: "Gallery | Allan Johnson",
    meta_description: "Browse our coaching services and book a session.",
    heading: "Gallery",
    subtitle: "Explore Our Services",
  });

  console.log("\nUpdating Plans Page...");
  await updateDoc(docIds.plans_page, "Plans Page", {
    meta_title: "Plans | Allan Johnson",
    meta_description: "Choose a coaching plan that fits your needs.",
    heading: "Coaching Plans",
    subtitle: "Find the Right Plan for You",
  });

  console.log("\nAll documents updated! Now publish them from the Migration release in the Prismic dashboard.");
}

run().catch((err) => {
  console.error("Update failed:", err.message);
  process.exit(1);
});
