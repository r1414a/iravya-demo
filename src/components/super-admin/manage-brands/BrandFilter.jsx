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

export default function BrandFilter() {
    const [activeStatus, setActiveStatus] = useState("All")

    return (
        <section className="mt-10 px-10">
            <div className="flex w-full justify-between">

                {/* Left — search + brand dropdown */}
                {/* <div className="basis-1/2 flex gap-4"> */}
                    <InputGroup className="max-w-xs">
                        <InputGroupInput placeholder="Search DC name, city..." />
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                    </InputGroup>

                    {/* <div className="flex gap-4 w-full">
                        <Select defaultValue="all_brands">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select brand..." />
                            </SelectTrigger>
                            <SelectContent className="bg-white border shadow-md">
                                <SelectGroup>
                                    <SelectLabel>Brands</SelectLabel>
                                    <SelectItem value="all_brands">All brands</SelectItem>
                                    <SelectItem value="tata_westside">Tata Westside</SelectItem>
                                    <SelectItem value="zudio">Zudio</SelectItem>
                                    <SelectItem value="tata_cliq">Tata Cliq</SelectItem>
                                    <SelectItem value="tanishq">Tanishq</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div> */}

                {/* Right — status tabs, same pattern as UsersFilter */}
                {/* <div className="basis-1/2 flex gap-2 justify-end">
                    {["All", "Active", "Inactive"].map((tab) => (
                        <Button
                            key={tab}
                            onClick={() => setActiveStatus(tab)}
                            className={`px-3 ${
                                activeStatus === tab
                                    ? "bg-[#701a40] text-white"
                                    : "bg-gray-200 text-black hover:bg-gray-300"
                            }`}
                        >
                            {tab}
                        </Button>
                    ))}
                </div> */}

            </div>
        </section>
    )
}