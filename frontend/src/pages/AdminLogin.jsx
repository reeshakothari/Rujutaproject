import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { AlertCircle, Loader2, Lock } from "lucide-react";

// Not a secret — just labels which Supabase account backs the admin login.
// The real password check happens server-side against that account.
const ADMIN_SUPABASE_EMAIL = "adminrutuja@rutuja.internal";

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    document.title = "Admin Login | Rutuja";
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        const dest = location.state?.from || "/admin/submissions";
        navigate(dest, { replace: true });
      }
    });
  }, [navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    if (username !== process.env.REACT_APP_ADMIN_USERNAME) {
      setStatus("error");
      setErrorMsg("Invalid username or password.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: ADMIN_SUPABASE_EMAIL,
      password,
    });
    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
      return;
    }
    setStatus("idle");
    const dest = location.state?.from || "/admin/submissions";
    navigate(dest, { replace: true });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-rutuja-soft pt-[72px]" data-testid="admin-login-page">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm border border-rutuja-line bg-white p-8 shadow-[0_25px_60px_-28px_rgba(200,43,98,0.25)]"
      >
        <div className="flex items-center gap-2 text-rutuja-pink">
          <Lock size={18} aria-hidden="true" />
          <h1 className="font-serif text-xl text-rutuja-ink">Admin Login</h1>
        </div>
        <p className="mt-1 text-xs text-rutuja-muted">Sign in to view form submissions.</p>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="admin-username" className="text-sm font-medium text-rutuja-ink">
              Username
            </label>
            <input
              id="admin-username"
              type="text"
              required
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              data-testid="admin-login-username"
              className="w-full border border-rutuja-line bg-white px-4 py-3 text-base text-rutuja-ink outline-none focus:border-rutuja-pink"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="admin-password" className="text-sm font-medium text-rutuja-ink">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="admin-login-password"
              className="w-full border border-rutuja-line bg-white px-4 py-3 text-base text-rutuja-ink outline-none focus:border-rutuja-pink"
            />
          </div>
        </div>

        {status === "error" && (
          <p role="alert" className="mt-4 flex items-center gap-2 text-sm text-rutuja-pink" data-testid="admin-login-error">
            <AlertCircle size={16} className="shrink-0" aria-hidden="true" /> {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          data-testid="admin-login-submit"
          className="btn-primary mt-6 w-full rounded-sm px-8 py-3 text-base disabled:opacity-70"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </main>
  );
}
