import { ResponsiveBar } from "@nivo/bar";

export type RevenueData = {
  month: string;
  revenue: number;
};

export function RevenueBarChart({ data }: { data: Array<RevenueData> }) {
  return (
    <div className="h-[400px] w-full rounded-md p-4">
      <ResponsiveBar
        data={data}
        keys={["revenue"]}
        indexBy="month"
        margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={["#3b82f6"]}
        borderRadius={4}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 8,
        }}
        axisLeft={{
          tickSize: 0,
          tickPadding: 8,
          tickValues: 4,
        }}
        enableGridX={false}
        enableGridY={true}
        enableLabel={false}
        tooltip={({ value, indexValue }) => (
          <div className="px-2 py-1 rounded-md bg-gray-900 text-white text-xs">
            {indexValue} — ${value}
          </div>
        )}
        theme={{
          axis: {
            ticks: {
              text: { fill: "#6b7280" },
            },
          },
          grid: {
            line: { stroke: "#e5e7eb", strokeWidth: 1 },
          },
          tooltip: {
            container: {
              background: "#111827",
              color: "#fff",
            },
          },
        }}
      />
    </div>
  );
}
