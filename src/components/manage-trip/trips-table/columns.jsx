// trips-table/columns.jsx
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, MapPin, XCircle, Pencil } from "lucide-react"
import { useState } from "react"
import TripMapModal from "../TripMapModal"
import TripDetailSheet from "../TripDetailSheet"
import { toast } from "sonner"
import CreateTripModal from "../CreateNewTrip"
import { useNavigate } from "react-router-dom"

const BRANDS = ["Tata Westside", "Zudio", "Tata Cliq", "Tanishq"]

function StatusBadge({ status }) {
    const config = {
        in_transit: { label: "In Transit", className: "bg-blue-100 text-blue-700 border-blue-200" },
        completed: { label: "Completed", className: "bg-green-100 text-green-700 border-green-200" },
        scheduled: { label: "Scheduled", className: "bg-gray-100 text-gray-600 border-gray-200" },
        cancelled: { label: "Cancelled", className: "bg-red-100 text-red-600 border-red-200" },
    }
    const c = config[status] || config.scheduled
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${c.className}`}>
            {c.label}
        </span>
    )
}

function StopsPills({ stops }) {
    const visible = stops.slice(0, 2)
    const extra = stops.length - 2

    return (
        <div className="flex flex-wrap gap-1">
            {visible.map((s, i) => {
                const name = typeof s === "string" ? s : s?.name || "—"
                return (
                    <span key={i} className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        <MapPin size={9} /> {name.replace(' Store', '')}
                    </span>
                )
            })}
            {extra > 0 && (
                <span className="text-xs text-gray-400">+{extra} more</span>
            )}
        </div>
    )
}

function ActionsCell({ row, onEditTrip, onCancelTrip }) {
    const navigate = useNavigate();
    const [detailOpen, setDetailOpen] = useState(false)
    const [mapOpen, setMapOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const trip = row.original

    const handleCancelTrip = async () => {
        await onCancelTrip(trip.id)
        toast.success("Trip cancelled", {
            description: `${trip.id} has been cancelled.`,
            style: {
                color: "green"
            }
        })
    }

    return (
        <>
            <TripDetailSheet
                trip={trip}
                open={detailOpen}
                onClose={() => setDetailOpen(false)}
            />

            <TripMapModal
                trip={trip}
                open={mapOpen}
                onClose={() => setMapOpen(false)}
            />

            {trip.status === "scheduled" && (
                <CreateTripModal
                    editingTrip={trip}
                    open={editOpen}
                    onClose={() => setEditOpen(false)}
                    onEditTrip={onEditTrip}
                />
            )}

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal size={14} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white border shadow-md w-40">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem onClick={() => setDetailOpen(true)}>
                        <Eye size={13} className="mr-2" /> View details
                    </DropdownMenuItem>
                    
                    {!["scheduled", "cancelled", "completed"].includes(trip.status) && (
                        <DropdownMenuItem onClick={() => navigate(`/track?id=${trip.id}`)}>
                            <MapPin size={13} className="mr-2" /> View on map
                        </DropdownMenuItem>
                    )}

                    {trip.status === "scheduled" && (
                        <DropdownMenuItem onClick={() => setEditOpen(true)}>
                            <Pencil size={13} className="mr-2" /> Edit trip
                        </DropdownMenuItem>
                    )}

                    {(trip.status === "in_transit" || trip.status === "scheduled") && (
                        <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                                className="text-red-600"
                                onClick={handleCancelTrip}
                            >
                                <XCircle size={13} className="mr-2" /> Cancel trip
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export const columns = ({ onEditTrip, onCancelTrip }) => [
    {
        accessorKey: "id",
        header: "Trip ID",
        cell: ({ row }) => (
            <span className="font-mono text-sm font-medium text-maroon">
                {row.getValue("id")}
            </span>
        ),
    },
    {
        accessorKey: "truck",
        header: "Truck",
        cell: ({ row }) => (
            <div>
                <p className="font-mono text-sm">{row.getValue("truck")}</p>
                <p className="text-xs text-gray-500">{row.original.driver}</p>
                <p className="text-xs text-gray-500">{row.original.phone}</p>
            </div>
        ),
    },
    {
        accessorKey: "gpsDevice",
        header: "GPS Device",
        cell: ({ row }) => {
            const device = row.getValue("gpsDevice")
            return (
                <div className="flex flex-col">
                    <span className="font-mono text-sm text-gray-800">
                        {device || "—"}
                    </span>
                </div>
            )
        },
    },
    {
        accessorKey: "sourceDC",
        header: "Source DC",
        cell: ({ row }) => (
            <span className="text-sm text-gray-600">{row.getValue("sourceDC")}</span>
        ),
    },
    {
        accessorKey: "stops",
        header: "Stops",
        cell: ({ row }) => (
            <StopsPills stops={row.original.stops} />
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            const currentValue = column.getFilterValue() ?? "all"
            return (
                <div className="flex items-center gap-2">
                    <span>Status</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-6 min-w-18 text-[10px]">
                                {currentValue === "all"
                                    ? "All"
                                    : currentValue === "in_transit"
                                        ? "In Transit"
                                        : currentValue.charAt(0).toUpperCase() + currentValue.slice(1)}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-36 bg-white border shadow-md">
                            <DropdownMenuRadioGroup
                                value={currentValue}
                                onValueChange={(value) => {
                                    column.setFilterValue(value === "all" ? undefined : value)
                                }}
                            >
                                <DropdownMenuRadioItem value="all" className="text-xs">
                                    All
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="in_transit" className="text-xs">
                                    In transit
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="completed" className="text-xs">
                                    Completed
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="scheduled" className="text-xs">
                                    Scheduled
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="cancelled" className="text-xs">
                                    Cancelled
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
        cell: ({ row }) => (
            <StatusBadge status={row.getValue("status")} />
        ),
        filterFn: (row, id, value) => {
    if (!value || value === "all") return true
    return row.getValue(id) === value
},
    },
    {
        accessorKey: "departedAt",
        header: "Departed",
        cell: ({ row }) => (
            <span className="text-sm text-gray-500">
                {row.getValue("departedAt") || "—"}
            </span>
        ),
    },
    {
        accessorKey: "eta",
        header: "ETA / Completed",
        cell: ({ row }) => {
            const trip = row.original
            if (trip.completedAt) return (
                <span className="text-sm text-green-600 font-medium">{trip.completedAt}</span>
            )
            if (trip.eta) return (
                <span className="text-sm text-blue-600">{trip.eta}</span>
            )
            return <span className="text-sm text-gray-400">—</span>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <ActionsCell 
                row={row} 
                onEditTrip={onEditTrip}
                onCancelTrip={onCancelTrip}
            />
        ),
    },
]


// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuGroup,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuRadioGroup,
//     DropdownMenuRadioItem,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// import { MoreHorizontal, Eye, MapPin, XCircle } from "lucide-react"
// // import TripDetailSheet from "../TripDetailSheet"
// import { useState } from "react"
// import TripMapModal from "../TripMapModal"
// import TripDetailSheet from "../TripDetailSheet"


// const BRANDS = ["Tata Westside", "Zudio", "Tata Cliq", "Tanishq"]

// // Status badge — matches your existing style pattern
// function StatusBadge({ status }) {
//     const config = {
//         in_transit: { label: "In Transit", className: "bg-blue-100 text-blue-700 border-blue-200" },
//         completed: { label: "Completed", className: "bg-green-100 text-green-700 border-green-200" },
//         scheduled: { label: "Scheduled", className: "bg-gray-100 text-gray-600 border-gray-200" },
//         cancelled: { label: "Cancelled", className: "bg-red-100 text-red-600 border-red-200" },
//     }
//     const c = config[status] || config.scheduled
//     return (
//         <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${c.className}`}>
//             {c.label}
//         </span>
//     )
// }

