// AlertDetailDrawer.jsx (Updated)
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Truck, MapPin, Clock, CheckCheck,
    Zap, Navigation, Radio, BatteryLow,
    Building2, User,
} from "lucide-react"

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

const mockTimeline = [
    { label: "Trip dispatched", time: "Today, 08:45 AM", done: true },
    { label: "Alert triggered", time: "Today, 10:42 AM", done: true, isAlert: true },
    { label: "Alert acknowledged", time: "—", done: false },
    { label: "Trip completed", time: "—", done: false },
]

export default function AlertDetailDrawer({ alert, open, onClose, onToggleRead }) {
    if (!alert) return null

    const cfg = TYPE_CONFIG[alert.type] ?? TYPE_CONFIG.speeding
    const Icon = cfg.icon

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="w-full sm:max-w-md lg:max-w-lg bg-white p-0 flex flex-col">
                <SheetHeader className="px-4 sm:px-6 pt-5 sm:pt-6 pb-4 border-b">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${cfg.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                                <Icon size={16} className={cfg.color} />
                            </div>

                            <div className="min-w-0">
                                <SheetTitle className={`text-base sm:text-lg font-bold ${cfg.color} truncate`}>
                                    {cfg.label}
                                </SheetTitle>
                                <p className="text-[10px] sm:text-xs text-gray-400 font-mono mt-0.5 truncate">
                                    {alert.id}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center sm:items-end gap-2 flex-wrap">
                            <Badge className={`${SEVERITY_STYLES[alert.severity]} border-0 text-[10px] sm:text-xs font-medium capitalize whitespace-nowrap`}>
                                {alert.severity}
                            </Badge>

                            {!alert.isRead && (
                                <span className="text-[9px] sm:text-[10px] bg-maroon text-white px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap">
                                    Unread
                                </span>
                            )}
                        </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-700 mt-3 leading-snug wrap-break-words">
                        {alert.description}
                    </p>

                    <Button
                        size="sm"
                        variant="outline"
                        onClick={onToggleRead}
                        className="mt-3 w-full sm:w-fit flex items-center justify-center gap-2 text-maroon border-maroon/30 hover:bg-maroon/5"
                    >
                        <CheckCheck size={14} />
                        {alert.isRead ? "Mark as unread" : "Mark as read"}
                    </Button>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-3 pb-3 sm:p-4">
                    <div className="border-b pb-4">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                            Alert details
                        </p>

                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                            {[
                                { icon: Building2, label: "Brand", value: alert.brand },
                                { icon: Truck, label: "Truck", value: alert.truck },
                                { icon: User, label: "Driver", value: alert.driver },
                                { icon: Truck, label: "Trip ID", value: alert.tripId },
                                { icon: Building2, label: "DC", value: alert.dc },
                                { icon: Clock, label: "Time", value: alert.time },
                            ].map(({ icon: RowIcon, label, value }) => (
                                <div key={label} className="bg-gray-50 border border-gray-100 rounded-lg p-2 sm:p-3">
                                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-400 mb-1">
                                        <RowIcon size={11} /> {label}
                                    </div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-800 break-words">
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="py-4">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                            Trip timeline
                        </p>

                        <div className="flex flex-col">
                            {mockTimeline.map((step, i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`w-3 h-3 rounded-full mt-1 shrink-0 border-2 ${
                                                step.isAlert
                                                    ? "border-red-500 bg-red-500"
                                                    : step.done
                                                        ? "border-green-500 bg-green-500"
                                                        : "border-gray-300 bg-white"
                                            }`}
                                        />
                                        {i < mockTimeline.length - 1 && (
                                            <div className="w-px flex-1 bg-gray-200 my-1" />
                                        )}
                                    </div>

                                    <div className="pb-4 min-w-0">
                                        <p
                                            className={`text-xs sm:text-sm font-medium truncate ${
                                                step.isAlert
                                                    ? "text-red-600"
                                                    : step.done
                                                        ? "text-gray-800"
                                                        : "text-gray-400"
                                            }`}
                                        >
                                            {step.label}
                                        </p>

                                        <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                                            {step.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}