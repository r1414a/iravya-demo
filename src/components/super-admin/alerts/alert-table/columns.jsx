// alert-table/columns.jsx
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Eye,
    Route,
    Trash2,
    Zap,
    Clock,
    Radio,
    Navigation,
    MapPin,
    BatteryLow,
} from "lucide-react"
import { useState } from "react"
import AlertDetailDrawer from "../AlertDetailDrawer"
import { toast } from "sonner"

const TYPE_CONFIG = {
    speeding: { label: "Speeding", icon: Zap, color: "text-red-500", bg: "bg-red-50" },
    long_stop: { label: "Long stop", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    route_deviation: { label: "Route deviation", icon: Navigation, color: "text-orange-500", bg: "bg-orange-50" },
    geofence_enter: { label: "Geofence enter", icon: MapPin, color: "text-blue-500", bg: "bg-blue-50" },
    geofence_exit: { label: "Geofence exit", icon: MapPin, color: "text-blue-400", bg: "bg-blue-50" },
    device_offline: { label: "Device offline", icon: Radio, color: "text-gray-500", bg: "bg-gray-50" },
    device_low_batt: { label: "Low battery", icon: BatteryLow, color: "text-yellow-600", bg: "bg-yellow-50" },
}

const SEVERITY_STYLES = {
    high: "bg-red-100 text-red-700",
    medium: "bg-amber-100 text-amber-700",
    low: "bg-yellow-100 text-yellow-700",
    info: "bg-blue-100 text-blue-600",
}

const BRANDS = ["Tata Westside", "Zudio", "Tata Cliq", "Tanishq"]
const TYPES = Object.keys(TYPE_CONFIG)

function ActionsCell({ row, onMarkAsRead, onMarkAsUnread, onDeleteAlert }) {
    const alert = row.original
    const [viewDetails, setViewDetails] = useState(false)

    const handleDelete = async () => {
        await onDeleteAlert(alert.id)
        toast.success("Alert dismissed", {
            description: `${alert.id} has been removed.`,
            style: {
                color: 'green'
            }
        })
    }

    const handleToggleRead = () => {
        if (alert.isRead) {
            onMarkAsUnread(alert.id)
            toast.success("Marked as unread", {
                style: {
                    color: 'green'
                }
            })
        } else {
            onMarkAsRead(alert.id)
            toast.success("Marked as read", {
                style: {
                    color: 'green'
                }
            })
        }
    }

    return (
        <>
            <AlertDetailDrawer
                alert={alert}
                open={viewDetails}
                onClose={() => setViewDetails(false)}
                onToggleRead={handleToggleRead}
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
                    className="hover:bg-maroon cursor-pointer text-maroon hover:text-white"
                >
                    <Route size={16} />
                </Button>
                
                <Button 
                    variant="outline" 
                    size="xs" 
                    onClick={handleDelete}
                    className="hover:bg-maroon cursor-pointer text-red-600 hover:text-white"
                >
                    <Trash2 size={16} />
                </Button>
            </div>
        </>
    )
}

export const columns = ({ onMarkAsRead, onMarkAsUnread, onDeleteAlert }) => [
    {
        accessorKey: "type",
        header: ({ column }) => {
            const current = column.getFilterValue() || "all"
            return (
                <div className="flex items-center gap-2">
                    <span>Alert</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-6 min-w-24 text-[10px]">
                                {current === "all" ? "All types" : TYPE_CONFIG[current]?.label ?? current}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-44 bg-white border shadow-md">
                            <DropdownMenuRadioGroup
                                value={current}
                                onValueChange={(val) =>
                                    column.setFilterValue(val === "all" ? undefined : val)
                                }
                            >
                                <DropdownMenuRadioItem value="all" className="text-xs">All types</DropdownMenuRadioItem>
                                {TYPES.map((t) => (
                                    <DropdownMenuRadioItem key={t} value={t} className="text-xs">
                                        {TYPE_CONFIG[t].label}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
        cell: ({ row }) => {
            const { type, description, isRead } = row.original
            const cfg = TYPE_CONFIG[type] ?? TYPE_CONFIG.speeding
            const Icon = cfg.icon
            return (
                <div className="flex items-start gap-3 w-100">
                    <div className="mt-1 shrink-0">
                        {isRead
                            ? <span className="block w-2 h-2 rounded-full bg-transparent" />
                            : <span className="block w-2 h-2 rounded-full bg-maroon" />
                        }
                    </div>
                    <div className={`w-8 h-8 rounded-lg ${cfg.bg} flex items-center justify-center shrink-0`}>
                        <Icon size={14} className={cfg.color} />
                    </div>
                    <div className="-space-y-0.5">
                        <p className={`text-xs font-semibold ${cfg.color}`}>{cfg.label}</p>
                        <p className={`text-xs sm:text-sm ${isRead ? "text-gray-500" : "font-medium text-gray-800"} text-wrap`}>
                            {description}
                        </p>
                    </div>
                </div>
            )
        },
        filterFn: (row, id, value) => !value || row.getValue(id) === value,
    },
    {
        accessorKey: "severity",
        header: ({ column }) => {
            const current = column.getFilterValue() || "all"
            return (
                <div className="flex items-center gap-2">
                    <span>Severity</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-6 min-w-16 text-[10px]">
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
                                {["all", "high", "medium", "low", "info"].map((v) => (
                                    <DropdownMenuRadioItem key={v} value={v} className="text-xs capitalize">
                                        {v === "all" ? "All" : v}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
        cell: ({ row }) => {
            const s = row.original.severity
            return (
                <Badge className={`${SEVERITY_STYLES[s]} border-0 text-xs font-medium capitalize`}>
                    {s}
                </Badge>
            )
        },
        filterFn: (row, id, value) => !value || row.getValue(id) === value,
    },
    {
        accessorKey: "brand",
        header: ({ column }) => {
            const current = column.getFilterValue() || "all"
            return (
                <div className="flex items-center gap-2">
                    <span>Brand</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-6 min-w-18 text-[10px]">
                                {current === "all" ? "All" : current.split(" ")[1] ?? current}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40 bg-white border shadow-md">
                            <DropdownMenuRadioGroup
                                value={current}
                                onValueChange={(val) =>
                                    column.setFilterValue(val === "all" ? undefined : val)
                                }
                            >
                                <DropdownMenuRadioItem value="all" className="text-xs">All brands</DropdownMenuRadioItem>
                                {BRANDS.map((b) => (
                                    <DropdownMenuRadioItem key={b} value={b} className="text-xs">{b}</DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
        cell: ({ row }) => (
            <span className="text-sm text-gray-700">{row.getValue("brand")}</span>
        ),
        filterFn: (row, id, value) => !value || row.getValue(id) === value,
    },
    {
        accessorKey: "truck",
        header: "Truck / driver",
        cell: ({ row }) => {
            const { truck, driver, tripId } = row.original
            return (
                <div className="-space-y-0.5">
                    <p className="text-sm font-mono font-medium">{truck}</p>
                    <p className="text-xs text-gray-400">{driver}</p>
                    <p className="text-xs text-gray-400 font-mono">{tripId}</p>
                </div>
            )
        },
    },
    {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => (
            <div className="flex items-start gap-1.5 max-w-48">
                <MapPin size={11} className="text-gray-400 mt-0.5 shrink-0" />
                <span className="text-xs text-gray-500 leading-snug text-wrap">{row.getValue("location")}</span>
            </div>
        ),
    },
    {
        accessorKey: "time",
        header: "Time",
        cell: ({ row }) => (
            <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">{row.getValue("time")}</span>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <ActionsCell 
                row={row} 
                onMarkAsRead={onMarkAsRead}
                onMarkAsUnread={onMarkAsUnread}
                onDeleteAlert={onDeleteAlert}
            />
        ),
    },
]