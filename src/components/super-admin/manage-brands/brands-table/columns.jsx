import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    MoreHorizontal,
    Pencil,
    Ban,
    Truck,
    Warehouse,
    ChevronRight,
    PackageCheck,
    Phone,
    Mail,
    User,
} from "lucide-react"

const statusStyles = {
    active:   "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-500",
}

export const columns = [
    // Brand name + category
    {
        accessorKey: "name",
        header: "Brand",
        cell: ({ row }) => {
            const { name, category } = row.original
            return (
                <div className="-space-y-0.5">
                    <p className="font-semibold text-sm">{name}</p>
                    <p className="text-xs text-gray-400">{category}</p>
                </div>
            )
        },
    },

    // Warehouses
    {
        accessorKey: "totalWarehouses",
        header: "Warehouses",
        cell: ({ row }) => {
            const { totalWarehouses } = row.original
            return (
                <div className="flex items-center gap-1.5 text-sm text-gray-700">
                    <Warehouse size={13} className="text-gray-400" />
                    {totalWarehouses} locations
                </div>
            )
        },
    },

    // Brand contact (email + phone)
    {
        accessorKey: "contactEmail",
        header: "Brand contact",
        cell: ({ row }) => {
            const { contactPhone, contactEmail } = row.original
            return (
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Mail size={11} className="text-gray-400" />
                        <span>{contactEmail}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Phone size={11} className="text-gray-400" />
                        <span>{contactPhone}</span>
                    </div>
                </div>
            )
        },
    },

    // Manager name + email + phone
    {
        accessorKey: "managerName",
        header: "Manager",
        cell: ({ row }) => {
            const { managerName, managerPhone, managerEmail } = row.original
            return (
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-800">
                        <User size={11} className="text-gray-400" />
                        <span>{managerName}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Mail size={11} className="text-gray-400" />
                        <span>{managerEmail}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Phone size={11} className="text-gray-400" />
                        <span>{managerPhone}</span>
                    </div>
                </div>
            )
        },
    },

    // Trucks
    {
        accessorKey: "totalTrucks",
        header: "Trucks",
        cell: ({ row }) => {
            const { totalTrucks } = row.original
            return (
                <div className="flex items-center gap-1.5 text-sm text-gray-700">
                    <Truck size={13} className="text-gray-400" />
                    {totalTrucks} 
                </div>
            )
        },
    },

    // Deliveries — today + total
    {
        accessorKey: "todayDeliveries",
        header: "Deliveries",
        cell: ({ row }) => {
            const { todayDeliveries, totalDeliveries } = row.original
            return (
                <div className="-space-y-0.5">
                    <div className="flex items-center gap-1.5">
                        <PackageCheck size={13} className="text-green-500" />
                        <p className="text-sm font-medium">{todayDeliveries} today</p>
                    </div>
                    <p className="text-xs text-gray-400 pl-5">{totalDeliveries} total</p>
                </div>
            )
        },
    },

    // Status — radio filter in header
    {
        accessorKey: "status",
        header: ({ column }) => {
            const current = column.getFilterValue() || "all"
            return (
                <div className="flex items-center gap-2">
                    <span>Status</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-6 min-w-14 text-[10px]">
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
                                <DropdownMenuRadioItem value="all"      className="text-xs">All</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="active"   className="text-xs">Active</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="inactive" className="text-xs">Inactive</DropdownMenuRadioItem>
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
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                </Badge>
            )
        },
        filterFn: (row, id, value) => {
            if (!value) return true
            return row.getValue(id) === value
        },
    },

    // Actions
    {
        id: "actions",
        cell: ({ row }) => {
            const brand = row.original
            return (
                <div className="flex items-center gap-2 justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <MoreHorizontal size={16} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="bg-white border shadow-md w-44"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <DropdownMenuItem className="gap-2 text-sm cursor-pointer">
                                <Pencil size={14} /> Edit brand details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className={`gap-2 text-sm cursor-pointer ${brand.status === "active" ? "text-red-500" : "text-green-600"}`}
                            >
                                <Ban size={14} />
                                {brand.status === "active" ? "Deactivate brand" : "Reactivate brand"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <ChevronRight size={16} className="text-gray-300" />
                </div>
            )
        },
    },
]

