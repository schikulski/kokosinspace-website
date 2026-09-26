import { About } from "@/components/About";
import { Bands } from "@/components/Bands";
import { Contact } from "@/components/Contact";
import { FloatingKokos } from "@/components/FloatingKokos";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Releases } from "@/components/Releases";
import type { Metadata } from "next";
import { getBands, getContactEmails, getHeroImages, getReleases, getTexts } from "@/lib/db/queries";

// Always render from the database. Neon runs in the same AWS region as the
// Vercel functions (us-east), so a request costs a few tens of milliseconds,
// and admin edits show up on the very next page load.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTexts();
  return {
    title: t.siteName,
    description: t.metaDescription,
    openGraph: { title: t.siteName, description: t.metaDescription, siteName: t.siteName },
  };
}

export default async function Home() {
  const [bands, releases, emails, heroImages, t] = await Promise.all([
    getBands(),
    getReleases(),
    getContactEmails(),
    getHeroImages(),
    getTexts(),
  ]);

  return (
    <>
      <FloatingKokos />
      <div className="grain" aria-hidden="true" />
      <Header {...emails} t={t} />
      <main>
        <Hero images={heroImages} t={t} />
        <Marquee names={bands.map((b) => b.name)} />
        <Bands bands={bands} t={t} />
        <Releases releases={releases} t={t} />
        <About t={t} />
        <Contact {...emails} t={t} />
      </main>
      <Footer t={t} />
    </>
  );
}
