import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin · Kokos in Space Records",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="adm-body">{children}</div>;
}
