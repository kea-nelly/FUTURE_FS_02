import { Lead, LeadStatus } from "@/types/lead";
import { StatusBadge } from "./StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LeadTableProps {
  leads: Lead[];
  onSelect: (lead: Lead) => void;
  onStatusChange: (id: string, status: LeadStatus) => void;
  filter: LeadStatus | "all";
  searchQuery: string;
}

export function LeadTable({
  leads,
  onSelect,
  onStatusChange,
  filter,
  searchQuery,
}: LeadTableProps) {
  const filtered = leads.filter((lead) => {
    const matchesFilter = filter === "all" || lead.status === filter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      lead.name.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.source.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Date Added</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-8 text-muted-foreground"
              >
                No leads found.
              </TableCell>
            </TableRow>
          ) : (
            filtered.map((lead) => (
              <TableRow
                key={lead.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => onSelect(lead)}
              >
                <TableCell className="font-medium">{lead.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {lead.email}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {lead.source}
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Select
                    value={lead.status}
                    onValueChange={(v) =>
                      onStatusChange(lead.id, v as LeadStatus)
                    }
                  >
                    <SelectTrigger className="w-32 h-8 border-none shadow-none bg-transparent p-0">
                      <StatusBadge status={lead.status} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right text-muted-foreground text-sm">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
