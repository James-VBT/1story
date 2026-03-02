// @ts-nocheck
import { config } from "dotenv";
config({ path: ".env.local" });

import * as prismic from "@prismicio/client";

const repositoryName = process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT!;
const writeToken = process.env.PRISMIC_WRITE_TOKEN!;

if (!writeToken) {
  console.error(
    "Missing PRISMIC_WRITE_TOKEN in .env.local\n" +
      "Get one from: Prismic Dashboard → Settings → API & Security → Generate a write token"
  );
  process.exit(1);
}

const writeClient = prismic.createWriteClient(repositoryName, { writeToken });
const MIGRATION_API = "https://migration.prismic.io/documents";

// Existing document IDs from the previous migration
const SERVICE_DOC_IDS = [
  "aYjeoxIAACcAW-1Z", // Health & Wellness Coaching
  "aYjeqhIAACoAW-1r", // Personal Life Coaching
  "aYjeqBIAACwAW-1k", // Career Coaching - Executive
  "aYjeoRIAAC0AW-1S", // Introductory Consultation
  "aYjerBIAACoAW-1w", // Master Your Finances
  "aYjephIAAC0AW-1e", // Career Coaching - Individual
  "aYjenxIAACsAW-1N", // Team Coaching - Group
];

// Thumbnail asset IDs already in the Prismic media library
const THUMBNAIL_ASSET_IDS = [
  "aYje_t0YXLCxVlTG", // Health & Wellness
  "aYje_90YXLCxVlTH", // Personal Life
  "aYjfAd0YXLCxVlTI", // Career Executive
  "aYjfA90YXLCxVlTJ", // Intro Consultation
  "aYjfBd0YXLCxVlTL", // Master Finances
  "aYjfB90YXLCxVlTN", // Career Individual
  "aYjfCd0YXLCxVlTO", // Team Group
];

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Upload a single image from a URL to the Prismic media library.
// We fetch the image ourselves first to follow any redirects (picsum uses them),
// then pass the ArrayBuffer directly to createAsset.
async function uploadImage(seed: string, alt: string): Promise<string> {
  const url = `https://picsum.photos/seed/${seed}/800/600`;
  console.log(`    ↑ Fetching: ${url}`);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch image ${seed}: ${response.status}`);
  const buffer = await response.arrayBuffer();
  console.log(`    ↑ Uploading: ${seed} (${buffer.byteLength} bytes)`);
  const asset = await writeClient.createAsset(buffer, `${seed}.jpg`, { alt });
  await delay(1000);
  return asset.id;
}

// Build a Prismic body (StructuredText) from plain paragraph strings
function makeBody(...paragraphs: string[]) {
  return paragraphs.map((text) => ({ type: "paragraph", text, spans: [] }));
}

// Build a gallery group from asset IDs
function makeGallery(...ids: string[]) {
  return ids.map((id) => ({ image: { id } }));
}

// Update an existing document via the Migration API — sends ALL fields
async function updateDoc(id: string, title: string, uid: string, data: object) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(`${MIGRATION_API}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${writeToken}`,
        "Content-Type": "application/json",
        repository: repositoryName,
      },
      body: JSON.stringify({ title, uid, data }),
    });

    if (res.status === 429) {
      console.log("    Rate limited — waiting 5s...");
      await delay(5000);
      continue;
    }

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Failed to update "${title}": ${res.status} — ${err}`);
    }

    console.log(`  ✓ Updated: ${title}`);
    await delay(2000);
    return;
  }
  throw new Error(`Failed after 3 retries: ${title}`);
}

// ─── Service content ──────────────────────────────────────────────────────────

