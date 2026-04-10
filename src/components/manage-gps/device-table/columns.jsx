import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
    MoreHorizontal,
    Pencil,
    Truck,
    Trash2,
    RefreshCw,
    ChevronRight,
    MapPin,
    Store,
    Eye,
} from "lucide-react"
import { useState } from "react"
import AddGPSDeviceModal from "../AddGPSDeviceModal"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import DeleteModal from "@/components/DeleteModal"
import { useLocation } from "react-router-dom"
import DeviceDetailDrawer from "../DeviceDetailDrawer"
import { toast } from "sonner"


// ── Updated status config — new lifecycle values ──────────────────────────────
const statusStyles = {
    available: "bg-green-100 text-green-700",
    in_transit: "bg-blue-100 text-blue-700",
    at_store: "bg-amber-100 text-amber-700",
    offline: "bg-gray-100 text-gray-500",
}
const statusLabels = {
    available: "Available",
    in_transit: "In transit",
    at_store: "At store",
    offline: "Offline",
}

function SignalBars({ strength }) {
    const color = strength > 60 ? "bg-green-500" : strength > 30 ? "bg-amber-500" : "bg-gray-300"
    return (
        <div className="flex items-end gap-0.5 h-4">
            {[25, 50, 75, 100].map((threshold, i) => (
                <div
                    key={i}
                    className={`w-1 rounded-sm ${strength >= threshold ? color : "bg-gray-200"}`}
                    style={{ height: `${(i + 1) * 4 + 4}px` }}
                />
            ))}
            <span className={`ml-1 text-xs ${strength === 0 ? "text-gray-400" : "text-gray-600"}`}>
                {strength > 0 ? `${strength}%` : "—"}
            </span>
        </div>
    )
}

function BatteryBar({ level }) {
    const color = level > 40 ? "bg-green-500" : level > 15 ? "bg-amber-500" : "bg-red-500"
    return (
        <div className="flex items-center gap-1.5">
            <div className="relative flex items-center w-6 h-3 border border-gray-400 rounded-sm">
                <div className={`h-full rounded-sm ${color}`} style={{ width: `${level}%` }} />
                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-gray-400 rounded-r-sm" />
            </div>
            <span className={`text-xs ${level <= 15 ? "text-red-600 font-medium" : "text-gray-600"}`}>
                {level}%
            </span>
        </div>
    )
}


function DeviceActionsCell({ row, onEditDevice, onDeleteDevice }) {
    const device = row.original
    const { pathname } = useLocation()
    const [editOpen, setEditOpen] = useState(false)
    const [viewOpen, setViewOpen] = useState(false)

    const handleDelete = async () => {
        await onDeleteDevice(device.id)
        toast.success("Device deleted successfully", {
            description: `${device.deviceId} has been removed.`,
            style: {
                    color: "green"
                }
        })
    }

    return (
        <>
            {/* 👁️ VIEW DRAWER */}
            <DeviceDetailDrawer
                device={device}
                open={viewOpen}
                onClose={() => setViewOpen(false)}
            />

            <div className="flex items-center gap-2 justify-end">

                {/* 👁️ VIEW */}
                {/* {device.totalTrips > 0 && ( */}
                <Button
                    variant="outline"
                    size="xs"
                    onClick={() => setViewOpen(true)}
                    className="hover:bg-maroon cursor-pointer text-blue-800 hover:text-white"
                >
                    <Eye size={16} />
                </Button>
                {/* // )} */}

                {/* ADMIN ONLY */}
                {pathname.startsWith("/admin") && (
                    <>
                        {/* ✏️ EDIT */}
                        <Button
                            variant="outline"
                            size="xs"
                            onClick={(e) => {
                                e.stopPropagation()
                                setEditOpen(true)
                            }}
                        >
                            <Pencil size={14} />
                        </Button>

                        <AddGPSDeviceModal
                            open={editOpen}
                            setOpen={setEditOpen}
                            editingDevice={device}
                            onEdit={onEditDevice}
                        />

                        {/* 🗑 DELETE */}
                        <DeleteModal
                            who={device.deviceId}
                            m1active="Device will be removed from inventory and tracking system."
                            onConfirm={handleDelete}
                        />
                    </>
                )}
            </div>
        </>
    )
}

