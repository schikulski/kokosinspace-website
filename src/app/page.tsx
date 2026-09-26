import { About } from "@/components/About";
import { Bands } from "@/components/Bands";
import { Contact } from "@/components/Contact";
import { FloatingKokos } from "@/components/FloatingKokos";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Releases } from "@/components/Releases";
import { getBands, getContactEmails, getHeroImages, getReleases } from "@/lib/db/queries";

// Always render from the database. Neon runs in the same AWS region as the
// Vercel functions (us-east), so a request costs a few tens of milliseconds,
// and admin edits show up on the very next page load.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [bands, releases, emails, heroImages] = await Promise.all([
    getBands(),
    getReleases(),
    getContactEmails(),
    getHeroImages(),
  ]);

  return (
    <>
      <FloatingKokos />
      <div className="grain" aria-hidden="true" />
      <Header {...emails} />
      <main>
        <Hero images={heroImages} />
        <Marquee names={bands.map((b) => b.name)} />
        <Bands bands={bands} />
        <Releases releases={releases} />
        <About />
        <Contact {...emails} />
      </main>
      <Footer />
    </>
  );
}
