"use server";

import { redirect } from "next/navigation";
import { clearSessionCookie, setSessionCookie, verifyCredentials } from "@/lib/auth";

export type LoginState = { error?: string; username?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!verifyCredentials(username, password)) {
    return { error: "Wrong username or password. Kokos is judging you.", username };
  }
  await setSessionCookie();
  redirect("/admin");
}

export async function logout() {
  await clearSessionCookie();
  redirect("/admin/login");
}
