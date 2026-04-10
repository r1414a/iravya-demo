// AddGPSDeviceModal.jsx (Updated)
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
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
import { Cpu } from "lucide-react"
import CreateFormSheetTrigger from "../CreateFormSheetTrigger"
import { toast } from "sonner"

export default function AddGPSDeviceModal({
    onAdd,
    onEdit,
    editingDevice = null,
    open,
    setOpen,
}) {
    const isEdit = !!editingDevice

    const [form, setForm] = useState({
        deviceId: "",
        imei: "",
        simNo: "",
        firmware: "",
        homeDC: "",
        installDate: "",
    })

    useEffect(() => {
        if (editingDevice && open) {
            setForm({
                deviceId: editingDevice.deviceId,
                imei: editingDevice.imei,
                simNo: editingDevice.simNo,
                firmware: editingDevice.firmware,
                homeDC: editingDevice.homeDC,
                installDate: editingDevice.installDate,
            })
        }
    }, [editingDevice, open])

    const handleChange = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    const resetForm = () => {
        setForm({
            deviceId: "",
            imei: "",
            simNo: "",
            firmware: "",
            homeDC: "",
            installDate: "",
        })
    }

    const handleSubmit = () => {
        if (!form.deviceId || !form.imei) {
            toast.error("Please fill in required fields",{
                style: {
                    color: 'red'
                }
            })
            return
        }

        if (isEdit) {
            const updated = { ...editingDevice, ...form }
            onEdit(updated)

            toast.success("Device updated successfully", {
                description: `${updated.deviceId} has been updated.`,
                style: {
                    color: "green"
                }
            })
        } else {
            const newDevice = {
                id: crypto.randomUUID(),
                ...form,
                deviceId: form.deviceId.toUpperCase(),
                brand: null,
                status: "available",
                currentTripId: null,
                currentTruckReg: null,
                currentDriverName: null,
                currentStoreId: null,
                currentStoreName: null,
                battery: 100,
                signalStrength: 0,
                lastPing: "Never",
                lastPingDate: "—",
                totalTrips: 0,
                tripsThisMonth: 0,
                location: "DC shelf",
            }

            onAdd(newDevice)

            toast.success("Device registered successfully", {
                description: `${newDevice.deviceId} has been added.`,
                style: {
                    color: "green"
                }
            }
        )
            
            resetForm()
        }

        setOpen(false)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            {!isEdit && <CreateFormSheetTrigger text="Register Device" />}

            <SheetContent className="w-full sm:max-w-md lg:max-w-lg bg-white p-0 flex flex-col">
                <SheetHeader className="border-b border-gray-200 px-4 sm:px-6 pt-5 sm:pt-6 pb-4">
                    <SheetTitle>
                        {isEdit ? "Edit GPS device" : "Register GPS device"}
                    </SheetTitle>
                    <SheetDescription>
                        {isEdit ? "Update device details" : "Add a new tracking device"}
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
                    <FieldGroup>
                        <FieldSet>
                            <FieldGroup>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <Field>
                                        <FieldLabel>Device ID <span className="text-red-500">*</span></FieldLabel>
                                        <Input
                                            value={form.deviceId}
                                            onChange={(e) => handleChange("deviceId", e.target.value)}
                                            placeholder="GPS-006-PUNE" 
                                            className="font-mono uppercase placeholder:text-sm text-sm sm:text-md"
                                        />
                                    </Field>

                                    <Field>
                                        <FieldLabel>IMEI <span className="text-red-500">*</span></FieldLabel>
                                        <Input
                                            value={form.imei}
                                            maxLength={15}
                                            onChange={(e) => handleChange("imei", e.target.value)}
                                            placeholder="15-digit IMEI" 
                                            className="font-mono placeholder:text-sm text-sm sm:text-md"
                                        />
                                    </Field>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <Field>
                                        <FieldLabel>SIM</FieldLabel>
                                        <Input
                                            value={form.simNo}
                                            onChange={(e) => handleChange("simNo", e.target.value)}
                                            placeholder="9833012345" 
                                            className="font-mono placeholder:text-sm text-sm sm:text-md"
                                        />
                                    </Field>

                                    <Field>
                                        <FieldLabel>Firmware</FieldLabel>
                                        <Select
                                            value={form.firmware}
                                            onValueChange={(val) => handleChange("firmware", val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select..." />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border shadow-md">
                                                <SelectGroup>
                                                    <SelectLabel>Version</SelectLabel>
                                                    <SelectItem value="v2.4.1">v2.4.1</SelectItem>
                                                    <SelectItem value="v2.4.0">v2.4.0</SelectItem>
                                                    <SelectItem value="v2.3.8">v2.3.8</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>
                                </div>

                                <Field>
                                    <FieldLabel>Assign DC</FieldLabel>
                                    <Select
                                        value={form.homeDC}
                                        onValueChange={(val) => handleChange("homeDC", val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select DC" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border shadow-md">
                                            <SelectGroup>
                                                <SelectLabel>Warehouses</SelectLabel>
                                                <SelectItem value="Pune Warehouse DC">
                                                    Pune Warehouse DC
                                                </SelectItem>
                                                <SelectItem value="Mumbai Warehouse DC">
                                                    Mumbai Warehouse DC
                                                </SelectItem>
                                                <SelectItem value="Nashik DC">
                                                    Nashik DC
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FieldDescription className="text-xs">
                                        Device will appear in this DC's inventory as available
                                    </FieldDescription>
                                </Field>

                                <Field>
                                    <FieldLabel>Install date</FieldLabel>
                                    <Input
                                        type="date"
                                        value={form.installDate}
                                        onChange={(e) => handleChange("installDate", e.target.value)}
                                        className="placeholder:text-sm text-sm sm:text-md"
                                    />
                                    <FieldDescription className="text-xs">
                                        Leave blank to use today's date
                                    </FieldDescription>
                                </Field>

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

                <SheetFooter className="border-t px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-2">
                    <Button
                        onClick={handleSubmit}
                        className="w-full sm:w-1/2 bg-maroon hover:bg-maroon-dark"
                    >
                        {editingDevice ? "Update" : "Register"} <Cpu />
                    </Button>

                    <SheetClose asChild>
                        <Button variant="outline" className="w-full sm:w-1/2">
                            Cancel
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}