import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Topbar from "../components/Topbar";
import { withAuth } from "../hoc/withAuth";

function Settings() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTheme = localStorage.getItem("theme");
    const enabled = savedTheme === "dark";
    setDarkMode(enabled);
    document.documentElement.classList.toggle("dark", enabled);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <Layout>
      <Topbar title="Settings" subtitle="Manage your preferences" />
      <div className="max-w-xl space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 py-2 dark:border-slate-700">
          <span className="text-sm text-slate-700 dark:text-slate-300">
            Email notifications for new matches
          </span>
          <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
        </div>
        <div className="flex items-center justify-between border-b border-slate-100 py-2 dark:border-slate-700">
          <span className="text-sm text-slate-700 dark:text-slate-300">Dark mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
            className="h-4 w-4 accent-primary"
          />
        </div>
        <p className="pt-2 text-xs text-slate-400 dark:text-slate-500">
          Settings are placeholders in this version — wire them up to a User model once
          authentication is added.
        </p>
      </div>
    </Layout>
  );
}

export default withAuth(Settings);
