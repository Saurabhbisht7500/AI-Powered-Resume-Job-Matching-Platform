import Link from "next/link";
import { useRouter } from "next/router";
import {
  LayoutDashboard,
  Upload,
  Briefcase,
  BarChart2,
  Clock,
  User,
  Settings,
  LogOut,
  LogIn,
  FileText,
  Sparkles,
} from "lucide-react";

const NAV_GROUPS = [
  {
    title: "MAIN",
    items: [
      { label: "Dashboard", href: "/", icon: LayoutDashboard },
      { label: "Upload Resume", href: "/upload", icon: Upload },
      { label: "Job Listings", href: "/jobs", icon: Briefcase },
      { label: "My Matches", href: "/matches", icon: BarChart2 },
    ],
  },
  {
    title: "RESUME",
    items: [
      { label: "Resume History", href: "/history", icon: Clock },
      { label: "Resume Analysis", href: "/upload", icon: Sparkles },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      { label: "Profile", href: "/profile", icon: User },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export default function Sidebar({ logout }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();

    if (typeof logout === "function") {
      logout();
    }

    router.push("/login");
  };

  const navItems = NAV_GROUPS.flatMap((group) => group.items);

  return (
    <>
      <aside className="hidden min-h-screen w-72 flex-col bg-sidebar px-4 py-6 text-white md:flex">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <FileText size={20} />
          </div>
          <div>
            <p className="text-base font-bold leading-tight">AI Resume Matcher</p>
            <p className="text-xs text-slate-400">Smart Career Assistant</p>
          </div>
        </div>

        <nav className="flex-1 space-y-5">
          {NAV_GROUPS.map(({ title, items }) => (
            <div key={title} className="space-y-1">
              <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                {title}
              </p>
              {items.map(({ label, href, icon: Icon }) => {
                const active = router.pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                      active
                        ? "bg-primary text-white"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="mb-4 flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          <LogOut size={18} />
          Logout
        </button>

        <div className="rounded-xl bg-slate-800/60 p-4">
          <Sparkles size={18} className="mb-2 text-primary" />
          <p className="mb-1 text-sm font-semibold">Improve your matches</p>
          <p className="mb-3 text-xs text-slate-400">
            Add more skills to your resume to increase your match score.
          </p>
          <Link
            href="/upload"
            className="block rounded-lg bg-primary py-2 text-center text-sm font-medium text-white transition hover:bg-primary-dark"
          >
            View Suggestions
          </Link>
        </div>
      </aside>

      <div className="border-b border-slate-200 bg-slate-900 px-3 py-3 md:hidden">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = router.pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap ${
                  active ? "bg-primary text-white" : "bg-slate-800 text-slate-200"
                }`}
              >
                <Icon size={14} />
                {label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={handleLogout}
            className="flex shrink-0 items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-xs font-medium whitespace-nowrap text-slate-200"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
