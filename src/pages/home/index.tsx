import {
  RevenueBarChart,
  RevenueData,
} from "@/components/derived/summary-bar-plot";
import { StatCard } from "@/components/derived/summary-card";
import { rootRoute } from "@/index";
import { createRoute } from "@tanstack/react-router";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const data: RevenueData[] = [
  { month: "Jan", revenue: 1200 },
  { month: "Feb", revenue: 2100 },
  { month: "Mar", revenue: 1800 },
  { month: "Apr", revenue: 2400 },
  { month: "May", revenue: 3200 },
  { month: "Jun", revenue: 2800 },
  { month: "Jul", revenue: 4000 },
  { month: "Aug", revenue: 3700 },
  { month: "Sep", revenue: 3100 },
  { month: "Oct", revenue: 4500 },
  { month: "Nov", revenue: 3900 },
  { month: "Dec", revenue: 5000 },
];

export function HomePage() {
  return (
    <div className="max-w-screen-lg mx-auto space-y-8 p-3.5">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Revenue"
          value="$124,500"
          trend="up"
          trendValue="+4.2%"
        />
        <StatCard title="Total VAT" value="$8,750" />
        <StatCard title="Paid Invoices" value="1,245" />
        <StatCard title="Unpaid Invoices" value="112" />
      </div>
      <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl p-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-200 mb-4">
          Monthly Revenue (Last 12 Months)
        </h2>
        <RevenueBarChart data={data} />
      </div>
    </div>
  );
}
