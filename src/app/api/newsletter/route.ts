import { NextResponse } from "next/server";
import { getTexts } from "@/lib/db/queries";
import { subscribe } from "@/lib/mailerlite";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: { email?: unknown; name?: unknown; website?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const t = await getTexts();

  // Honeypot filled → pretend success, drop silently.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ message: t.newsletterSuccess });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ message: t.newsletterInvalid }, { status: 400 });
  }

  const result = await subscribe(email, name || undefined);
  if (!result.ok) return NextResponse.json({ message: result.full ? t.newsletterFull : result.message }, { status: 502 });

  return NextResponse.json({
    message: result.alreadySubscribed ? t.newsletterAlready : t.newsletterSuccess,
  });
}