// // Stops pills — shows store names as small badges
// function StopsPills({ stops }) {
//     const visible = stops.slice(0, 2)
//     const extra = stops.length - 2

//     return (
//         <div className="flex flex-wrap gap-1">
//             {visible.map((s, i) => {
//                 const name = typeof s === "string" ? s : s?.name || "—"

//                 return (
//                     <span key={i} className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
//                         <MapPin size={9} /> {name.replace(' Store', '')}
//                     </span>
//                 )
//             })}
//             {extra > 0 && (
//                 <span className="text-xs text-gray-400">+{extra} more</span>
//             )}
//         </div>
//     )
// }

// // Actions cell — uses a controlled Sheet so it opens from the row
// function ActionsCell({ row }) {
//     const [detailOpen, setDetailOpen] = useState(false)
//     const [mapOpen, setMapOpen] = useState(false)
//     const trip = row.original

//     return (
//         <>
//             <TripDetailSheet
//                 trip={trip}
//                 open={detailOpen}
//                 onClose={setDetailOpen}
//             />

//             <TripMapModal
//                 trip={trip}
//                 open={mapOpen}
//                 onClose={setMapOpen}
//             />
//             <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" className="h-8 w-8 p-0">
//                         <MoreHorizontal size={14} />
//                     </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="bg-white border shadow-md w-36">
//                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                     <DropdownMenuSeparator />
//                     <DropdownMenuItem onClick={() => setDetailOpen(true)}>
//                         <Eye size={13} className="mr-2" /> View details
//                     </DropdownMenuItem>
//                     {
//                         !["scheduled", "cancelled", "completed"].includes(trip.status) && (
//                             <DropdownMenuItem onClick={() => setMapOpen(true)}>
//                                 <MapPin size={13} className="mr-2" /> View on map
//                             </DropdownMenuItem>
//                         )
//                     }