const services = [
  {
    docId: SERVICE_DOC_IDS[0],
    thumbnailId: THUMBNAIL_ASSET_IDS[0],
    uid: "health-wellness-coaching",
    title: "Health & Wellness Coaching",
    description: "Transform your life, one healthy habit at a time.",
    category: "Personal Growth",
    sort_order: 1,
    imageSeeds: ["hw-session-1", "hw-session-2", "hw-session-3"],
    imageAlts: [
      "Health and wellness coaching session",
      "Wellness consultation one-on-one",
      "Healthy lifestyle guidance",
    ],
    bodyText: [
      "Our Health & Wellness Coaching programme is designed to help you build sustainable habits that transform your daily life. Working one-on-one with your coach, you will identify the root causes of what is holding you back and create a personalised roadmap towards optimal wellbeing.",
      "Each session focuses on real, actionable steps — whether that means improving your nutrition, establishing a consistent movement practice, managing stress, or rebuilding your energy from the ground up. Progress is tracked, celebrated, and continuously refined.",
      "This service is suitable for anyone feeling stuck, overwhelmed, or simply ready to invest in themselves. No experience is necessary — only the commitment to show up and do the work.",
    ],
  },
  {
    docId: SERVICE_DOC_IDS[1],
    thumbnailId: THUMBNAIL_ASSET_IDS[1],
    uid: "personal-life-coaching",
    title: "Personal Life Coaching",
    description: "Make, meet and exceed your personal and professional goals.",
    category: "Personal Growth",
    sort_order: 2,
    imageSeeds: ["life-coach-1", "life-coach-2", "life-coach-3"],
    imageAlts: [
      "Personal life coaching session",
      "One-on-one life guidance",
      "Personal development meeting",
    ],
    bodyText: [
      "Personal Life Coaching is about getting clear on what you truly want — and building a concrete plan to make it happen. Together we will examine every area of your life: relationships, health, purpose, finances, and personal growth, to ensure you are moving forward with clarity and confidence.",
      "Sessions are centred on deep self-discovery exercises, goal-setting frameworks, and accountability check-ins that keep you motivated between meetings. We work at your pace, challenging limiting beliefs while celebrating every step of progress.",
      "Whether you are navigating a major life transition, feeling unfulfilled, or simply ready to level up, Personal Life Coaching provides the structure and support to get you there. Your transformation begins with a single decision — to start.",
    ],
  },
  {
    docId: SERVICE_DOC_IDS[2],
    thumbnailId: THUMBNAIL_ASSET_IDS[2],
    uid: "career-coaching-executive",
    title: "Career Coaching - Executive",
    description: "Enhance your leadership and management skills. Tailored to executives.",
    category: "Career Ambitions",
    sort_order: 3,
    imageSeeds: ["exec-coach-1", "exec-coach-2", "exec-coach-3"],
    imageAlts: [
      "Executive coaching leadership session",
      "C-suite leadership coaching",
      "Executive strategy and development",
    ],
    bodyText: [
      "Designed exclusively for senior leaders and executives, this coaching programme focuses on amplifying your impact, sharpening your strategic vision, and developing the authentic leadership presence that inspires those around you.",
      "We explore the areas that matter most at the executive level: communicating with influence, navigating complex stakeholder dynamics, making high-stakes decisions under pressure, and building resilient, high-performance teams. Each engagement is bespoke and completely confidential.",
      "Many of the world's most effective leaders work with a coach — not because they are struggling, but because they are committed to excellence. If you are ready to lead with greater intention and achieve results that matter, this programme is for you.",
    ],
  },
  {
    docId: SERVICE_DOC_IDS[3],
    thumbnailId: THUMBNAIL_ASSET_IDS[3],
    uid: "introductory-consultation",
    title: "Introductory Consultation",
    description: "Get a free assessment and find out if life coaching is right for you.",
    category: "Personal Growth",
    sort_order: 4,
    imageSeeds: ["intro-consult-1", "intro-consult-2"],
    imageAlts: [
      "Introductory coaching consultation",
      "Free coaching assessment session",
    ],
    bodyText: [
      "Not sure if coaching is right for you? The Introductory Consultation is a complimentary 15-minute session that gives you the chance to ask questions, share your situation, and explore how coaching could support your goals — completely free of charge and with no obligation.",
      "This session is a conversation, not a sales pitch. We will spend the time getting to know you, understanding what you are looking for, and honestly assessing whether we are the right fit. Many clients find that even this short call brings useful clarity.",
    ],
  },
  {
    docId: SERVICE_DOC_IDS[4],
    thumbnailId: THUMBNAIL_ASSET_IDS[4],
    uid: "master-your-finances",
    title: "Master Your Finances",
    description: "Take control of your finances once and for all.",
    category: "Personal Growth",
    sort_order: 5,
    imageSeeds: ["finance-coach-1", "finance-coach-2", "finance-coach-3"],
    imageAlts: [
      "Financial coaching and planning session",
      "Money management coaching",
      "Personal finance strategy session",
    ],
    bodyText: [
      "Financial stress is one of the most common barriers to living a fulfilling life. The Master Your Finances programme cuts through the noise and gives you the tools, mindset, and habits to take real control of your money — no matter where you are starting from.",
      "We cover budgeting, debt reduction, savings strategies, investment fundamentals, and the psychology of spending. More importantly, we address the emotional relationship most of us have with money — the one that no spreadsheet can fix on its own.",
      "By the end of our time together, you will have a clear financial picture, a written action plan, and the confidence to make decisions that align with your long-term goals. Financial freedom is not just for the wealthy — it starts with a single decision to change.",
    ],
  },
  {
    docId: SERVICE_DOC_IDS[5],
    thumbnailId: THUMBNAIL_ASSET_IDS[5],
    uid: "career-coaching-individual",
    title: "Career Coaching - Individual",
    description: "Unlock your potential and enjoy the professional success you deserve.",
    category: "Career Ambitions",
    sort_order: 6,
    imageSeeds: ["career-ind-1", "career-ind-2", "career-ind-3"],
    imageAlts: [
      "Individual career coaching session",
      "Professional development coaching",
      "Career growth and transition guidance",
    ],
    bodyText: [
      "Whether you are stuck in a role that no longer excites you, looking to make a bold career pivot, or simply ready to accelerate your professional growth, Career Coaching for Individuals gives you the clarity and strategy to move forward with purpose.",
      "Sessions focus on identifying your unique strengths, defining your professional brand, preparing for interviews and promotions, and navigating workplace challenges with confidence. We also work on the inner game — the mindset shifts that unlock new opportunities.",
      "You deserve a career that energises you. Coaching provides the outside perspective and honest support to help you see what is possible and take the steps to get there. Your next chapter starts here.",
    ],
  },
  {
    docId: SERVICE_DOC_IDS[6],
    thumbnailId: THUMBNAIL_ASSET_IDS[6],
    uid: "team-coaching-group",
    title: "Team Coaching - Group",
    description: "Improve your team's productivity, efficiency, communication and more.",
    category: "Career Ambitions",
    sort_order: 7,
    imageSeeds: ["team-coach-1", "team-coach-2", "team-coach-3"],
    imageAlts: [
      "Team coaching group workshop",
      "Group coaching and collaboration session",
      "Team building and performance coaching",
    ],
    bodyText: [
      "High-performing teams do not happen by accident. Team Coaching brings your group together to improve communication, align on shared goals, resolve friction, and build the psychological safety that allows every member to do their best work.",
      "Over the course of our programme, we facilitate structured workshops and group coaching sessions that surface the real dynamics at play — and give the team practical tools to transform them. From conflict resolution to decision-making to accountability, we cover the foundations of exceptional teamwork.",
      "Suitable for leadership teams, project groups, and departments of all sizes, Team Coaching delivers results that are visible in both culture and performance. Invest in your people, and they will invest in your organisation.",
    ],
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

async function run() {
  console.log("=== Seeding service content ===\n");

  for (const service of services) {
    console.log(`\n[${service.title}]`);
    console.log("  Uploading gallery images...");

    // Upload gallery images one by one
    const assetIds: string[] = [];
    for (let i = 0; i < service.imageSeeds.length; i++) {
      const id = await uploadImage(service.imageSeeds[i], service.imageAlts[i]);
      assetIds.push(id);
    }

    // Send ALL fields so nothing gets wiped by the PUT replace
    await updateDoc(service.docId, `Service: ${service.title}`, service.uid, {
      meta_title: null,
      meta_description: null,
      title: service.title,
      category: service.category,
      image: { id: service.thumbnailId },
      description: service.description,
      body: makeBody(...service.bodyText),
      gallery: makeGallery(...assetIds),
      sort_order: service.sort_order,
    });
  }

  console.log("\n=== Done! ===");
  console.log(
    "Go to https://shiny-flaons-6l6fb5.prismic.io → Releases → publish the migration release."
  );
}

run().catch((err) => {
  console.error("\nFailed:", err.message);
  process.exit(1);
});
