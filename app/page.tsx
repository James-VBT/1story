import type { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("home_page");

  const title = page.data.meta_title ?? undefined;
  const description = page.data.meta_description ?? undefined;

  return {
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: { title, description, url: "/" },
    twitter: { title, description },
  };
}

export default async function Home() {
  const client = createClient();
  const page = await client.getSingle("home_page");

  return (
    <main>
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}
