import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table"
import {
    Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useState } from "react"
 
export function DataTable({ columns, data }) {
    const [columnFilters, setColumnFilters] = useState([])
 
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: { columnFilters },
        onColumnFiltersChange: setColumnFilters,
        initialState: { pagination: { pageSize: 10 } },
    })
 
    return (
        <div className="border rounded-lg">
            {/* Mark all read toolbar */}
            <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
                <p className="text-xs text-gray-500">
                    <span className="font-semibold text-maroon">
                        {data.filter(a => !a.isRead).length}
                    </span> unread · {data.length} total
                </p>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-7 text-maroon border-maroon/30 hover:bg-maroon/5"
                >
                    Mark all as read
                </Button>
            </div>
 
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((hg) => (
                        <TableRow key={hg.id}>
                            {hg.headers.map((header) => (
                                <TableHead key={header.id} className="font-bold">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
 
                <TableBody>
                    {table.getRowModel().rows.map((row) => {
                        const isUnread = !row.original.isRead
                        return (
                            <TableRow
                                key={row.id}
                                // onClick={() => onRowClick?.(row.original)}
                                className={`hover:bg-muted cursor-pointer ${isUnread ? "bg-red-50/40" : ""}`}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
 
            <div className="flex items-center justify-between px-4 py-3">
                <div className="text-sm text-black font-semibold">
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="bg-maroon text-xs hover:bg-maroon-dark cursor-pointer disabled:bg-gray-200 disabled:text-black"
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="bg-maroon text-xs hover:bg-maroon-dark cursor-pointer disabled:bg-gray-200 disabled:text-black"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}