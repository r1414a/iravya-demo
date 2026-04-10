import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus, Building2  } from "lucide-react"

export default function AddBrandForm() {
    return (
        <Sheet direction="right">
            <SheetTrigger className="flex items-center bg-maroon hover:bg-maroon-dark text-white rounded-md text-sm h-8 px-2">
                <Plus className="w-4 h-4 mr-2" />
                Add Brands
            </SheetTrigger>

            <SheetContent className="bg-white min-w-120 flex flex-col">
                <SheetHeader className="border-b border-gray-200">
                    <SheetTitle>Add new brand</SheetTitle>
                    <SheetDescription>
                        Register a new brand.
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-4">
                    <FieldGroup>
                        <FieldSet>
                            <FieldGroup>

                                {/* Brand */}
                                {/* <Field>
                                    <FieldLabel>Brand <span className="text-red-500">*</span></FieldLabel>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select brand..." />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border shadow-md">
                                            <SelectGroup>
                                                <SelectLabel>Brands</SelectLabel>
                                                <SelectItem value="tata_westside">Tata Westside</SelectItem>
                                                <SelectItem value="zudio">Zudio</SelectItem>
                                                <SelectItem value="tata_cliq">Tata Cliq</SelectItem>
                                                <SelectItem value="tanishq">Tanishq</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FieldDescription className="text-xs">
                                        This DC will only manage trucks and trips for this brand
                                    </FieldDescription>
                                </Field> */}

                                {/* DC name + city */}
                                <div className="flex gap-2">
                                    <Field>
                                        <FieldLabel>Brand name <span className="text-red-500">*</span></FieldLabel>
                                        <Input placeholder="e.g. Zudio" />
                                    </Field>
                                    {/* <Field>
                                        <FieldLabel>City <span className="text-red-500">*</span></FieldLabel>
                                        <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select city..." />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border shadow-md">
                                            <SelectGroup>
                                                <SelectLabel>Cities</SelectLabel>
                                                <SelectItem value="pune">Pune</SelectItem>
                                                <SelectItem value="mumbai">Mumbai</SelectItem>
                                                <SelectItem value="nashik">Nashik</SelectItem>
                                                <SelectItem value="nagpur">Nagpur</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    </Field> */}
                                </div>

                                {/* Full address */}
                                <Field>
                                    <FieldLabel>Contact Email<span className="text-red-500">*</span></FieldLabel>
                                    <Input placeholder="abc@abc.com" />
                                   
                                </Field>

                                {/* Geofence radius */}
                                <Field>
                                    <FieldLabel>Contact Number</FieldLabel>
                                    <Input  placeholder="+91 99768 97804" />
                                    
                                </Field>

                                {/* Contact person */}
                                <div className="flex gap-2">
                                    <Field>
                                        <FieldLabel>Manager name</FieldLabel>
                                        <Input placeholder="e.g. Suresh Pawar" />
                                    </Field>
                                    <Field>
                                        <FieldLabel>Manager phone</FieldLabel>
                                        <Input placeholder="+91 98XXX XXXXX" />
                                    </Field>

                                    
                                </div>
                                

                                <Field>
                                    <FieldLabel>Manager email</FieldLabel>
                                    <Input type="email" placeholder="operator@brand.com" />
                                    
                                </Field>

                            </FieldGroup>
                        </FieldSet>
                    </FieldGroup>
                </div>

                <SheetFooter className="flex flex-row items-center w-full border-t border-gray-200">
                    <Button className="basis-1/2 bg-maroon hover:bg-maroon-dark">
                        Add Brand <Building2  className="ml-1" size={15} />
                    </Button>
                    <SheetClose className="basis-1/2" asChild>
                        <Button className="w-full" variant="outline">Cancel</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}