import type { Metadata } from "next";
import { Geist, Geist_Mono, Raleway } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://1-story.com";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  const title = settings.data.site_title
    ? `${settings.data.site_title} | ${settings.data.site_tagline ?? "Personal Life Coach"}`
    : "Allan Johnson | Personal Life Coach";

  const description =
    settings.data.meta_description ??
    "Transform your life with personal coaching from Allan Johnson. Health & wellness, career, and personal life coaching services.";

  const ogImage = settings.data.og_image?.url ?? `${siteUrl}/og-default.jpg`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${settings.data.site_title ?? "1Story"}`,
    },
    description,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      type: "website",
      siteName: settings.data.site_title ?? "1Story",
      title,
      description,
      url: siteUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();
  const settings = await client.getSingle("settings");

  const navigation = settings.data.navigation.map((item) => ({
    label: item.label ?? "",
    href: item.href ?? "",
  }));

  const contact = {
    address: settings.data.address ?? "",
    phone: settings.data.phone ?? "",
    fax: settings.data.fax ?? "",
    email: settings.data.email ?? "",
  };

  const socialLinks = settings.data.social_links.map((item) => ({
    platform: (item.platform ?? "") as string,
    url: item.url ?? "#",
  }));

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${raleway.variable} antialiased`}
      >
        <Header
          navigation={navigation}
          siteTitle={settings.data.site_title ?? "Allan Johnson"}
          siteTagline={settings.data.site_tagline ?? "Personal Life Coach"}
        />
        {children}
        <Footer
          contact={contact}
          socialLinks={socialLinks}
          siteTitle={settings.data.site_title ?? "Allan Johnson"}
          siteTagline={settings.data.site_tagline ?? "Personal Life Coach"}
        />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
