import { Button } from "@/components/ui/button"
import {
    Sheet, SheetClose, SheetContent,
    SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"
import {
    Field, FieldDescription, FieldGroup, FieldLabel, FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Select, SelectContent, SelectGroup,
    SelectItem, SelectLabel, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Plus, Cpu } from "lucide-react"
import CreateFormSheetTrigger from "../CreateFormSheetTrigger"
 
export default function AddGPSDeviceModal() {
    return (
        <Sheet direction="right">
            <CreateFormSheetTrigger text='Register Device'/>
            {/* <SheetTrigger className="flex items-center bg-maroon hover:bg-maroon-dark text-white rounded-md text-sm h-8 px-2">
                <Plus className="w-4 h-4 mr-2" />
                Register Device
            </SheetTrigger> */}
 
            <SheetContent className="w-full sm:max-w-md lg:max-w-lg bg-white p-0 flex flex-col">
                <SheetHeader className="border-b border-gray-200">
                    <SheetTitle>Register GPS device</SheetTitle>
                    <SheetDescription>
                        Add a new tracking device to the platform and assign it to a DC
                    </SheetDescription>
                </SheetHeader>
 
                <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                    <FieldGroup>
                        <FieldSet>
                            <FieldGroup>
 
                                {/* Device ID + IMEI */}
                                <div  className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <Field>
                                        <FieldLabel>Device ID</FieldLabel>
                                        <Input placeholder="GPS-006-PUNE" className="font-mono uppercase placeholder:text-sm text-sm sm:text-md" />
                                    </Field>
                                    <Field>
                                        <FieldLabel>IMEI number</FieldLabel>
                                        <Input placeholder="15-digit IMEI" className="font-mono placeholder:text-sm text-sm sm:text-md" maxLength={15} />
                                    </Field>
                                </div>
 
                                {/* SIM + firmware */}
                                <div  className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <Field>
                                        <FieldLabel>SIM card number</FieldLabel>
                                        <Input placeholder="9833012345" className="font-mono placeholder:text-sm text-sm sm:text-md" />
                                    </Field>
                                    <Field>
                                        <FieldLabel>Firmware version</FieldLabel>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select..." />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border shadow-md">
                                                <SelectGroup>
                                                    <SelectLabel>Version</SelectLabel>
                                                    <SelectItem value="v2.4.1">v2.4.1 (latest)</SelectItem>
                                                    <SelectItem value="v2.4.0">v2.4.0</SelectItem>
                                                    <SelectItem value="v2.3.8">v2.3.8</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                </div>
 
                                {/* Brand */}
                                {/* <Field>
                                    <FieldLabel>Brand</FieldLabel>
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
                                </Field> */}
 
                                {/* Assign to DC — super admin assigns device to a DC, not to a truck */}
                                <Field>
                                    <FieldLabel>Assign to DC</FieldLabel>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select data center..." />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border shadow-md">
                                            <SelectGroup>
                                                <SelectLabel>Data Centers</SelectLabel>
                                                <SelectItem value="pune_dc">Pune Warehouse DC</SelectItem>
                                                <SelectItem value="mumbai_dc">Mumbai Warehouse DC</SelectItem>
                                                <SelectItem value="nashik_dc">Nashik DC</SelectItem>
                                                <SelectItem value="nagpur_dc">Nagpur DC</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FieldDescription className="text-xs">
                                        Device will appear in this DC's inventory as available
                                    </FieldDescription>
                                </Field>
 
                                {/* Install date */}
                                <Field>
                                    <FieldLabel>Install date</FieldLabel>
                                    <Input type="date" placeholder:text-sm text-sm sm:text-md/>
                                </Field>
 
                                {/* Info note */}
                                <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-md px-3 py-2.5">
                                    <Cpu size={14} className="text-blue-500 mt-0.5 shrink-0" />
                                    <p className="text-xs text-blue-700 leading-relaxed">
                                        The device authenticates via IMEI over MQTT (TLS). It will appear{" "}
                                        <strong>Offline</strong> until the first ping is received. The DC operator
                                        assigns it to a trip during dispatch — not to a specific truck.
                                    </p>
                                </div>
 
                            </FieldGroup>
                        </FieldSet>
                    </FieldGroup>
                </div>


                <SheetFooter className="flex flex-col sm:flex-row gap-2 items-center w-full border-t border-gray-200">
                    <Button className='w-full sm:w-1/2 bg-maroon hover:bg-maroon-dark'>Register <Cpu /></Button>
                    <SheetClose className='basis-1/2' asChild>
                        <Button className="w-full" variant="outline">Cancel</Button>
                    </SheetClose>
                </SheetFooter>
 
                {/* <SheetFooter className="flex flex-row items-center w-full border-t border-gray-200">
                    <Button className="basis-1/2 bg-maroon hover:bg-maroon-dark">
                        Register <Cpu className="ml-1" size={15} />
                    </Button>
                    <SheetClose className="basis-1/2" asChild>
                        <Button className="w-full" variant="outline">Cancel</Button>
                    </SheetClose>
                </SheetFooter> */}
            </SheetContent>
        </Sheet>
    )
}