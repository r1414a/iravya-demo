import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { Search } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState } from "react"
 
export default function AlertsFilter() {
    const [activeRead, setActiveRead] = useState("All")
 
    return (
        <section className="mt-6 px-4 lg:px-10">
            <div className="flex flex-col sm:flex-row gap-3 items-end sm:items-center sm:justify-between">
 
               
                    <InputGroup>
                        <InputGroupInput placeholder="Search truck, driver, trip ID..." className="placeholder:text-xs lg:placeholder:text-sm"/>
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                    </InputGroup>
 
                {/* Right — read/unread tabs, same pattern as UsersFilter All/Active/Inactive */}
                <div className="basis-1/2 flex gap-1 sm:gap-2 justify-end">
                    {["All", "Unread", "Read"].map((tab) => (
                        <Button
                            key={tab}
                            onClick={() => setActiveRead(tab)}
                            className={`px-3 text-xs sm:text-sm ${
                                activeRead === tab
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