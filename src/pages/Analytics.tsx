import { useLeads } from "@/hooks/useLeads";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Layout from "@/components/Layout";

export default function Analytics() {
  const { leads } = useLeads();

  const data = [
    { name: "New", value: leads.filter((l) => l.status === "new").length },
    {
      name: "Contacted",
      value: leads.filter((l) => l.status === "contacted").length,
    },
    {
      name: "Converted",
      value: leads.filter((l) => l.status === "converted").length,
    },
  ];

  return (
    <Layout>
      <div className="p-6">
        <h1 className="gradient-heading mb-8">Analytics</h1>
        <p>The bar graph is to show hoe many leads are in each category </p>
        <p>Showing the number of leads in contacted, converted etc</p>
        <br />
        <div className="bg-white p-4 rounded-xl shadow">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
}
