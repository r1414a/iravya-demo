import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
    Truck,
    Users,
    LocateFixed,
    MapPin,
    CheckCircle2,
    Clock,
    Road,
} from "lucide-react"
import { useState } from "react"
import { format, parseISO } from "date-fns"

const statusStyles = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-500",
}

// Recent trips for this DC — mock data
const mockTrips = [
    { id: "TRP-2841", truck: "MH12AB1234", driver: "Ravi D.", stops: "Koregaon → Baner", status: "in_transit", time: "Today, 09:30 AM" },
    { id: "TRP-2840", truck: "MH14CD5678", driver: "Suresh P.", stops: "Hinjawadi", status: "in_transit", time: "Today, 08:15 AM" },
    { id: "TRP-2839", truck: "MH04EF9012", driver: "Anil B.", stops: "FC Road → Kothrud", status: "completed", time: "Yesterday" },
    { id: "TRP-2838", truck: "MH12GH3456", driver: "Manoj K.", stops: "Wakad", status: "completed", time: "Yesterday" },
]

const tripStatusStyle = {
    in_transit: { bg: "bg-blue-100", text: "text-blue-600", label: "In transit" },
    completed: { bg: "bg-green-100", text: "text-green-600", label: "Completed" },
    scheduled: { bg: "bg-gray-100", text: "text-gray-500", label: "Scheduled" },
}

export default function DCDetailDrawer({ dc, open, onClose }) {

    if (!dc) return null

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="w-full sm:max-w-md lg:max-w-lg bg-white p-0 flex flex-col ">

                {/* ── Header ── */}
                <SheetHeader className="p-4 border-b">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="min-w-0">
                            <SheetTitle className="text-base sm:text-lg lg:text-xl font-bold truncate">{dc.dc_name}</SheetTitle>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 flex items-center gap-1 flex-wrap">
                                <MapPin size={12} /> {dc.city}
                            </p>
                        </div>
                        <Badge className={`${statusStyles[dc.status]} border-0 text-xs font-medium sm:mt-6 w-fit`}>
                            {dc.status.charAt(0).toUpperCase() + dc.status.slice(1)}
                        </Badge>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 wrap-break-words">{dc.address}</p>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto px-3 pb-3 sm:p-4">
                    {/* ── Fleet summary — same 2-col grid as TruckDetailDrawer info grid ── */}
                    <div className="pb-4 border-b">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                            Fleet at this DC
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-3">
                            {[
                                // { icon: Truck, label: "Trucks", value: `${dc.active_trucks} active / ${dc.total_trucks} total` },
                                // { icon: Users, label: "Drivers", value: `${dc.total_drivers} registered` },
                                // { icon: LocateFixed, label: "GPS devices", value: `${dc.devicesAvailable} available / ${dc.total_devices} total` },
                                { icon: Road, label: "Active trips", value: dc.active_trips },
                                { icon: CheckCircle2, label: "Total trips", value: dc.total_trips },
                                { icon: Clock, label: "Operating since", value: format(parseISO(dc.created_at), 'MMM yyyy')},
                            ].map(({ icon: Icon, label, value }) => (
                                <div key={label} className="bg-gray-50 border border-gray-100 rounded-lg p-2 sm:p-3">
                                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-400 mb-1">
                                        <Icon size={11} /> {label}
                                    </div>
                                    <p className="text-xs sm:text-sm font-medium text-gray-800 wrap-break-words">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>


                            {
                                dc.total_trips > 0 && (
                                    <>
                                    {/* ── Recent trips from this DC ── */}
                    <div className="py-4 flex-1 overflow-y-auto">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                            Recent trips
                        </p>
                        <div className="flex flex-col gap-2 sm:gap-3">
                            {mockTrips.map((trip) => {
                                const s = tripStatusStyle[trip.status]
                                return (
                                    <div
                                        key={trip.id}
                                        className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                                    >
                                        <div className={`mt-0.5 rounded-full p-1 ${s.bg}`}>
                                            {trip.status === "completed"
                                                ? <CheckCircle2 size={13} className={s.text} />
                                                : <Truck size={13} className={s.text} />
                                            }
                                        </div>
                                        <div className="flex-1 min-w-0 -space-y-0.5">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-[10px] sm:text-xs font-mono text-gray-500 truncate">{trip.id}</p>
                                                <Badge className={`${s.bg} ${s.text} border-0 text-[9px] sm:text-[10px] font-medium whitespace-nowrap`}>
                                                    {s.label}
                                                </Badge>
                                            </div>
                                            <p className="text-xs sm:text-sm font-medium flex items-center gap-1 truncate">
                                                <Truck size={11} className="text-gray-400 shrink-0" />
                                                {trip.truck} · {trip.driver}
                                            </p>
                                            <p className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-1 truncate">
                                                <MapPin size={10} /> {trip.stops}
                                            </p>
                                            <p className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-1">
                                                <Clock size={10} /> {trip.time}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    </>
                                )
                            }
                    
                </div>

            </SheetContent>
        </Sheet>
    )
}