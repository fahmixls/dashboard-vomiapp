import TanstackTable from "@/components/derived/table";
import { rootRoute } from "@/index";
import { createRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const invoiceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/invoice",
  component: InvoicePage,
});

type Invoice = {
  id: string;
  date: string;
  client: string;
  items: number;
  amount: number;
  status: "Paid" | "Unpaid" | "Overdue" | "Draft";
};

const invoices: Invoice[] = [
  {
    id: "ADUQ2189H1-0038",
    date: "2024-06-24",
    client: "John Doe",
    items: 3,
    amount: 1200,
    status: "Unpaid",
  },
  {
    id: "ADUQ218ADD-0099",
    date: "2024-07-01",
    client: "Acme Corp",
    items: 5,
    amount: 3000,
    status: "Paid",
  },
];

const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "id",
    header: "Invoice number",
    cell: (info) => (
      <span className="font-mono text-sm text-blue-600 dark:text-blue-500">
        #{info.getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (info) => (
      <span className="text-sm text-gray-600 dark:text-neutral-400">
        US ${(info.getValue() as number).toFixed(2)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      const status = info.getValue() as Invoice["status"];
      const statusConfig = {
        Paid: {
          bg: "bg-teal-100 dark:bg-teal-500/10",
          text: "text-teal-800 dark:text-teal-500",
          icon: (
            <svg
              className="size-2.5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          ),
        },
        Unpaid: {
          bg: "bg-amber-100 dark:bg-amber-500/10",
          text: "text-amber-800 dark:text-amber-500",
          icon: (
            <svg
              className="size-2.5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
            </svg>
          ),
        },
        Overdue: {
          bg: "bg-red-100 dark:bg-red-500/10",
          text: "text-red-800 dark:text-red-500",
          icon: (
            <svg
              className="size-2.5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
          ),
        },
        Draft: {
          bg: "bg-gray-100 dark:bg-gray-500/10",
          text: "text-gray-800 dark:text-gray-500",
          icon: (
            <svg
              className="size-2.5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          ),
        },
      };

      const config = statusConfig[status];

      return (
        <span
          className={`py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}
        >
          {config.icon}
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Due",
    cell: (info) => (
      <span className="text-sm text-gray-600 dark:text-neutral-400">
        {format(new Date(info.getValue() as string), "dd MMM yyyy")}
      </span>
    ),
  },
  {
    accessorKey: "client",
    header: "Created",
    cell: (info) => (
      <span className="text-sm text-gray-600 dark:text-neutral-400">
        {format(new Date(), "dd MMM, HH:mm")}
      </span>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: () => (
      <button
        type="button"
        className="py-1 px-2 inline-flex justify-center items-center gap-2 rounded-lg border border-gray-200 font-medium bg-white text-gray-700 shadow-2xs align-middle hover:bg-gray-50 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
      >
        <svg
          className="shrink-0 size-4"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z" />
          <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
        </svg>
        View
      </button>
    ),
  },
];

export function InvoicePage() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-col">
        <TanstackTable
          title="Invoices"
          description="Create invoices, edit, download and more."
          data={invoices}
          columns={columns}
          initialPageSize={10}
          pageSizeOptions={[10, 25, 50]}
        />
      </div>
    </div>
  );
}
