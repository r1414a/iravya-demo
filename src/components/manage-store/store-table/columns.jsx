// store-table/columns.jsx
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    MoreHorizontal,
    Pencil,
    MapPin,
    Copy,
    Eye,
} from "lucide-react"
import StoreDetailDrawer from "../StoreDetailsDrawer"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import StoreForm from "../StoreForm"
import DeleteModal from "@/components/DeleteModal"
import { toast } from "sonner"

const statusStyles = {
    active: "bg-green-100 text-green-700",
    inactive: "bg-gray-100 text-gray-500",
}

const BRANDS = ["Tata Westside", "Zudio", "Tata Cliq", "Tanishq"]
const CITIES = ["Pune", "Mumbai", "Nashik", "Nagpur"]

function ActionsCell({ row, onEditStore, onDeleteStore }) {
    const store = row.original
    const { pathname } = useLocation()
    const [viewDetails, setViewDetails] = useState(false)

    const handleDelete = async () => {
        await onDeleteStore(store.id)
        toast.success("Store deleted successfully", {
            description: `${store.name} has been removed.`,
            style: {
                    color: "green"
                }
        })
    }

    return (
        <>
            <StoreDetailDrawer
                store={store}
                open={viewDetails}
                onClose={() => setViewDetails(false)}
            />

            <div className="flex items-center gap-2 justify-end">
                {
                    store.totalDeliveries > 0 && (
                        <Button 
                    variant="outline" 
                    size="xs" 
                    onClick={() => setViewDetails(true)} 
                    className="hover:bg-maroon cursor-pointer text-blue-800 hover:text-white"
                >
                    <Eye size={16} />
                </Button>
                    )
                }
                
                
                {pathname.startsWith('/admin') && (
                    <>
                        <StoreForm 
                            mode="edit" 
                            store={store} 
                            onEditStore={onEditStore}
                        />
                        <DeleteModal
                            who={store.name}
                            m1active="Store will no longer be available for trip scheduling or fleet tracking."
                            onConfirm={handleDelete}
                        />
                    </>
                )}
            </div>
        </>
    )
}

export const columns = ({ onEditStore, onDeleteStore }) => [
    {
        accessorKey: "name",
        header: "Store",
        cell: ({ row }) => {
            const { name, address } = row.original
            return (
                <div className="-space-y-0.5">
                    <p className="font-semibold text-sm">{name}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 max-w-56 truncate text-wrap">
                        <MapPin size={10} className="shrink-0" />
                        {address}
                    </p>
                </div>
            )
        },
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
        accessorKey: "city",
        header: ({ column }) => {
            const current = column.getFilterValue() || "all"
            return (
                <div className="flex items-center gap-2">
                    <span>City</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-6 min-w-16 text-[10px]">
                                {current === "all" ? "All" : current}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-36 bg-white border shadow-md">
                            <DropdownMenuRadioGroup
                                value={current}
                                onValueChange={(val) =>
                                    column.setFilterValue(val === "all" ? undefined : val)
                                }
                            >
                                <DropdownMenuRadioItem value="all" className="text-xs">All cities</DropdownMenuRadioItem>
                                {CITIES.map((c) => (
                                    <DropdownMenuRadioItem key={c} value={c} className="text-xs">{c}</DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
        cell: ({ row }) => (
            <span className="text-sm text-gray-600">{row.getValue("city")}</span>
        ),
        filterFn: (row, id, value) => !value || row.getValue(id) === value,
    },
    {
        accessorKey: "managerName",
        header: "Store manager",
        cell: ({ row }) => {
            const { managerName, managerPhone } = row.original
            return (
                <div className="-space-y-0.5">
                    <p className="text-sm font-medium">{managerName}</p>
                    <p className="text-xs text-gray-400">{managerPhone}</p>
                </div>
            )
        },
    },
    {
        accessorKey: "deliveriesToday",
        header: "Deliveries",
        cell: ({ row }) => {
            const { deliveriesToday, totalDeliveries } = row.original
            return (
                <div className="-space-y-0.5">
                    <p className="text-sm font-medium">
                        {deliveriesToday > 0
                            ? <span className="text-blue-600">{deliveriesToday} today</span>
                            : <span className="text-gray-400">None today</span>
                        }
                    </p>
                    <p className="text-xs text-gray-400">{totalDeliveries} total</p>
                </div>
            )
        },
    },
    // {
    //     accessorKey: "publicTrackingSlug",
    //     header: "Public URL",
    //     cell: ({ row }) => {
    //         const slug = row.original.publicTrackingSlug
    //         return (
    //             <div
    //                 className="flex items-center gap-1.5 text-xs font-mono text-blue-600 hover:underline cursor-pointer"
    //                 onClick={(e) => {
    //                     e.stopPropagation()
    //                     navigator.clipboard.writeText(`/track/${slug}`)
    //                     toast.success("URL copied to clipboard")
    //                 }}
    //                 title="Click to copy"
    //             >
    //                 <Copy size={10} />
    //                 /track/{slug}
    //             </div>
    //         )
    //     },
    // },
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
                                <DropdownMenuRadioItem value="all" className="text-xs">All</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="active" className="text-xs">Active</DropdownMenuRadioItem>
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
        filterFn: (row, id, value) => !value || row.getValue(id) === value,
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <ActionsCell 
                row={row} 
                onEditStore={onEditStore}
                onDeleteStore={onDeleteStore}
            />
        ),
    },
]