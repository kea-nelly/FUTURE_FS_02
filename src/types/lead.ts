export type LeadStatus = "new" | "contacted" | "converted";

export interface LeadNote {
  id: string;
  text: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source: string;
  status: LeadStatus;
  notes: LeadNote[];
  createdAt: string;
  updatedAt: string;
}
