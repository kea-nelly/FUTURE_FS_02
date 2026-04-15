import { useState } from "react";
import { LeadStatus } from "@/types/lead";
import { useLeads } from "@/hooks/useLeads";
import { LeadTable } from "@/components/crm/LeadTable";
import { LeadDetail } from "@/components/crm/LeadDetail";
import { AddLeadDialog } from "@/components/crm/AddLeadDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, LayoutDashboard } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { StatsCards } from "@/components/crm/StatsCards";
import { AnalyticsChart } from "@/components/crm/AnalyticsChart";
import { StatusPieChart } from "@/components/crm/StatusPieChart";

const filters: { value: LeadStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "converted", label: "Converted" },
];

export default function Index() {
  const navigate = useNavigate();
  const { leads, updateLeadStatus, addNote, addLead, deleteLead } = useLeads();
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);

  const selectedLead = leads.find((l) => l.id === selectedLeadId) ?? null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main content */}
      <Layout>
        <h1 className="gradient-heading mb-6">Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          Welcome to my CRM system 🚀
        </p>

        {/* Stats */}
        <StatsCards leads={leads} />

        {/* Chart */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <AnalyticsChart />
          <StatusPieChart leads={leads} />
        </div>
      </Layout>
    </div>
  );
}
