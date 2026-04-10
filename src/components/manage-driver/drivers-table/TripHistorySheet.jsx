import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { MapPin, Truck, Clock, CheckCircle2, XCircle } from "lucide-react"

// // Dummy trip history — replace with real API data per driver
const MOCK_HISTORY = [
    {
        id: "TRP-2841",
        truck: "MH12AB1234",
        sourceDC: "Pune Warehouse DC",
        stops: ["Koregaon Park Store", "Baner Store"],
        status: "completed",
        departedAt: "Today, 09:30 AM",
        completedAt: "Today, 11:50 AM",
        duration: "2h 20m",
    },
    {
        id: "TRP-2815",
        truck: "MH12AB1234",
        sourceDC: "Pune Warehouse DC",
        stops: ["FC Road Store"],
        status: "completed",
        departedAt: "Mar 24, 08:00 AM",
        completedAt: "Mar 24, 09:45 AM",
        duration: "1h 45m",
    },
    {
        id: "TRP-2790",
        truck: "MH12AB1234",
        sourceDC: "Pune Warehouse DC",
        stops: ["Hinjawadi Store", "Kothrud Store", "Baner Store"],
        status: "completed",
        departedAt: "Mar 22, 07:00 AM",
        completedAt: "Mar 22, 12:10 PM",
        duration: "5h 10m",
    },
    {
        id: "TRP-2771",
        truck: "MH14CD5678",
        sourceDC: "Mumbai Warehouse DC",
        stops: ["FC Road Store"],
        status: "cancelled",
        departedAt: "Mar 20, 10:00 AM",
        completedAt: null,
        duration: "—",
    },
    {
        id: "TRP-2750",
        truck: "MH12AB1234",
        sourceDC: "Pune Warehouse DC",
        stops: ["Koregaon Park Store"],
        status: "completed",
        departedAt: "Mar 18, 08:30 AM",
        completedAt: "Mar 18, 10:00 AM",
        duration: "1h 30m",
    },
]

const statusStyles = {
    completed: { className: "bg-green-100 text-green-700", label: "Completed" },
    cancelled: { className: "bg-red-100 text-red-600", label: "Cancelled" },
    in_transit: { className: "bg-blue-100 text-blue-700", label: "In Transit" },
}

function TripRow({ trip }) {
    const s = statusStyles[trip.status] || statusStyles.completed

    return (
        <div className="border border-gray-100 rounded-lg p-3 sm:p-4 hover:border-gray-200 hover:bg-gray-50 transition-colors">

            {/* Top row */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="font-mono text-xs sm:text-sm font-semibold text-maroon">
                    {trip.id}
                </span>

                <div className="flex items-center gap-2">
                    {trip.status === "completed"
                        ? <CheckCircle2 size={13} className="text-green-500" />
                        : <XCircle size={13} className="text-red-400" />
                    }
                    <Badge className={`${s.className} border-0 text-[10px] sm:text-xs font-medium`}>
                        {s.label}
                    </Badge>
                </div>
            </div>

            {/* Truck + DC */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-2">
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500">
                    <Truck size={11} />
                    <span className="font-mono">{trip.truck}</span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500">
                    <MapPin size={11} />
                    <span className="truncate max-w-[140px] sm:max-w-none">
                        {trip.sourceDC}
                    </span>
                </div>
            </div>

            {/* Stops */}
            <div className="flex flex-wrap gap-1 mb-3">
                {trip.stops.map((s, i) => (
                    <span
                        key={i}
                        className="inline-flex items-center gap-1 text-[10px] sm:text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                    >
                        <MapPin size={9} />
                        {s.replace(" Store", "")}
                    </span>
                ))}
            </div>

            {/* Times */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-gray-400">
                <div className="flex items-center gap-1">
                    <Clock size={10} />
                    <span>{trip.departedAt}</span>
                </div>

                <span className="hidden sm:inline text-gray-300">·</span>

                <span>{trip.completedAt ?? "Not completed"}</span>

                <span className="font-medium text-gray-500 ml-auto sm:ml-0">
                    {trip.duration}
                </span>
            </div>

        </div>
    )
}

export default function TripHistorySheet({ driver, open, onClose }) {
    if (!driver) return null

    const completed = MOCK_HISTORY.filter(t => t.status === "completed").length

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="w-full sm:max-w-md lg:max-w-lg bg-white p-0 flex flex-col">

                <SheetHeader className="border-b border-gray-200 p-4">
                    <SheetTitle>Trip history</SheetTitle>
                    <SheetDescription>
                        All trips completed by {driver.name}
                    </SheetDescription>
                </SheetHeader>

                <div className="p-3 sm:p-4 flex flex-col gap-4 overflow-y-auto">
                    {/* Summary */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                        {[
                            { label: "Total trips", value: driver.total_trips },
                            { label: "This month", value: driver.trips_this_month },
                            { label: "Completed", value: completed },
                        ].map(({ label, value }) => (
                            <div
                                key={label}
                                className="bg-gray-50 border border-gray-100 rounded-lg p-2 sm:p-3 text-center"
                            >
                                <p className="text-[10px] sm:text-xs text-gray-400 mb-1">
                                    {label}
                                </p>
                                <p className="text-lg sm:text-xl font-semibold text-gray-800">
                                    {value}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Trips */}
                    <div>
                        <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            Recent trips
                        </p>

                        <div className="flex flex-col gap-3">
                            {MOCK_HISTORY.map((trip) => (
                                <TripRow key={trip.id} trip={trip} />
                            ))}
                        </div>
                    </div>

                </div>
            </SheetContent>
        </Sheet>
    )
}