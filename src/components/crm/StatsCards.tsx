import { Lead, LeadStatus } from "@/types/lead";
import { Users, UserCheck, UserPlus, ArrowRightLeft } from "lucide-react";

interface StatsCardsProps {
  leads: Lead[];
}

const statConfig: { status: LeadStatus | "all"; label: string; icon: React.ElementType; colorClass: string }[] = [
  { status: "all", label: "Total Leads", icon: Users, colorClass: "text-primary" },
  { status: "new", label: "New", icon: UserPlus, colorClass: "text-status-new" },
  { status: "contacted", label: "Contacted", icon: ArrowRightLeft, colorClass: "text-status-contacted" },
  { status: "converted", label: "Converted", icon: UserCheck, colorClass: "text-status-converted" },
];

export function StatsCards({ leads }: StatsCardsProps) {
  const getCount = (s: LeadStatus | "all") => (s === "all" ? leads.length : leads.filter((l) => l.status === s).length);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statConfig.map(({ status, label, icon: Icon, colorClass }) => (
        <div key={status} className="rounded-lg border bg-card p-4 flex items-center gap-4">
          <div className={`rounded-md bg-muted p-2.5 ${colorClass}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-2xl font-bold">{getCount(status)}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
