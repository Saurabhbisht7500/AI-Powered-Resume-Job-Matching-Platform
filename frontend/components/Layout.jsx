import Sidebar from "./Sidebar";

export default function Layout({ children, logout }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100 transition-colors duration-200 dark:bg-slate-950 md:flex-row">
      <Sidebar logout={logout} />
      <main className="w-full max-w-[1600px] flex-1 bg-slate-100 p-4 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100 sm:p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
