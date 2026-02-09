import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";

export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT!;

const routes: prismic.ClientConfig["routes"] = [
  { type: "home_page", path: "/" },
  { type: "gallery_page", path: "/book-now" },
  { type: "plans_page", path: "/plans" },
];

export function createClient(config?: prismic.ClientConfig) {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions: {
      next: { tags: ["prismic"] },
    },
    ...config,
  });

  prismicNext.enableAutoPreviews({ client });

  return client;
}
