const API = "https://connect.mailerlite.com/api";

export type SubscribeResult = { ok: true; alreadySubscribed: boolean } | { ok: false; message: string };

export async function subscribe(email: string, name?: string): Promise<SubscribeResult> {
  const key = process.env.MAILERLITE_API_KEY;
  const group = process.env.MAILERLITE_GROUP_ID;
  if (!key) return { ok: false, message: "Newsletter is not configured." };

  const res = await fetch(`${API}/subscribers`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      ...(name ? { fields: { name } } : {}),
      ...(group ? { groups: [group] } : {}),
      status: "active",
    }),
  });

  if (res.status === 200) return { ok: true, alreadySubscribed: true };
  if (res.status === 201) return { ok: true, alreadySubscribed: false };

  const body = (await res.json().catch(() => ({}))) as { message?: string; errors?: Record<string, string[]> };
  const detail = body.errors ? Object.values(body.errors).flat()[0] : body.message;
  if (detail && /subscriber limit/i.test(detail)) {
    return { ok: false, message: "The list is full right now. Send us an email instead and we'll add you by hand." };
  }
  return { ok: false, message: detail || `MailerLite error (${res.status})` };
}
