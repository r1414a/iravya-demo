import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
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
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import { BookUser } from "lucide-react"
import { useForm } from "react-hook-form"
import { LICENCE_CLASSES } from "@/constants/constant"
import { format, parseISO } from "date-fns"
import { useEffect } from "react"

export default function EditDriverSheet({ driver, open, onClose, onEditDriver }) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
    } = useForm({
        defaultValues: {
            full_name: "",
            phone_number: "",
            licence_no: "",
            licence_class: "",
            licence_expiry: "",
            driver_status: "",
        },
    })

    useEffect(() => {
        if (driver) {
            reset({
                full_name: driver.full_name || "",
                phone_number: driver.phone_number || "",
                licence_no: driver.licence_no || "",
                licence_class: driver.licence_class || "",
                licence_expiry: driver.licence_expiry
                    ? format(parseISO(driver.licence_expiry), "yyyy-MM-dd")
                    : "",
                driver_status: driver.driver_status || "Available",
            })
        }
    }, [driver, reset])

    if (!driver) return null

    const selectedClass = watch("licence_class")
    const selectedStatus = watch("driver_status")

    const onSubmit = (data) => {
        const nameParts = data.full_name.trim().split(" ")
        const first_name = nameParts[0] || ""
        const last_name = nameParts.slice(1).join(" ") || ""

        const updatedDriver = {
            ...driver,
            first_name,
            last_name,
            full_name: data.full_name,
            phone_number: data.phone_number, // ✅ FIXED
            licence_no: data.licence_no,
            licence_class: data.licence_class,
            licence_expiry: data.licence_expiry,
            driver_status: data.driver_status,
        }

        onEditDriver(updatedDriver)
        onClose(false)
    }

    return (
        <Sheet open={open} onOpenChange={onClose} direction="right">
            <SheetContent className="w-full sm:max-w-md lg:max-w-lg bg-white p-0 flex flex-col">
                <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
                    <SheetHeader className="border-b border-gray-200">
                        <SheetTitle>Edit driver</SheetTitle>
                        <SheetDescription>
                            Update details for {driver.full_name}
                        </SheetDescription>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                        <FieldGroup>
                            <FieldSet>
                                <FieldGroup>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <Field>
                                            <FieldLabel>Full name</FieldLabel>
                                            <Input
                                                {...register("full_name")}
                                                placeholder="e.g. Ravi Deshmukh"
                                                className="text-sm"
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel>Phone number</FieldLabel>
                                            <Input
                                                {...register("phone_number")}
                                                placeholder="+91 98XXX XXXXX"
                                                className="text-sm"
                                            />
                                        </Field>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <Field>
                                            <FieldLabel>Licence number</FieldLabel>
                                            <Input
                                                {...register("licence_no")}
                                                className="font-mono text-sm"
                                                placeholder="MH1220190012345"
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel>Licence class</FieldLabel>
                                            <Select
                                                value={selectedClass}
                                                onValueChange={(val) => setValue("licence_class", val)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white border shadow-md text-sm">
                                                    <SelectGroup>
                                                        <SelectLabel>Class</SelectLabel>
                                                        {LICENCE_CLASSES.map((c) => (
                                                            <SelectItem key={c.type} value={c.type}>
                                                                {c.full}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </Field>
                                    </div>

                                    <Field>
                                        <FieldLabel>Licence expiry</FieldLabel>
                                        <Input type="date" className="text-sm" {...register("licence_expiry")} />
                                    </Field>

                                    <Field>
                                        <FieldLabel>Status</FieldLabel>
                                        <Select
                                            value={selectedStatus}
                                            onValueChange={(val) => setValue("driver_status", val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border shadow-md">
                                                <SelectGroup>
                                                    <SelectLabel>Status</SelectLabel>
                                                    <SelectItem value="Available" className="text-sm">Available</SelectItem>
                                                    <SelectItem value="On trip" className="text-sm">On trip</SelectItem>
                                                    <SelectItem value="Inactive" className="text-sm">Inactive</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FieldDescription className="text-xs">
                                            Setting to inactive hides this driver from dispatch forms
                                        </FieldDescription>
                                    </Field>

                                </FieldGroup>
                            </FieldSet>
                        </FieldGroup>
                    </div>

                    <SheetFooter className="flex flex-col sm:flex-row gap-2 items-center w-full border-t border-gray-200">
                        <Button type="submit" className="w-full sm:w-1/2 bg-maroon hover:bg-maroon-dark">
                            Save changes <BookUser />
                        </Button>
                        <SheetClose className="basis-1/2" asChild>
                            <Button className="w-full" variant="outline">Cancel</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}