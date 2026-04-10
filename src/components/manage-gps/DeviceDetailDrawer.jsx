import {
    Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Truck, AlertTriangle, RefreshCw, MapPin,
    Clock, CheckCircle2, XCircle, Cpu, Zap, Signal,
    Store, Warehouse, ChevronRight,
} from "lucide-react"

// ── Updated status config ─────────────────────────────────────────────────────
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
            {[25, 50, 75, 100].map((t, i) => (
                <div key={i} className={`w-1.5 rounded-sm ${strength >= t ? color : "bg-gray-200"}`}
                    style={{ height: `${(i + 1) * 5 + 4}px` }} />
            ))}
            <span className="ml-1.5 text-sm font-medium text-gray-700">
                {strength > 0 ? `${strength}%` : "No signal"}
            </span>
        </div>
    )
}

function DiagRow({ label, value, ok }) {
    return (
        <div className="flex items-center justify-between py-2.5 border-b last:border-0">
            <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${ok ? "bg-green-500" : "bg-red-400"}`} />
                <span className="text-sm text-gray-600">{label}</span>
            </div>
            <span className={`text-xs font-mono ${ok ? "text-gray-700" : "text-red-500"}`}>{value}</span>
        </div>
    )
}

const mockPingLog = [
    { time: "10:42:18 AM", lat: "18.5204", lng: "73.8567", signal: 87, ok: true },
    { time: "10:42:08 AM", lat: "18.5198", lng: "73.8561", signal: 85, ok: true },
    { time: "10:41:58 AM", lat: "18.5192", lng: "73.8554", signal: 88, ok: true },
    { time: "10:41:48 AM", lat: "18.5186", lng: "73.8548", signal: 82, ok: true },
    { time: "10:41:38 AM", lat: "—", lng: "—", signal: 0, ok: false },
    { time: "10:41:28 AM", lat: "18.5174", lng: "73.8535", signal: 79, ok: true },
]

export default function DeviceDetailDrawer({ device, open, onClose }) {
    if (!device) return null

    const isOnline = device.status === "in_transit"
    const hasWarning = device.battery <= 15 || device.signalStrength < 30

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="w-full sm:max-w-md lg:max-w-lg bg-white p-0 flex flex-col">

                {/* ── Header ── */}
                <SheetHeader className="px-4 sm:px-6 pt-6 pb-4 border-b">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="min-w-0">
                            <SheetTitle className="text-lg sm:text-xl font-mono font-bold truncate">
                                {device.deviceId}
                            </SheetTitle>

                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 font-mono break-all">
                                IMEI: {device.imei}
                            </p>
                        </div>

                        <Badge
                            className={`${statusStyles[device.status]} border-0 text-xs font-medium self-start sm:mt-4`}
                        >
                            {statusLabels[device.status]}
                        </Badge>
                    </div>

                    {/* Quick stats */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3">
                        {[
                            { icon: Signal, label: "Signal", content: <SignalBars strength={device.signalStrength} /> },
                            {
                                icon: Zap,
                                label: "Battery",
                                content: (
                                    <span
                                        className={`text-sm font-semibold ${device.battery <= 15 ? "text-red-600" : "text-gray-800"
                                            }`}
                                    >
                                        {device.battery}%
                                    </span>
                                ),
                            },
                            {
                                icon: Cpu,
                                label: "Trips",
                                content: (
                                    <span className="text-sm font-semibold text-gray-800">
                                        {device.totalTrips}
                                    </span>
                                ),
                            },
                        ].map(({ icon: Icon, label, content }) => (
                            <div
                                key={label}
                                className="bg-gray-50 border border-gray-100 rounded-lg p-2 sm:p-3"
                            >
                                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-400 mb-1.5">
                                    <Icon size={11} /> {label}
                                </div>
                                {content}
                            </div>
                        ))}
                    </div>

                    {/* Warning banner */}
                    {hasWarning && (
                        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-md px-3 py-2 mt-3">
                            <AlertTriangle size={14} className="text-amber-600 shrink-0" />
                            <p className="text-xs text-amber-700">
                                {device.battery <= 15 ? "Battery critically low." : ""}
                                {device.signalStrength < 30 ? " Weak signal detected." : ""} Check
                                device.
                            </p>
                        </div>
                    )}
                </SheetHeader>

                <div className="overflow-y-auto">
                    {/* ── Device info grid ── */}
                    <div className="px-4 sm:px-6 py-4 border-b">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                            Device info
                        </p>

                        <div className="grid grid-cols-2 gap-2">
                            {[
                                ["SIM card", device.simNo],
                                ["Firmware", device.firmware],
                                ["Home DC", device.homeDC],
                                ["Installed", device.installDate],
                                ["Trips this month", device.tripsThisMonth],
                                ["Total trips", device.totalTrips],
                            ].map(([label, value]) => (
                                <div
                                    key={label}
                                    className="bg-gray-50 border border-gray-100 rounded-lg p-2.5"
                                >
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                                        {label}
                                    </p>
                                    <p className="text-sm font-medium text-gray-800 font-mono wrap-break-words">
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Diagnostics ── */}
                    <div className="px-4 sm:px-6 py-4 border-b">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Diagnostics
                            </p>

                            <button className="text-xs text-maroon flex items-center gap-1 hover:underline">
                                <RefreshCw size={11} /> Re-ping
                            </button>
                        </div>

                        <DiagRow
                            label="MQTT connection"
                            value={isOnline ? "Connected" : "Disconnected"}
                            ok={isOnline}
                        />
                        <DiagRow
                            label="GPS fix"
                            value={isOnline ? "3D fix — 8 satellites" : "No fix"}
                            ok={isOnline}
                        />
                        <DiagRow
                            label="Cellular network"
                            value={
                                device.signalStrength > 0
                                    ? `HSPA+ (${device.signalStrength}%)`
                                    : "No signal"
                            }
                            ok={device.signalStrength > 30}
                        />
                        <DiagRow
                            label="Battery"
                            value={
                                device.battery > 20
                                    ? `${device.battery}% — OK`
                                    : `${device.battery}% — Low`
                            }
                            ok={device.battery > 20}
                        />
                        <DiagRow
                            label="Firmware"
                            value={
                                device.firmware === "v2.4.1"
                                    ? `${device.firmware} — Latest`
                                    : `${device.firmware} — Update available`
                            }
                            ok={device.firmware === "v2.4.1"}
                        />
                    </div>


                    {/* ── Recent pings ── */}
                    <div className="px-4 sm:px-6 py-4 flex-1">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                            Recent pings
                        </p>

                        <div className="flex flex-col gap-0">
                            {mockPingLog.map((ping, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-3 py-2.5 border-b last:border-0"
                                >
                                    <div
                                        className={`mt-0.5 rounded-full p-0.5 shrink-0 ${ping.ok ? "bg-green-100" : "bg-red-100"
                                            }`}
                                    >
                                        {ping.ok ? (
                                            <CheckCircle2 size={12} className="text-green-600" />
                                        ) : (
                                            <XCircle size={12} className="text-red-400" />
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 flex-wrap">
                                            <p className="text-xs font-medium text-gray-700">
                                                {ping.ok ? "Ping received" : "Ping missed"}
                                            </p>

                                            <p className="text-xs text-gray-400 font-mono">
                                                {ping.time}
                                            </p>
                                        </div>

                                        {ping.ok && (
                                            <p className="text-xs text-gray-400 font-mono break-all">
                                                {ping.lat}, {ping.lng} · {ping.signal}% signal
                                            </p>
                                        )}
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