import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { Search } from "lucide-react"

export default function UsersFilter({CreateButton}) {
    return (
        <section className="mt-6 px-4 lg:px-10">
             <div className="flex flex-col sm:flex-row gap-3 items-end sm:items-center sm:justify-between">
                <div className="w-full sm:max-w-sm order-2 sm:order-1">
                    <InputGroup >
                        <InputGroupInput placeholder="Search user by name/email..." className="placeholder:text-xs lg:placeholder:text-sm"/>
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                        {/* <InputGroupAddon align="inline-end">12 results</InputGroupAddon> */}
                    </InputGroup>

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