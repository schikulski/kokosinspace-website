import Link from "next/link";
import { connection } from "next/server";
import { getTexts } from "@/lib/db/queries";

export default async function NotFound() {
  // Render per request so text edits in the admin show up here too.
  await connection();
  const t = await getTexts();
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, textAlign: "center" }}>
      <div>
        <h1 style={{ fontSize: "clamp(48px,8vw,110px)", lineHeight: 0.9, textTransform: "uppercase" }}>
          <span style={{ display: "inline-block", background: "#111", color: "#efe9db", padding: "0 12px", transform: "rotate(-2deg)" }}>404</span>
        </h1>
        <p className="hand" style={{ fontSize: 26, color: "#1e4f66", marginTop: 20 }}>
          {t.notFoundText}
        </p>
        <p style={{ marginTop: 24 }}>
          <Link href="/" className="chip chip--ink">
            {t.notFoundLink}
          </Link>
        </p>
      </div>
    </main>
  );
}
