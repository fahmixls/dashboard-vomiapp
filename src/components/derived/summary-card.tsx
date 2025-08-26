import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string | number;
  trend?: "up" | "down";
  trendValue?: string;
};

export function StatCard({ title, value, trend, trendValue }: StatCardProps) {
  return (
    <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
      <div className="p-4 md:p-5">
        <div className="flex items-center gap-x-2">
          <p className="text-xs uppercase text-gray-500 dark:text-neutral-500">
            {title}
          </p>
        </div>

        <div className="mt-1 flex items-center gap-x-2">
          <h3 className="text-xl sm:text-2xl font-medium font-sans tabular-nums text-gray-800 dark:text-neutral-200">
            {value}
          </h3>

          {trend && trendValue && (
            <span
              className={cn(
                "flex items-center gap-x-1 text-sm",
                trend === "up" ? "text-green-600" : "text-red-600"
              )}
            >
              {trend === "up" ? (
                <svg
                  className="inline-block size-4 self-center"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              ) : (
                <svg
                  className="inline-block size-4 self-center"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                  <polyline points="16 17 22 17 22 11" />
                </svg>
              )}
              {trendValue}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
