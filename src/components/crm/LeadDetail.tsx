import { useState } from "react";
import { Lead, LeadStatus } from "@/types/lead";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Mail, Phone, Globe, Calendar, MessageSquarePlus, Trash2 } from "lucide-react";

interface LeadDetailProps {
  lead: Lead;
  onBack: () => void;
  onStatusChange: (id: string, status: LeadStatus) => void;
  onAddNote: (leadId: string, text: string) => void;
  onDelete: (id: string) => void;
}

export function LeadDetail({ lead, onBack, onStatusChange, onAddNote, onDelete }: LeadDetailProps) {
  const [noteText, setNoteText] = useState("");

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    onAddNote(lead.id, noteText.trim());
    setNoteText("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold tracking-tight">{lead.name}</h2>
          <p className="text-muted-foreground text-sm">Added {new Date(lead.createdAt).toLocaleDateString()}</p>
        </div>
        <Button variant="destructive" size="sm" onClick={() => { onDelete(lead.id); onBack(); }}>
          <Trash2 className="h-4 w-4 mr-1" /> Delete
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Info Card */}
        <div className="rounded-lg border bg-card p-5 space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Contact Info</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${lead.email}`} className="text-primary hover:underline">{lead.email}</a>
            </div>
            {lead.phone && (
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{lead.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span>{lead.source}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Last updated {new Date(lead.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div className="rounded-lg border bg-card p-5 space-y-4">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Status</h3>
          <div className="flex items-center gap-3">
            <StatusBadge status={lead.status} />
            <Select value={lead.status} onValueChange={(v) => onStatusChange(lead.id, v as LeadStatus)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="rounded-lg border bg-card p-5 space-y-4">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <MessageSquarePlus className="h-4 w-4" /> Notes & Follow-ups
        </h3>
        <div className="flex gap-2">
          <Textarea
            placeholder="Add a note or follow-up..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="min-h-[80px]"
          />
        </div>
        <Button onClick={handleAddNote} disabled={!noteText.trim()} size="sm">
          Add Note
        </Button>

        {lead.notes.length === 0 ? (
          <p className="text-sm text-muted-foreground italic">No notes yet.</p>
        ) : (
          <div className="space-y-3 mt-2">
            {lead.notes.map((note) => (
              <div key={note.id} className="rounded-md bg-muted p-3">
                <p className="text-sm">{note.text}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(note.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
