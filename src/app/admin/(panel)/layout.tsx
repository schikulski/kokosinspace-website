import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logout } from "../login/actions";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <>
      <div className="adm-bar">
        <Link href="/admin" className="adm-brand">
          Kokos admin
        </Link>
        <nav>
          <Link href="/admin#bands">Bands</Link>
          <Link href="/admin#releases">Releases</Link>
          <a href="/" target="_blank" rel="noopener">
            View site ↗
          </a>
          <form action={logout}>
            <button type="submit" className="adm-btn">
              Log out
            </button>
          </form>
        </nav>
      </div>
      <main className="adm-main">{children}</main>
    </>
  );
}
