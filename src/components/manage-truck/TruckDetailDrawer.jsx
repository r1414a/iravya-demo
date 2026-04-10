// ─── TruckDetailDrawer.jsx ────────────────────────────────────────────────────
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
    Truck,
    MapPin,
    Clock,
    CheckCircle2,
} from "lucide-react"
import { useState } from "react"

// ── Status config ─────────────────────────────────────────────────────────────
const statusStyles = {
    idle: "bg-green-100 text-green-700",
    in_transit: "bg-blue-100 text-blue-700",
    maintenance: "bg-amber-100 text-amber-700",
}
const statusLabels = {
    idle: "Idle", in_transit: "In transit", maintenance: "Maintenance",
}

// ── Mock trip history ─────────────────────────────────────────────────────────
const mockTripHistory = [
    { id: "TRP-0091", stores: "Koregaon Park → Hinjawadi", date: "Today, 09:14 AM", duration: "In progress", status: "in_transit" },
    { id: "TRP-0088", stores: "FC Road → Kothrud → Baner", date: "Mar 24, 10:00 AM", duration: "3h 12m", status: "completed" },
    { id: "TRP-0081", stores: "Viman Nagar", date: "Mar 22, 08:45 AM", duration: "1h 05m", status: "completed" },
    { id: "TRP-0074", stores: "Wakad → Pimple Saudagar", date: "Mar 20, 02:00 PM", duration: "2h 40m", status: "completed" },
]




// ── Main drawer ───────────────────────────────────────────────────────────────
export default function TruckDetailDrawer({ truck, open, onClose }) {
    const [editingDriver, setEditingDriver] = useState(false)

    if (!truck) return null



    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="w-full h-full sm:h-auto sm:max-w-md lg:max-w-lg overflow-y-auto flex flex-col gap-0 p-0">

                {/* ── Header ── */}
                <SheetHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 border-b">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">

                        <div>
                            <SheetTitle className="text-lg sm:text-xl font-mono font-bold break-words">
                                {truck.registration_no}
                            </SheetTitle>
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                {truck.model} · {truck.capacity}
                            </p>
                        </div>

                        <Badge className={`${statusStyles[truck.status]} sm:mt-4 border-0 text-[10px] sm:text-xs font-medium w-fit`}>
                            {statusLabels[truck.status]}
                        </Badge>

                    </div>
                </SheetHeader>

                {/* ── Trip history ── */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 flex-1">

                    <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        Trip history
                    </p>

                    <div className="flex flex-col gap-2 sm:gap-3">
                        {mockTripHistory.map((trip) => (
                            <div
                                key={trip.id}
                                className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                            >

                                {/* Icon */}
                                <div className={`mt-0.5 rounded-full p-1 ${trip.status === "in_transit" ? "bg-blue-100" : "bg-green-100"
                                    }`}>
                                    {trip.status === "in_transit"
                                        ? <Truck size={12} className="text-blue-600" />
                                        : <CheckCircle2 size={12} className="text-green-600" />
                                    }
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">

                                    {/* Top row */}
                                    <div className="flex flex-wrap items-center justify-between gap-1">
                                        <p className="text-[10px] sm:text-xs font-mono text-gray-500">
                                            {trip.id}
                                        </p>

                                        <p className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-1">
                                            <Clock size={10} />
                                            {trip.duration}
                                        </p>
                                    </div>

                                    {/* Stores */}
                                    <p className="text-xs sm:text-sm font-medium flex items-start gap-1 mt-0.5">
                                        <MapPin size={11} className="text-gray-400 shrink-0 mt-[2px]" />
                                        <span className="break-words">
                                            {trip.stores}
                                        </span>
                                    </p>

                                    {/* Date */}
                                    <p className="text-[10px] sm:text-xs text-gray-400">
                                        {trip.date}
                                    </p>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </SheetContent>
        </Sheet>

    )
}