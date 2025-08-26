import TanstackTable from "@/components/derived/table";
import { rootRoute } from "@/index";
import { createRoute } from "@tanstack/react-router";
import { ColumnDef } from "@tanstack/react-table";

export const catalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/catalog",
  component: CatalogPage,
});

type Catalog = {
  id: string;
  title: string;
  items: string;
  amount: number;
};

const catalogs: Catalog[] = [
  {
    id: "CAT-001",
    title: "Logo Design",
    items: "Poster Logo",
    amount: 500,
  },
  {
    id: "CAT-002",
    title: "Web Development",
    items: "Design, Development, Instalation",
    amount: 2500,
  },
];

const columns: ColumnDef<Catalog>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: (info) => (
      <span className="font-medium text-gray-900 dark:text-gray-100">
        {info.getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: (info) => (
      <span className="text-sm text-gray-600 dark:text-neutral-400">
        {info.getValue() as number}
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
];

export function CatalogPage() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-col">
        <TanstackTable
          title="Catalog"
          description="Manage all your services in one place create, update, and showcase"
          data={catalogs}
          columns={columns}
          initialPageSize={10}
          pageSizeOptions={[10, 25, 50]}
        />
      </div>
    </div>
  );
}
