import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Truck,
    Warehouse,
    Phone,
    Mail,
    Pencil,
    CheckCircle2,
    Clock,
    PackageCheck,
    Ban,
    User,
    Building2,
} from "lucide-react"
import { useState } from "react"

const statusStyles = {
    active:   "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-500",
}

// Mock recent deliveries for this brand
const mockDeliveries = [
    { id: "DEL-5821", truck: "MH12AB1234", warehouse: "Pune Warehouse DC",   status: "delivered",  time: "Today, 10:15 AM" },
    { id: "DEL-5820", truck: "MH14CD5678", warehouse: "Kolhapur DC",         status: "in_transit", time: "Today, 09:00 AM" },
    { id: "DEL-5819", truck: "MH04EF9012", warehouse: "Mumbai Warehouse DC", status: "delivered",  time: "Yesterday" },
    { id: "DEL-5818", truck: "MH12GH3456", warehouse: "Pune Warehouse DC",   status: "delivered",  time: "Yesterday" },
]

const deliveryStatusStyle = {
    in_transit: { bg: "bg-blue-100",  text: "text-blue-600",  label: "In transit" },
    delivered:  { bg: "bg-green-100", text: "text-green-600", label: "Delivered"  },
    scheduled:  { bg: "bg-gray-100",  text: "text-gray-500",  label: "Scheduled"  },
}

export default function BrandDetailDrawer({ brand, open, onClose }) {
    const [editingContact, setEditingContact] = useState(false)

    if (!brand) return null

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent className="bg-white min-w-110 overflow-y-auto flex flex-col gap-0 p-0">

                {/* ── Header ── */}
                <SheetHeader className="px-6 pt-6 pb-4 border-b">
                    <div className="flex items-start justify-between">
                        <div>
                            <SheetTitle className="text-xl font-bold">{brand.name}</SheetTitle>
                            <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1">
                                <Building2 size={12} /> {brand.category}
                            </p>
                        </div>
                        <Badge className={`${statusStyles[brand.status]} border-0 text-xs font-medium mt-1`}>
                            {brand.status.charAt(0).toUpperCase() + brand.status.slice(1)}
                        </Badge>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">{brand.contactEmail}</p>
                </SheetHeader>

                {/* ── Brand summary stats ── */}
                <div className="px-6 py-4 border-b">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        Brand overview
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { icon: Warehouse,    label: "Warehouses",          value: `${brand.totalWarehouses} locations` },
                            { icon: Truck,        label: "Trucks",              value: `${brand.totalTrucks} assigned` },
                            { icon: PackageCheck, label: "Today's deliveries",  value: brand.todayDeliveries },
                            { icon: CheckCircle2, label: "Total deliveries",    value: brand.totalDeliveries },
                            { icon: Clock,        label: "Onboarded since",     value: brand.createdAt },
                        ].map(({ icon: Icon, label, value }) => (
                            <div key={label} className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                                    <Icon size={11} /> {label}
                                </div>
                                <p className="text-sm font-medium text-gray-800">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Brand contact + Manager — inline edit ── */}
                <div className="px-6 py-4 border-b">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Contacts
                        </p>
                        <button
                            className="text-xs text-maroon flex items-center gap-1 hover:underline"
                            onClick={() => setEditingContact(!editingContact)}
                        >
                            <Pencil size={11} />
                            {editingContact ? "Cancel" : "Edit"}
                        </button>
                    </div>

                    {editingContact ? (
                        <div className="flex flex-col gap-4">
                            {/* Brand contact */}
                            <div>
                                <p className="text-xs font-medium text-gray-500 mb-2">Brand contact</p>
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <div className="flex flex-col gap-1 flex-1">
                                            <Label className="text-xs">Brand name</Label>
                                            <Input defaultValue={brand.name} className="h-8 text-sm" />
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex flex-col gap-1 flex-1">
                                            <Label className="text-xs">Contact phone</Label>
                                            <Input defaultValue={brand.contactPhone} className="h-8 text-sm" />
                                        </div>
                                        <div className="flex flex-col gap-1 flex-1">
                                            <Label className="text-xs">Contact email</Label>
                                            <Input defaultValue={brand.contactEmail} className="h-8 text-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Manager */}
                            <div>
                                <p className="text-xs font-medium text-gray-500 mb-2">Manager</p>
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col gap-1">
                                        <Label className="text-xs">Manager name</Label>
                                        <Input defaultValue={brand.managerName} className="h-8 text-sm" />
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex flex-col gap-1 flex-1">
                                            <Label className="text-xs">Manager phone</Label>
                                            <Input defaultValue={brand.managerPhone} className="h-8 text-sm" />
                                        </div>
                                        <div className="flex flex-col gap-1 flex-1">
                                            <Label className="text-xs">Manager email</Label>
                                            <Input defaultValue={brand.managerEmail} className="h-8 text-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button size="sm" className="bg-maroon hover:bg-maroon-dark text-white w-fit">
                                Save changes
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {/* Brand contact */}
                            <div>
                                <p className="text-xs font-medium text-gray-400 mb-1.5">Brand contact</p>
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Phone size={13} className="text-gray-400" /> {brand.contactPhone}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Mail size={13} className="text-gray-400" /> {brand.contactEmail}
                                    </div>
                                </div>
                            </div>

                            {/* Manager */}
                            <div>
                                <p className="text-xs font-medium text-gray-400 mb-1.5">Manager</p>
                                <div className="flex flex-col gap-1.5">
                                    <p className="text-sm font-medium flex items-center gap-2">
                                        <User size={13} className="text-gray-400" /> {brand.managerName}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Phone size={13} className="text-gray-400" /> {brand.managerPhone}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Mail size={13} className="text-gray-400" /> {brand.managerEmail}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Recent deliveries ── */}
                <div className="px-6 py-4 flex-1">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        Recent deliveries
                    </p>
                    <div className="flex flex-col gap-3">
                        {mockDeliveries.map((delivery) => {
                            const s = deliveryStatusStyle[delivery.status]
                            return (
                                <div
                                    key={delivery.id}
                                    className="flex items-start gap-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors"
                                >
                                    <div className={`mt-0.5 rounded-full p-1 ${s.bg}`}>
                                        {delivery.status === "delivered"
                                            ? <CheckCircle2 size={13} className={s.text} />
                                            : <Truck size={13} className={s.text} />
                                        }
                                    </div>
                                    <div className="flex-1 -space-y-0.5">
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs font-mono text-gray-500">{delivery.id}</p>
                                            <Badge className={`${s.bg} ${s.text} border-0 text-[10px] font-medium`}>
                                                {s.label}
                                            </Badge>
                                        </div>
                                        <p className="text-sm font-medium flex items-center gap-1">
                                            <Truck size={11} className="text-gray-400 shrink-0" />
                                            {delivery.truck}
                                        </p>
                                        <p className="text-xs text-gray-400 flex items-center gap-1">
                                            <Warehouse size={10} /> {delivery.warehouse}
                                        </p>
                                        <p className="text-xs text-gray-400 flex items-center gap-1">
                                            <Clock size={10} /> {delivery.time}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* ── Danger zone ── */}
                <div className="px-6 py-4 border-t">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                        Danger zone
                    </p>
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 border-red-200 hover:bg-red-50 flex items-center gap-2"
                    >
                        <Ban size={13} />
                        {brand.status === "active" ? "Deactivate this brand" : "Reactivate this brand"}
                    </Button>
                </div>

            </SheetContent>
        </Sheet>
    )
}