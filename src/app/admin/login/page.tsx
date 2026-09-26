import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="adm-login">
      <div className="adm-card">
        <div className="adm-login-logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/kokos-bust.png" alt="" />
          <span className="adm-brand">Kokos admin</span>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