//                     {trip.status === "in_transit" || trip.status === "scheduled" && (
//                         <>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem className="text-red-600">
//                                 <XCircle size={13} className="mr-2" /> Cancel trip
//                             </DropdownMenuItem>
//                         </>
//                     )}
//                 </DropdownMenuContent>
//             </DropdownMenu>
//         </>
//     )
// }

// export const columns = [
//     {
//         accessorKey: "id",
//         header: "Trip ID",
//         cell: ({ row }) => (
//             <span className="font-mono text-sm font-medium text-maroon">
//                 {row.getValue("id")}
//             </span>
//         ),
//     },
//     //  {
//     //         accessorKey: "brand",
//     //         header: ({ column }) => {
//     //             const current = column.getFilterValue() || "all"
//     //             return (
//     //                 <div className="flex items-center gap-2">
//     //                     <span>Brand</span>
//     //                     <DropdownMenu>
//     //                         <DropdownMenuTrigger asChild>
//     //                             <Button variant="outline" size="sm" className="h-6 min-w-18 text-[10px]">
//     //                                 {current === "all" ? "All" : current.split(" ")[1] ?? current}
//     //                             </Button>
//     //                         </DropdownMenuTrigger>
//     //                         <DropdownMenuContent className="w-40 bg-white border shadow-md">
//     //                             <DropdownMenuRadioGroup
//     //                                 value={current}
//     //                                 onValueChange={(val) =>
//     //                                     column.setFilterValue(val === "all" ? undefined : val)
//     //                                 }
//     //                             >
//     //                                 <DropdownMenuRadioItem value="all" className="text-xs">All brands</DropdownMenuRadioItem>
//     //                                 {BRANDS.map((b) => (
//     //                                     <DropdownMenuRadioItem key={b} value={b} className="text-xs">{b}</DropdownMenuRadioItem>
//     //                                 ))}
//     //                             </DropdownMenuRadioGroup>
//     //                         </DropdownMenuContent>
//     //                     </DropdownMenu>
//     //                 </div>
//     //             )
//     //         },
//     //         cell: ({ row }) => (
//     //             <span className="text-sm text-gray-700">{row.getValue("brand")}</span>
//     //         ),
//     //         filterFn: (row, id, value) => !value || row.getValue(id) === value,
//     //     },
//     // {
//     //     accessorKey: "brand",
//     //     header: "Brand",
//     //     cell: ({ row }) => (
//     //         <span className="text-sm">{row.getValue("brand")}</span>
//     //     ),
//     // },
//     {
//         accessorKey: "truck",
//         header: "Truck",
//         cell: ({ row }) => (
//             <div>
//                 <p className="font-mono text-sm">{row.getValue("truck")}</p>
//                 <p className="text-xs text-gray-500">{row.original.driver}</p>
//                 <p className="text-xs text-gray-500">{row.original.phone}</p>
//             </div>
//         ),
//     },
//     {
//         accessorKey: "gpsDevice",
//         header: "GPS Device",
//         cell: ({ row }) => {
//             const device = row.getValue("gpsDevice")