// getColumns receives options so the same file serves both DC and super admin
export function getColumns({ showBrandColumn = false, onEditDevice, onDeleteDevice } = {}) {
    const cols = [
        // Device ID + IMEI + firmware
        {
            accessorKey: "deviceId",
            header: "Device",
            cell: ({ row }) => {
                const { deviceId, imei, firmware } = row.original
                return (
                    <div className="-space-y-0.5">
                        <p className="font-semibold text-sm font-mono">{deviceId}</p>
                        <p className="text-xs text-gray-400 font-mono">{imei}</p>
                        <p className="text-[10px] text-gray-300">{firmware}</p>
                    </div>
                )
            },
        },

        // Brand column — only shown for super admin
        ...(showBrandColumn ? [{
            accessorKey: "brand",
            header: "Brand",
            cell: ({ row }) => (
                <span className="text-sm text-gray-700">{row.original.brand ?? "—"}</span>
            ),
        }] : []),

        // Current location — replaces old "Assigned truck" column
        // Shows where the device is right now: DC shelf | truck + trip | store name
        {
            accessorKey: "status",
            header: "Current location",
            cell: ({ row }) => {
                const { status, currentTruckReg, currentTripId, currentStoreName, homeDC } = row.original
                if (status === "in_transit") {
                    return (
                        <div className="-space-y-0.5">
                            <div className="flex items-center gap-1.5 text-sm">
                                <Truck size={12} className="text-blue-500" />
                                <span className="font-mono font-medium">{currentTruckReg}</span>
                            </div>
                            <p className="text-xs text-gray-400 font-mono">{currentTripId}</p>
                        </div>
                    )
                }
                if (status === "at_store") {
                    return (
                        <div className="flex items-center gap-1.5 text-sm">
                            <Store size={12} className="text-amber-500" />
                            <span className="text-amber-700">{currentStoreName}</span>
                        </div>
                    )
                }
                if (status === "available") {
                    return (
                        <div className="flex items-center gap-1.5 text-sm">
                            <MapPin size={12} className="text-gray-400" />
                            <span className="text-gray-500">DC shelf · {homeDC}</span>
                        </div>
                    )
                }
                // offline
                return (
                    <div className="flex items-center gap-1.5 text-sm">
                        <MapPin size={12} className="text-gray-300" />
                        <span className="text-gray-400 italic">Unknown</span>
                    </div>
                )
            },
            // Filter by status using radio dropdown in header (moved here from separate column)
            filterFn: (row, id, value) => !value || row.getValue(id) === value,
        },

        // Signal
        {
            accessorKey: "signalStrength",
            header: "Signal",
            cell: ({ row }) => <SignalBars strength={row.original.signalStrength} />,
        },

        // Battery
        {
            accessorKey: "battery",
            header: "Battery",
            cell: ({ row }) => <BatteryBar level={row.original.battery} />,
        },

        // Last ping
        {
            accessorKey: "lastPing",
            header: "Last ping",
            cell: ({ row }) => (
                <div className="-space-y-0.5">
                    <p className="text-sm">{row.original.lastPing}</p>
                    <p className="text-xs text-gray-400">{row.original.lastPingDate}</p>
                </div>
            ),
        },

        // Status badge — radio filter in header
        {
            accessorKey: "statusBadge",
            id: "statusBadge",
            header: ({ column }) => {
                const currentValue = column.getFilterValue() || "all"
                return (
                    <div className="flex items-center gap-2">
                        <span>Status</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-6 min-w-18 text-[10px]">
                                    {currentValue === "all" ? "All" : statusLabels[currentValue] ?? currentValue}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-36 bg-white border shadow-md">
                                <DropdownMenuRadioGroup
                                    value={currentValue}
                                    onValueChange={(val) =>
                                        column.setFilterValue(val === "all" ? undefined : val)
                                    }
                                >
                                    {["all", "available", "in_transit", "at_store", "offline"].map((v) => (
                                        <DropdownMenuRadioItem key={v} value={v} className="text-xs">
                                            {v === "all" ? "All" : statusLabels[v]}
                                        </DropdownMenuRadioItem>
                                    ))}
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
            filterFn: (row, _id, value) => !value || row.original.status === value,
        },

        {
            id: "actions",
            cell: ({ row }) => (
                <DeviceActionsCell
                    row={row}
                    onEditDevice={onEditDevice}
                    onDeleteDevice={onDeleteDevice}
                />
            ),
        }
        // Actions — no assign truck, no reassign. Only edit + re-ping + decommission
        // {
        //     id: "actions",
        //     cell: ({ row }) => (
        //         <div className="flex items-center gap-2 justify-end">
        //             <DropdownMenu>
        //                 <DropdownMenuTrigger asChild>
        //                     <Button
        //                         variant="ghost"
        //                         size="icon"
        //                         className="h-8 w-8"
        //                         onClick={(e) => e.stopPropagation()}
        //                     >
        //                         <MoreHorizontal size={16} />
        //                     </Button>
        //                 </DropdownMenuTrigger>
        //                 <DropdownMenuContent
        //                     align="end"
        //                     className="bg-white border shadow-md w-44"
        //                     onClick={(e) => e.stopPropagation()}
        //                 >
        //                     <DropdownMenuItem onClick={() => onEdit(row.original)} className="gap-2 text-sm cursor-pointer">
        //                         <Pencil size={14} /> Edit device
        //                     </DropdownMenuItem>
        //                     <DropdownMenuItem className="gap-2 text-sm cursor-pointer">
        //                         <RefreshCw size={14} /> Force re-ping
        //                     </DropdownMenuItem>
        //                     <DropdownMenuSeparator />
        //                     <DropdownMenuItem
        //                         className="gap-2 text-sm cursor-pointer text-red-500"
        //                         onClick={() => onDelete(row.original.id)}
        //                     >
        //                         <Trash2 size={14} /> Delete
        //                     </DropdownMenuItem>
        //                 </DropdownMenuContent>
        //             </DropdownMenu>
        //             <ChevronRight size={16} className="text-gray-300" />
        //         </div>
        //     ),
        // },
    ]

    return cols
}