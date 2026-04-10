import {
    flexRender,
    getCoreRowModel,
    useReactTable,
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
import EditUserDrawer from "./EditUserDrawer"

export function DataTable({
    columns,
    data = [],
    page = 1,
    totalPages = 1,
    onPrevious,
    onNext,
    isFetching = false
}) {

    console.log(page,totalPages)
    // const [open, setOpen] = useState(false)
    const [columnFilters, setColumnFilters] = useState([])
    // const [selectedUser, setSelectedUser] = useState(null)

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: { columnFilters },
        onColumnFiltersChange: setColumnFilters,
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
                    {isFetching ? (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="text-center py-6 text-gray-500"
                            >
                                Loading users...
                            </TableCell>
                        </TableRow>
                    ) : table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                className="hover:bg-muted cursor-pointer"
                                // onClick={() => {
                                //     setSelectedUser(row.original);
                                //     setOpen(true);
                                // }}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="text-center py-6 text-gray-500"
                            >
                                No drivers found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className="flex items-center justify-between px-4 py-3">
                <div className="text-sm text-black font-semibold">
                    Page {page} of {totalPages}
                </div>

                <div className="flex gap-2">
                    <Button
                        onClick={onPrevious}
                        disabled={page <= 1}
                        className="bg-maroon text-xs hover:bg-maroon-dark cursor-pointer disabled:bg-gray-200 disabled:text-black"
                    >
                        Previous
                    </Button>

                    <Button
                        onClick={onNext}
                        disabled={page >= totalPages}
                        className="bg-maroon text-xs hover:bg-maroon-dark cursor-pointer disabled:bg-gray-200 disabled:text-black"
                    >
                        Next
                    </Button>
                </div>
            </div>

            {/* <EditUserDrawer
                open={open}
                setOpen={setOpen}
                selectedUser={selectedUser}
            /> */}
        </div>
    )
}