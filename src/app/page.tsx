import { About } from "@/components/About";
import { Bands } from "@/components/Bands";
import { Contact } from "@/components/Contact";
import { FloatingKokos } from "@/components/FloatingKokos";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Releases } from "@/components/Releases";
import { getBands, getContactEmails, getReleases } from "@/lib/db/queries";

export const revalidate = 3600;

export default async function Home() {
  const [bands, releases, emails] = await Promise.all([getBands(), getReleases(), getContactEmails()]);

  return (
    <>
      <FloatingKokos />
      <div className="grain" aria-hidden="true" />
      <Header {...emails} />
      <main>
        <Hero />
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
