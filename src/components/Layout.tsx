import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, BarChart2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar text-sidebar-foreground shadow-xl p-5 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-lg">
            KN
          </div>
          <span className="text-xl font-bold">LeadFlow</span>
        </div>

        <button
          onClick={() => setDark(!dark)}
          className="mb-6 p-2 rounded-xl bg-pink-500/20 hover:bg-pink-500/40 text-pink-300 text-sm shadow-[0_0_10px_rgba(255,105,180,0.6)] transition"
        >
          🌙 Toggle Mode
        </button>

        <nav className="space-y-2">
          <button
            onClick={() => navigate("/")}
            className={`flex items-center gap-3 p-3 rounded-lg ${
              location.pathname === "/"
                ? "bg-sidebar-primary text-white"
                : "hover:bg-sidebar-accent"
            }`}
          >
            <LayoutDashboard
              className="text-pink-400 drop-shadow-[0_0_6px_rgba(255,105,180,0.8)]"
              size={18}
            />
            Dashboard
          </button>

          <button
            onClick={() => navigate("/leads")}
            className={`flex items-center gap-3 p-3 rounded-lg ${
              location.pathname === "/leads"
                ? "bg-sidebar-primary text-white"
                : "hover:bg-sidebar-accent"
            }`}
          >
            <Users size={18} />
            Leads
          </button>

          <button
            onClick={() => navigate("/analytics")}
            className={`flex items-center gap-3 p-3 rounded-lg ${
              location.pathname === "/analytics"
                ? "bg-sidebar-primary text-white"
                : "hover:bg-sidebar-accent"
            }`}
          >
            <BarChart2 size={18} />
            Analytics
          </button>
        </nav>
        <br />
        <br />
        <br />

        <button
          onClick={handleLogout}
          className="mb-6 p-2 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
        >
          🚪 Logout
        </button>
      </div>

      {/* Page Content */}
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
