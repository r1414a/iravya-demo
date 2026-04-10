// dc-table/columns.jsx
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    MoreHorizontal,
    Pencil,
    Truck,
    Users,
    MapPin,
    Eye,
} from "lucide-react"
import { useState } from "react"
import DCDetailDrawer from "../DcDetailDrawer"
import AddDCForm from "../AddDcForm"
import DeleteModal from "@/components/DeleteModal"
import { format, parseISO } from "date-fns"
import { toast } from "sonner"

const statusStyles = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-500",
}

function ActionsCell({ row, onEditDC, onDeleteDC }) {
    const dc = row.original
    const [viewDetails, setViewDetails] = useState(false)
    const [editOpen, setEditOpen] = useState(false)

    const handleDelete = async () => {
        await onDeleteDC(dc.id)
        toast.success("DC deleted successfully", {
            description: `${dc.dc_name} has been removed.`,
            style: {
                    color: "green"
                }
        })
    }

    return (
        <>
            <DCDetailDrawer
                dc={dc}
                open={viewDetails}
                onClose={() => setViewDetails(false)}
            />

            <AddDCForm
                dc={dc}
                open={editOpen}
                onClose={() => setEditOpen(false)}
                onEditDC={onEditDC}
            />

            <div className="flex items-center gap-2 justify-end">
                <Button 
                    variant="outline" 
                    size="xs" 
                    onClick={() => setViewDetails(true)} 
                    className="hover:bg-maroon cursor-pointer text-blue-800 hover:text-white"
                >
                    <Eye size={16} />
                </Button>
                
                <Button 
                    variant="outline" 
                    size="xs" 
                    onClick={() => setEditOpen(true)} 
                    className="hover:bg-maroon cursor-pointer hover:text-white"
                >
                    <Pencil size={16} />
                </Button>

                <DeleteModal
                    who={dc.dc_name}
                    m1active="No new trips can be dispatched from this DC"
                    onConfirm={handleDelete}
                />
            </div>
        </>
    )
}

export const columns = ({ onEditDC, onDeleteDC }) => [
    {
        accessorKey: "dc_name",
        header: "Data center",
        cell: ({ row }) => {
            const { dc_name, city, address } = row.original
            return (
                <div className="-space-y-0.5">
                    <p className="font-semibold text-sm">{dc_name}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 text-wrap">
                        <MapPin size={10} /> {address}
                    </p>
                </div>
            )
        },
    },
    {
        accessorKey: "dc_manager_name",
        header: "DC operator",
        cell: ({ row }) => {
            const { dc_manager_name, dc_manager_phone } = row.original
            return (
                <div className="-space-y-0.5">
                    <p className="text-sm font-medium">{dc_manager_name}</p>
                    <p className="text-xs text-gray-400">{dc_manager_phone}</p>
                </div>
            )
        },
    },
    {
        accessorKey: "total_trucks",
        header: "Fleet",
        cell: ({ row }) => {
            const { total_trucks, active_trucks, total_drivers } = row.original
            return (
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Truck size={11} className="text-gray-400" />
                        <span>{active_trucks}/{total_trucks} trucks active</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Users size={11} className="text-gray-400" />
                        <span>{total_drivers} drivers</span>
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "active_trips",
        header: "Trips",
        cell: ({ row }) => {
            const { active_trips, total_trips } = row.original
            return (
                <div className="-space-y-0.5">
                    <p className="text-sm font-medium">{active_trips} active</p>
                    <p className="text-xs text-gray-400">{total_trips} total</p>
                </div>
            )
        },
    },
    {
        accessorKey: "created_at",
        header: "Since",
        cell: ({ row }) => (
            <span className="text-sm text-gray-500">
                {format(parseISO(row.getValue("created_at")), 'MMM yyyy')}
            </span>
        )
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            const current = column.getFilterValue() || "all"
            return (
                <div className="flex items-center gap-2">
                    <span>Status</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-6 min-w-14 text-[10px]">
                                {current === "all" ? "All" : current.charAt(0).toUpperCase() + current.slice(1)}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-32 bg-white border shadow-md">
                            <DropdownMenuRadioGroup
                                value={current}
                                onValueChange={(val) =>
                                    column.setFilterValue(val === "all" ? undefined : val)
                                }
                            >
                                <DropdownMenuRadioItem value="all" className="text-xs">All</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="active" className="text-xs">Active</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="inactive" className="text-xs">Inactive</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
        cell: ({ row }) => {
            const s = row.original.status
            return (
                <Badge className={`${statusStyles[s]} border-0 text-xs font-medium`}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                </Badge>
            )
        },
        filterFn: (row, id, value) => {
            if (!value) return true
            return row.getValue(id) === value
        },
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <ActionsCell 
                row={row} 
                onEditDC={onEditDC}
                onDeleteDC={onDeleteDC}
            />
        ),
    },
]