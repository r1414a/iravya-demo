        import { Badge } from "@/components/ui/badge"
        import { Button } from "@/components/ui/button"
        import { MoreHorizontal, Pencil, KeyRound, Road, Map } from "lucide-react"
        import EditDriverSheet from "./EditDriverSheet"
        import TripHistorySheet from "./TripHistorySheet"
        import { useState } from "react"
        import {
            DropdownMenu,
            DropdownMenuContent,
            DropdownMenuItem,
            DropdownMenuRadioGroup,
            DropdownMenuRadioItem,
            DropdownMenuTrigger,
        } from "@/components/ui/dropdown-menu"
        import { Checkbox } from "@/components/ui/checkbox"
        import { FieldLabel } from "@/components/ui/field"
        import TripDetailSheet from "../../manage-trip/TripDetailSheet"
        import { useLocation, useNavigate } from "react-router-dom"
        import DeleteModal from "@/components/DeleteModal"
        import { getNameInitials } from "@/lib/utils/getNameInitials"
        import { format, parseISO } from "date-fns"
        

        const statusStyles = {
            Available: "bg-green-100 text-green-700",
            "On trip": "bg-blue-100 text-blue-700",
            Inactive: "bg-gray-100 text-gray-500",
        }

        function ActionsCell({ row, onEditDriver, onDeleteDriver }) {
            const driver = row.original
            const { pathname } = useLocation()
            const navigate = useNavigate()

            const [editOpen, setEditOpen] = useState(false)
            const [tripDetailsOpen, setTripDetailsOpen] = useState(false)
            const [historyOpen, setHistoryOpen] = useState(false)

            const handleDelete = async() => {
                await onDeleteDriver(driver.id)
            }

            return (
                <>
                    <EditDriverSheet
                        driver={driver}
                        open={editOpen}
                        onClose={setEditOpen}
                        onEditDriver={onEditDriver}
                    />

                    <TripDetailSheet
                        trip={{
                            id: driver.current_trip,
                            truck: driver.id === "1" ? "MH12AB1234" : "MH14CD8823",
                            driver: driver.full_name,
                            phone: driver.phone_number,
                            sourceDC: driver.id === "1" ? "Pune Logistics Hub, Pimpri-Chinchwad" : "Nashik DC, MIDC Satpur",
                            gpsDevice: driver.id ==="1" ? "GPS-002-PUNE": "GPS-342-PUNE",
                            stops: [
                                { name: driver.id === "1" ? "Phoenix Palladium, Mumbai" : "Zudio Store, Aurangabad Mall", status: "pending" }
                            ],
                            stopsCount: 1,
                            status: "in_transit",
                            departedAt: driver.id === "1" ? "Today, 06:30 AM": "Today, 07:00 AM",
                            eta: driver.id === "1" ? "Today, 11:00 AM": "Today, 12:30 PM",
                            distance: driver.distance,
                            completedAt: null,
                        }}
                        open={tripDetailsOpen}
                        onClose={setTripDetailsOpen}
                    />

                    <TripHistorySheet
                        driver={driver}
                        open={historyOpen}
                        onClose={() => setHistoryOpen(false)}
                    />

                    <div className="flex items-center gap-2 justify-end">
                        {pathname.startsWith("/admin") && (
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
                                    who={driver.full_name}
                                    m1active="Driver will not be assignable to any trip"
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
                            <DropdownMenuContent align="end" className="bg-white border shadow-md w-40">
                                {driver.current_trip && (
                                    <>
                                    <DropdownMenuItem
                                        className="gap-2 text-sm cursor-pointer"
                                        onClick={() => setTripDetailsOpen(true)}
                                    >
                                        <Road size={14} /> View trip details
                                    </DropdownMenuItem>
                                    {/* //so this trip id should come in truck data, but for only trucks who are in transit state */}
                                <DropdownMenuItem 
                                onClick={() => navigate(`/track?id=${driver.current_trip}`)}
                                className="gap-2 text-sm cursor-pointer">
                                    <Map size={14} /> View on map
                                </DropdownMenuItem>
                                </>
                                )}

                                <DropdownMenuItem
                                    className="gap-2 text-sm cursor-pointer"
                                    onClick={() => setHistoryOpen(true)}
                                >
                                    <KeyRound size={14} /> View trip history
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </>
            )
        }

        export const columns = ({onEditDriver, onDeleteDriver}) => [
            {
                accessorKey: "full_name",
                header: "Driver",
                cell: ({ row }) => {
                    const { first_name, last_name, phone_number, full_name } = row.original
                    return (
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sm font-semibold p-1 bg-gold text-white">
                                {getNameInitials(first_name, last_name)}
                            </div>
                            <div className="-space-y-0.5">
                                <p className="font-medium text-sm">{full_name}</p>
                                <p className="text-xs text-gray-400">{phone_number}</p>
                            </div>
                        </div>
                    )
                },
            },
            {
                accessorKey: "licence_class",
                header: ({ column }) => {
                    const currentValue = column.getFilterValue() || "all"
                    return (
                        <div className="flex items-center gap-2">
                            <span>Licence</span>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-6 min-w-18 text-[10px]">
                                        {currentValue === "all" ? "All classes" : currentValue.toUpperCase()}
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-36 bg-white border shadow-md">
                                    <DropdownMenuRadioGroup
                                        value={currentValue}
                                        onValueChange={(value) =>
                                            column.setFilterValue(value === "all" ? undefined : value)
                                        }
                                    >
                                        <DropdownMenuRadioItem value="all" className="text-xs">All classes</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="lmv" className="text-xs">LMV</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="hmv" className="text-xs">HMV</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="hgmv" className="text-xs">HGMV</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="htv" className="text-xs">HTV</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )
                },
                cell: ({ row }) => (
                    <div className="-space-y-0.5">
                        <p className="text-sm font-mono">{row.original.licence_no}</p>
                        <p className="text-xs text-gray-400">
                            {row.original.licence_class?.toUpperCase()} · Exp{" "}
                            {format(parseISO(row.original.licence_expiry), "MMM yyyy")}
                        </p>
                    </div>
                ),
                filterFn: (row, id, value) => {
                    if (!value) return true
                    return row.getValue(id)?.toLowerCase() === value.toLowerCase()
                },
            },
            {
                accessorKey: "current_trip",
                header: ({ column }) => {
                    const currentValue = column.getFilterValue() || "all"
                    const isChecked = currentValue === "idle"

                    return (
                        <div className="flex items-center gap-2">
                            <span>Current trip</span>
                            <Checkbox
                                className="w-3 h-3 rounded-xs -mr-1 border border-gray-500"
                                checked={isChecked}
                                onCheckedChange={(checked) => {
                                    column.setFilterValue(checked ? "idle" : undefined)
                                }}
                            />
                            <FieldLabel className="text-xs">idle only</FieldLabel>
                        </div>
                    )
                },
                cell: ({ row }) => {
                    const trip = row.original.current_trip
                    return trip ? (
                        <div className="flex items-center gap-1.5 text-sm">
                            <Road size={14} className="text-gray-400" />
                            <span>{trip}</span>
                        </div>
                    ) : (
                        <span className="text-gray-400 text-sm">—</span>
                    )
                },
                filterFn: (row) => {
                    const trip = row.original.current_trip
                    return !trip
                },
            },
            {
                accessorKey: "trips",
                header: "Trips",
                cell: ({ row }) => (
                    <div className="-space-y-0.5">
                        <p className="text-sm font-medium">{row.original.total_trips} total</p>
                        <p className="text-xs text-gray-400">{row.original.trips_this_month} this month</p>
                    </div>
                ),
            },
            {
                accessorKey: "createdAt",
                header: "Since",
                cell: ({ row }) => (
                    <span className="text-sm text-gray-500">
                        {format(parseISO(row.original.createdAt), "MMM yyyy")}
                    </span>
                ),
            },
            {
                accessorKey: "driver_status",
                header: ({ column }) => {
                    const currentValue = column.getFilterValue() || "all"

                    return (
                        <div className="flex items-center gap-2">
                            <span>Status</span>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-6 min-w-18 text-[10px]">
                                        {currentValue}
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-36 bg-white border shadow-md">
                                    <DropdownMenuRadioGroup
                                        value={currentValue}
                                        onValueChange={(value) =>
                                            column.setFilterValue(value === "all" ? undefined : value)
                                        }
                                    >
                                        <DropdownMenuRadioItem value="all" className="text-xs">All</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Available" className="text-xs">Available</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="On trip" className="text-xs">On trip</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="Inactive" className="text-xs">Inactive</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )
                },
                cell: ({ row }) => {
                    const s = row.original.driver_status
                    return (
                        <Badge className={`${statusStyles[s]} border-0 text-xs font-medium`}>
                            {s}
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
                        onEditDriver={onEditDriver}
                        onDeleteDriver={onDeleteDriver}
                    />
                ),
            },
        ]