import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getFilteredRowModel
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useState } from "react"
// import EditUserDrawer from "./EditUserDrawer"

export function DataTable({ columns, data }) {
//     const [open, setOpen] = useState(false)
const [columnFilters, setColumnFilters] = useState([])
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            columnFilters
        },
        onColumnFiltersChange: setColumnFilters,
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
    })

    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className="font-bold">
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow 
                            // onClick={
                            //     () => {
                            //         setOpen(true);
                            //         setSelectedUser(row.original)
                            //     }
                            // }
                            key={row.id} 
                            className="hover:bg-muted">
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex items-center justify-between px-4 py-3">
                <div className="text-sm text-black font-semibold">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
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


            {/* <EditUserDrawer open={open} setOpen={setOpen} selectedUser={selectedUser}/> */}
        </div>
    )
}