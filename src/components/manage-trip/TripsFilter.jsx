import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { Search,X } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { useLocation } from "react-router-dom"

export default function TripsFilter({ CreateButton, searchInput, setSearchInput, handleClear }) {
    const [activeStatus, setActiveStatus] = useState("All")
    const location = useLocation()

    return (
        <section className="mt-6 px-4 lg:px-10">
            <div className="flex flex-col sm:flex-row gap-3 items-end sm:items-center sm:justify-between">

                {/* Left — search + dropdowns */}
                <div className="w-full flex flex-col sm:flex-row gap-0 sm:gap-4 sm:max-w-lg order-2 sm:order-1 space-y-2">
                    <InputGroup >
                        <InputGroupInput 
                        value={searchInput}
                                onChange={e => setSearchInput(e.target.value)}
                        placeholder="Search trip ID, truck, driver..." className="placeholder:text-xs lg:placeholder:text-sm"/>
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>

                        {searchInput && (
                                <button 
                                    onClick={handleClear}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                    </InputGroup>

                    {
                        location.pathname.startsWith("/admin") && (
                            <Select defaultValue="all_dcs">
                                <SelectTrigger className="w-56">
                                    <SelectValue placeholder="Select DC..." />
                                </SelectTrigger>
                                <SelectContent className="bg-white border shadow-md">
                                    <SelectGroup>
                                        <SelectLabel>Data Centers</SelectLabel>
                                        <SelectItem value="all_dcs">All DCs</SelectItem>
                                        <SelectItem value="pune_dc">Pune Warehouse DC</SelectItem>
                                        <SelectItem value="mumbai_dc">Mumbai Warehouse DC</SelectItem>
                                        <SelectItem value="nashik_dc">Nashik DC</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )
                    }

                </div>
                {CreateButton && (
                    <div className="flex justify-end order-1 sm:order-2">
                        {CreateButton}
                    </div>
                )}

            </div>
        </section>
    )
}