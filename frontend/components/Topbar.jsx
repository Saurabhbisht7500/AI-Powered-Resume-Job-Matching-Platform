import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Upload, LogOut } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";
import { logout as apiLogout } from "../lib/api";

export default function Topbar({ title = "Dashboard", subtitle, showLogout = false }) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await apiLogout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      logout();
      router.push("/login");
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="mb-8 flex items-center justify-between gap-6 border-b border-slate-200 pb-5 dark:border-slate-700">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        {user ? (
          <Link
            href="/profile"
            className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:text-white"
          >
            Profile
          </Link>
        ) : null}
        {showLogout && (
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-1 rounded bg-red-600 px-3 py-2 text-sm text-white transition hover:bg-red-500 disabled:opacity-50"
          >
            <LogOut size={16} />
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        )}
      </div>
    </div>
  );
}
