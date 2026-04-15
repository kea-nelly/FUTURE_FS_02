import { useState } from "react";
import { LeadStatus } from "@/types/lead";
import { useLeads } from "@/hooks/useLeads";
import { StatsCards } from "@/components/crm/StatsCards";
import { LeadTable } from "@/components/crm/LeadTable";
import { LeadDetail } from "@/components/crm/LeadDetail";
import { AddLeadDialog } from "@/components/crm/AddLeadDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";

const filters: { value: LeadStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "converted", label: "Converted" },
];

export default function Leads() {
  const { leads, updateLeadStatus, addNote, addLead, deleteLead } = useLeads();
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [search, setSearch] = useState("");

  const selectedLead = leads.find((l) => l.id === selectedLeadId) ?? null;

  return (
    <Layout>
      <div className="p-6">
        {selectedLead ? (
          <LeadDetail
            lead={selectedLead}
            onBack={() => setSelectedLeadId(null)}
            onStatusChange={updateLeadStatus}
            onAddNote={addNote}
            onDelete={deleteLead}
          />
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h1 className="gradient-heading mb-6">Leads</h1>
              <AddLeadDialog onAdd={addLead} />
            </div>

            <StatsCards leads={leads} />

            <div className="flex gap-3 my-4">
              {filters.map((f) => (
                <Button key={f.value} onClick={() => setFilter(f.value)}>
                  {f.label}
                </Button>
              ))}
            </div>

            <div className="relative mb-4 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            <LeadTable
              leads={leads}
              onSelect={(lead) => setSelectedLeadId(lead.id)}
              onStatusChange={updateLeadStatus}
              filter={filter}
              searchQuery={search}
            />
          </>
        )}
      </div>
    </Layout>
  );
}
