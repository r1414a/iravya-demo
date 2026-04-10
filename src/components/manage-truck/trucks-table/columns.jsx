// trucks-table/column.jsx
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    MoreHorizontal,
    Pencil,
    History,
    Wrench,
    SendHorizonal,
    Road,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import CreateTripModal from "../../manage-trip/CreateNewTrip"
import TruckDetailDrawer from "../TruckDetailDrawer"
import AddTruckModal from "../AddTruckForm"
import TripDetailSheet from "@/components/manage-trip/TripDetailSheet"
import { useLocation } from "react-router-dom"
import DeleteModal from "@/components/DeleteModal"
import { toast } from "sonner"

const typeLabels = {
    mini_truck: "Mini",
    medium: "Medium",
    heavy: "Heavy",
}

const statusStyles = {
    idle: "bg-green-100 text-green-700",
    in_transit: "bg-blue-100 text-blue-700",
    maintenance: "bg-amber-100 text-amber-700",
}

const statusLabels = {
    idle: "Idle",
    in_transit: "In transit",
    maintenance: "Maintenance",
}

function ActionsCell({ row, onEditTruck, onDeleteTruck }) {
    const truck = row.original
    const [editOpen, setEditOpen] = useState(false)
    const [tripHistory, setTripHistory] = useState(false)
    const [openDispatch, setOpenDispatch] = useState(false)
    const [tripDetailsOpen, setTripDetailsOpen] = useState(false)
    const location = useLocation()

    const handleDelete = async () => {
        await onDeleteTruck(truck.id)
        toast.success("Truck deleted successfully", {
            description: `${truck.registration_no} has been removed.`,
        })
    }

    return (
        <>
            <AddTruckModal
                truck={truck}
                open={editOpen}
                onClose={() => setEditOpen(false)}
                onEditTruck={onEditTruck}
            />

            <CreateTripModal
                truck={truck}
                open={openDispatch}
                onClose={() => setOpenDispatch(false)}
            />

            <TruckDetailDrawer
                truck={truck}
                open={tripHistory}
                onClose={() => setTripHistory(false)}
            />

            <TripDetailSheet
                trip={{
                    id: "TRP-2840",
                    brand: "Zudio",
                    truck: truck.registration_no,
                    driver: "Suresh M.",
                    gpsDevice: "GPS-002-PUNE",
                    sourceDC: "Mumbai Warehouse DC",
                    stops: [
                        { name: "Hinjawadi Store", status: "pending" },
                    ],
                    stopsCount: 1,
                    status: "in_transit",
                    departedAt: "Today, 08:15 AM",
                    eta: "Today, 10:30 AM",
                    completedAt: null,
                }}
                open={tripDetailsOpen}
                onClose={setTripDetailsOpen}
            />

            <div className="flex items-center gap-2 justify-end">
                {truck.status === "idle" && location.pathname.startsWith('/dc') && (
                    <Button
                        size="sm"
                        className="bg-maroon text-white h-7 px-3 text-xs flex items-center gap-1"
                        onClick={(e) => {
                            e.stopPropagation()
                            setOpenDispatch(true)
                        }}
                    >
                        <SendHorizonal size={12} />
                        Dispatch
                    </Button>
                )}

                {location.pathname.startsWith('/admin') && (
                    <>
                        <Button 
                            variant="outline" 
                            size="xs" 
                            onClick={() => setEditOpen(true)} 
                            className="hover:bg-maroon cursor-pointer hover:text-white"
                        >
                            <Pencil size={16} />
                        </Button>
                        <DeleteModal
                            who={truck.registration_no}
                            m1active="Truck will not be assignable to any trip"
                            onConfirm={handleDelete}
                        />
                    </>
                )}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white border shadow-md w-46">
                        {truck.status === "in_transit" && (
                            <DropdownMenuItem onClick={() => setTripDetailsOpen(true)} className="gap-2 text-sm cursor-pointer">
                                <Road size={14} /> View trip details
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => setTripHistory(true)} className="gap-2 text-sm cursor-pointer">
                            <History size={14} /> View trip history
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-sm cursor-pointer">
                            <Wrench size={14} /> Mark as maintenance
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}

export const columns = ({ onEditTruck, onDeleteTruck }) => [
    {
        accessorKey: "type",
        header: ({ column }) => {
            const currentValue = column.getFilterValue() || "all"
            return (
                <div className="flex items-center gap-2">
                    <span>Truck</span>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-6 min-w-18 text-[10px]">
                                {currentValue === "all"
                                    ? "All types"
                                    : currentValue === "mini_truck" 
                                    ? "Mini"
                                    : currentValue.charAt(0).toUpperCase() + currentValue.slice(1)}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-36 bg-white border shadow-md">
                            <DropdownMenuRadioGroup
                                value={currentValue}
                                onValueChange={(value) =>
                                    column.setFilterValue(value === "all" ? undefined : value)
                                }
                            >
                                <DropdownMenuRadioItem value="all" className="text-xs">
                                    All types
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="mini_truck" className="text-xs">
                                    Mini
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="medium" className="text-xs">
                                    Medium
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="heavy" className="text-xs">
                                    Heavy
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
        cell: ({ row }) => {
            const { registration_no, type, model, capacity } = row.original
            return (
                <div className="flex items-center gap-3">
                    <div className="rounded-lg flex items-center justify-center text-xs font-bold p-1 bg-gold text-maroon">
                        {typeLabels[type]}
                    </div>
                    <div className="-space-y-0.5">
                        <p className="font-semibold text-sm font-mono">{registration_no}</p>
                        <p className="text-xs text-gray-400">{model} · {capacity}T</p>
                    </div>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            if (!value) return true
            return row.getValue(id) === value
        }
    },
    {
        accessorKey: "trips",
        header: "Trips",
        cell: ({ row }) => (
            <div className="-space-y-0.5">
                <p className="text-sm font-medium">{row.original.total_trips} total</p>
                <p className="text-xs text-gray-400">{row.original.tripsThisMonth} this month</p>
            </div>
        ),
    },
    {
        accessorKey: "lastTrip",
        header: "Last trip",
        cell: ({ row }) => (
            <div className="-space-y-0.5">
                <p className="text-sm">{row.original.lastTrip}</p>
                <p className="text-xs text-gray-400">{row.original.lastTripDate}</p>
            </div>
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            const currentValue = column.getFilterValue() || "all"
            return (
                <div className="flex items-center gap-2">
                    <span>Status</span>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-6 min-w-18 text-[10px]">
                                {currentValue === "all"
                                    ? "All"
                                    : currentValue === "in_transit"
                                        ? "In transit"
                                        : currentValue.charAt(0).toUpperCase() + currentValue.slice(1)}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-36 bg-white border shadow-md">
                            <DropdownMenuRadioGroup
                                value={currentValue}
                                onValueChange={(value) =>
                                    column.setFilterValue(value === "all" ? undefined : value)
                                }
                            >
                                <DropdownMenuRadioItem value="all" className="text-xs">
                                    All
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="idle" className="text-xs">
                                    Idle
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="in_transit" className="text-xs">
                                    In transit
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="maintenance" className="text-xs">
                                    Maintenance
                                </DropdownMenuRadioItem>
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
                    {statusLabels[s]}
                </Badge>
            )
        },
        filterFn: (row, id, value) => {
            if (!value) return true
            return row.getValue(id) === value
        }
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <ActionsCell 
                row={row} 
                onEditTruck={onEditTruck}
                onDeleteTruck={onDeleteTruck}
            />
        ),
    },
]