import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const useLeads = () => {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const { data, error } = await supabase.from("leads").select("*");

    if (error) {
      console.error(error);
    } else {
      setLeads(data || []);
    }
  };

  const addLead = async (lead: any) => {
    const { error } = await supabase.from("leads").insert([lead]);

    if (error) {
      console.error(error);
      alert("Error saving lead");
    } else {
      fetchLeads();
    }
  };

  const updateLeadStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id);

    if (error) console.error(error);
    else fetchLeads();
  };

  const deleteLead = async (id: string) => {
    const { error } = await supabase.from("leads").delete().eq("id", id);

    if (error) console.error(error);
    else fetchLeads();
  };

  const addNote = async (id: string, note: string) => {
    const { error } = await supabase
      .from("leads")
      .update({ notes: note })
      .eq("id", id);

    if (error) console.error(error);
    else fetchLeads();
  };

  return {
    leads,
    addLead,
    updateLeadStatus,
    deleteLead,
    addNote,
  };
};
