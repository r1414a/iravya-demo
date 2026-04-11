// AlertsFilter.jsx
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AlertsFilter({ searchInput, setSearchInput, handleClear, readFilter, setReadFilter }) {
    return (
        <section className="mt-6 px-4 lg:px-10">
            <div className="flex flex-col sm:flex-row gap-3 items-end sm:items-center sm:justify-between">
                <div className="w-full sm:max-w-sm order-2 sm:order-1">
                    <InputGroup>
                        <InputGroupInput 
                            value={searchInput}
                            onChange={e => setSearchInput(e.target.value)}
                            placeholder="Search truck, driver, trip ID..." 
                            className="placeholder:text-xs lg:placeholder:text-sm"
                        />
                        
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
                </div>

                <div className="flex gap-1 sm:gap-2 justify-end order-1 sm:order-2">
                    {["All", "Unread", "Read"].map((tab) => (
                        <Button
                            key={tab}
                            onClick={() => setReadFilter(tab)}
                            className={`px-3 text-xs sm:text-sm ${
                                readFilter === tab
                                    ? "bg-maroon text-white"
                                    : "bg-gray-200 text-black hover:bg-gray-300"
                            }`}
                        >
                            {tab}
                        </Button>
                    ))}
                </div>
            </div>
        </section>
    )
}