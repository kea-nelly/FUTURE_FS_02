import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type Props = {
  leads: any[];
};

export function StatusPieChart({ leads }: Props) {
  const data = leads.map((lead, index) => ({
    name: lead.name || `Lead ${index + 1}`,
    value: 1, // each lead = 1 slice
  }));
  const COLORS = [
    "#00f5ff",
    "#8b5cf6",
    "#22c55e",
    "#f502dd",
    "#fe0911",
    "#41f809",
    "#ee4001",
    "#0d06eb",
    "#1f0238",
  ]; // neon colors

  return (
    <div className="bg-card p-5 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Lead Status</h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
