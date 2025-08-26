import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  RowData,
  RowSelectionState,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";

export type TanstackTableProps<T extends RowData> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  getRowId?: (row: T, index: number) => string;
  manualPagination?: boolean;
  pageCount?: number;
  pageSizeOptions?: number[];
  initialPageSize?: number;
  isLoading?: boolean;
  compact?: boolean;
  onPaginationChange?: (pageIndex: number, pageSize: number) => void;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  renderSubComponent?: (row: any) => React.ReactNode;
  globalFilterPlaceholder?: string;
  title: string;
  description: string;
};

export default function TanstackTable<T extends RowData>(
  props: TanstackTableProps<T>
) {
  const {
    data,
    columns,
    getRowId,
    manualPagination = false,
    pageCount: controlledPageCount,
    initialPageSize = 10,
    isLoading = false,
    compact = false,
    onPaginationChange,
    onRowSelectionChange,
    renderSubComponent,
  } = props;

  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    manualPagination,
    pageCount: manualPagination ? controlledPageCount ?? -1 : undefined,
    getRowId: getRowId ?? ((row: any, index: number) => String(index)),
    onRowSelectionChange: onRowSelectionChange,
    initialState: {
      pagination: { pageIndex: 0, pageSize: initialPageSize },
    } as Partial<TableOptions<T>["state"]>,
    debugTable: false,
  });

  React.useEffect(() => {
    if (!manualPagination) return;
    if (!onPaginationChange) return;
    const { pageIndex, pageSize } = table.getState().pagination;
    onPaginationChange(pageIndex, pageSize);
  }, [
    table.getState().pagination.pageIndex,
    table.getState().pagination.pageSize,
  ]);

  return (
    <div className="max-w-screen-lg p-3.5 mx-auto w-full">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="bg-white border border-gray-200 rounded-xl shadow-2xs overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
              <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                    {props.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-neutral-400">
                    {props.description}
                  </p>
                </div>

                <div>
                  <div className="inline-flex gap-x-2">
                    <button
                      className="py-2 px-3 flex gap-1 text-sm font-medium items-center rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
                      type="button"
                    >
                      <PlusIcon className="size-4" />
                      Create
                    </button>
                  </div>
                </div>
              </div>

              {/* Table */}
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead className="bg-gray-50 dark:bg-neutral-900">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          className="px-6 py-3 text-start"
                          onClick={
                            header.column.getToggleSortingHandler() as any
                          }
                        >
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </span>

                            <div className="ml-2">
                              {header.column.getIsSorted() === "asc"
                                ? "▲"
                                : header.column.getIsSorted() === "desc"
                                ? "▼"
                                : ""}
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                  {isLoading ? (
                    <tr>
                      <td className="p-6 text-center" colSpan={columns.length}>
                        Loading...
                      </td>
                    </tr>
                  ) : table.getRowModel().rows.length === 0 ? (
                    <tr>
                      <td className="p-6 text-center" colSpan={columns.length}>
                        No data
                      </td>
                    </tr>
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <React.Fragment key={row.id}>
                        <tr className="bg-white hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                          {row.getVisibleCells().map((cell) => (
                            <td
                              key={cell.id}
                              className={`size-px whitespace-nowrap px-6 py-2 align-top ${
                                compact ? "text-sm" : "text-base"
                              }`}
                            >
                              {/* If this cell contains status text, you can map to badge styles in column.cell instead */}
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          ))}
                        </tr>

                        {row.getIsExpanded() && renderSubComponent ? (
                          <tr>
                            <td
                              className="px-6 py-3 bg-gray-50"
                              colSpan={row.getVisibleCells().length}
                            >
                              {renderSubComponent(row.original)}
                            </td>
                          </tr>
                        ) : null}
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </table>

              {/* Footer */}
              <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
                <div>
                  <p className="text-sm text-gray-600 dark:text-neutral-400">
                    <span className="font-semibold text-gray-800 dark:text-neutral-200">
                      {table.getRowModel().rows.length}
                    </span>{" "}
                    results
                  </p>
                </div>

                <div>
                  <div className="inline-flex gap-x-2">
                    <button
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                    >
                      Prev
                    </button>

                    <button
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
              {/* End Footer */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
