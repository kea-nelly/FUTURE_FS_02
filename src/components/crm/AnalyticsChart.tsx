import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", leads: 4 },
  { name: "Tue", leads: 7 },
  { name: "Wed", leads: 3 },
  { name: "Thu", leads: 10 },
  { name: "Fri", leads: 6 },
];

export function AnalyticsChart() {
  return (
    <div className="bg-card p-5 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Leads Overview</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="leads" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
