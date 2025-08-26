import TanstackTable from "@/components/derived/table";
import { rootRoute } from "@/index";
import { createRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";

export const clientRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/client",
  component: ClientPage,
});

type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
};

const clients: Client[] = [
  {
    id: "CL-001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+62 812 3456 7890",
    company: "Acme Corporation",
  },
  {
    id: "CL-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+62 811 9876 5432",
    company: "Global Solutions",
  },
];

const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Client Name",
    cell: (info) => (
      <span className="font-medium text-gray-900 dark:text-gray-100">
        {info.getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => (
      <span className="text-sm text-gray-600 dark:text-neutral-400">
        {info.getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: (info) => (
      <span className="text-sm text-gray-600 dark:text-neutral-400">
        {info.getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "company",
    header: "Company / Organization",
    cell: (info) => (
      <span className="text-sm text-gray-600 dark:text-neutral-400">
        {info.getValue() as string}
      </span>
    ),
  },
];

export function ClientPage() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-col">
        <TanstackTable
          title="Clients"
          description="Manage client information, contacts, and history"
          data={clients}
          columns={columns}
          initialPageSize={10}
          pageSizeOptions={[10, 25, 50]}
        />
      </div>
    </div>
  );
}
