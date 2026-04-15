type Props = {
  status?: string;
};

export function StatusBadge({ status }: Props) {
  const statusConfig: Record<string, { label: string; className: string }> = {
    new: {
      label: "New",
      className: "bg-blue-100 text-blue-700",
    },
    contacted: {
      label: "Contacted",
      className: "bg-yellow-100 text-yellow-700",
    },
    converted: {
      label: "Converted",
      className: "bg-green-100 text-green-700",
    },
  };

  // ✅ SAFE FALLBACK
  const safeStatus = status?.toLowerCase?.() || "new";

  const config = statusConfig[safeStatus] || statusConfig["new"];

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