//             return (
//                 <div className="flex flex-col">
//                     <span className="font-mono text-sm text-gray-800">
//                         {device || "—"}
//                     </span>
//                 </div>
//             )
//         },
//     },
//     {
//         accessorKey: "sourceDC",
//         header: "Source DC",
//         cell: ({ row }) => (
//             <span className="text-sm text-gray-600">{row.getValue("sourceDC")}</span>
//         ),
//     },
//     {
//         accessorKey: "stops",
//         header: "Stops",
//         cell: ({ row }) => (
//             <StopsPills stops={row.original.stops} />
//         ),
//     },
//     {
//         accessorKey: "status",
//         header: ({ column }) => {
//             const currentValue = column.getFilterValue() || "all"
//             return (
//                 <div className="flex items-center gap-2">
//                     <span>Status</span>

//                     <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                             <Button variant="outline" size="sm" className="h-6 min-w-18 text-[10px]">
//                                 {currentValue === "all"
//                                     ? "All"
//                                     : currentValue === "in_transit"
//                                         ? "In Transit"
//                                         : currentValue.charAt(0).toUpperCase() + currentValue.slice(1)}
//                             </Button>
//                             {/* <Filter size={16} fill="#701a40" stroke=" #701a40" /> */}
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent className="w-36 bg-white border shadow-md">
//                             <DropdownMenuRadioGroup
//                                 value={currentValue}
//                                 onValueChange={(value) => {
//                                     column.setFilterValue(
//                                         value === "all" ? undefined : value
//                                     )
//                                 }}
//                             >
//                                 <DropdownMenuRadioItem value="all" className="text-xs">
//                                     All
//                                 </DropdownMenuRadioItem>
//                                 <DropdownMenuRadioItem value="in_transit" className="text-xs">
//                                     In transit
//                                 </DropdownMenuRadioItem>
//                                 <DropdownMenuRadioItem value="completed" className="text-xs">
//                                     Completed
//                                 </DropdownMenuRadioItem>
//                                 <DropdownMenuRadioItem value="scheduled" className="text-xs">
//                                     Scheduled
//                                 </DropdownMenuRadioItem>
//                                 <DropdownMenuRadioItem value="cancelled" className="text-xs">
//                                     Cancelled
//                                 </DropdownMenuRadioItem>
//                             </DropdownMenuRadioGroup>
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//                 </div>
//             )
//         },
//         cell: ({ row }) => (
//             <StatusBadge status={row.getValue("status")} />
//         ),
//     },
//     {
//         accessorKey: "departedAt",
//         header: "Departed",
//         cell: ({ row }) => (
//             <span className="text-sm text-gray-500">
//                 {row.getValue("departedAt") || "—"}
//             </span>
//         ),
//     },
//     {
//         accessorKey: "eta",
//         header: "ETA / Completed",
//         cell: ({ row }) => {
//             const trip = row.original
//             if (trip.completedAt) return (
//                 <span className="text-sm text-green-600 font-medium">{trip.completedAt}</span>
//             )
//             if (trip.eta) return (
//                 <span className="text-sm text-blue-600">{trip.eta}</span>
//             )
//             return <span className="text-sm text-gray-400">—</span>
//         },
//     },
//     {
//         id: "actions",
//         cell: ({ row }) => <ActionsCell row={row} />,
//     },
// ]