    // AddDcForm.jsx (Updated)
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
    import { Warehouse } from "lucide-react"
    import CreateFormSheetTrigger from "@/components/CreateFormSheetTrigger"
    import { Controller, useForm } from "react-hook-form"
    import { useEffect } from "react"
    import { toast } from "sonner"

    export default function AddDCForm({ dc = null, open, onClose, onAddDC, onEditDC }) {
        const {
            register,
            handleSubmit,
            reset,
            control,
            setValue,
            watch,
            formState: { errors, isSubmitSuccessful }
        } = useForm({
            defaultValues: {
                name: dc?.dc_name || "",
                city: dc?.city || "",
                address: dc?.address || "",
                contact_name: dc?.dc_manager_name || "",
                contact_phone: dc?.dc_manager_phone || "",
                contact_email: dc?.dc_manager_email || "",
                status: dc?.status || "active",
            }
        })

        useEffect(() => {
            if (dc) {
                setValue("name", dc.dc_name)
                setValue("city", dc.city)
                setValue("address", dc.address)
                setValue("contact_name", dc.dc_manager_name)
                setValue("contact_phone", dc.dc_manager_phone)
                setValue("contact_email", dc.dc_manager_email)
                setValue("status", dc.status)
            }
        }, [dc, setValue])

        useEffect(() => {
            if (isSubmitSuccessful && !dc) {
                reset()
            }
        }, [isSubmitSuccessful, reset, dc])

        const selectedStatus = watch("status")

        const onSubmit = (data) => {
            try {
                if (dc) {
                    // Edit mode
                    const updatedDC = {
                        ...dc,
                        dc_name: data.name,
                        city: data.city,
                        address: data.address,
                        dc_manager_name: data.contact_name,
                        dc_manager_phone: data.contact_phone,
                        dc_manager_email: data.contact_email,
                        status: data.status,
                    }

                    onEditDC(updatedDC)
                    
                    toast.success("DC updated successfully", {
                        description: `${updatedDC.dc_name} has been updated.`,
                        style: {
                    color: "green"
                }
                    })
                } else {
                    // Add mode
                    const newDC = {
                        id: crypto.randomUUID(),
                        dc_name: data.name,
                        city: data.city,
                        address: data.address,
                        dc_manager_name: data.contact_name,
                        dc_manager_phone: data.contact_phone,
                        dc_manager_email: data.contact_email,
                        total_trucks: 0,
                        active_trucks: 0,
                        total_drivers: 0,
                        total_devices: 0,
                        active_devices: 0,
                        active_trips: 0,
                        total_trips: 0,
                        status: "active",
                        created_at: new Date().toISOString(),
                    }

                    onAddDC(newDC)
                    
                    toast.success("DC added successfully", {
                        description: `${newDC.dc_name} has been created.`,
                        style: {
                    color: "green"
                }
                    })
                    
                    reset()
                }
                
                onClose?.(false)
            } catch (err) {
                console.error(err)
                toast.error("Failed to save DC", {
                    description: err.message || "Please try again",
                    style: {
                        color: 'red'
                    }
                })
            }
        }

        return (
            <Sheet direction="right" open={open} onOpenChange={onClose}>
                {/* {!dc && <CreateFormSheetTrigger text='Add a DC' />} */}

                <SheetContent className="w-full sm:max-w-md lg:max-w-lg bg-white p-0 flex flex-col">
                    <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
                        <SheetHeader className="border-b border-gray-200">
                            <SheetTitle>{dc ? "Edit warehouse" : "Add new warehouse"}</SheetTitle>
                            <SheetDescription>
                                {dc ? "Update DC details and operator information" : "Register a new data center and assign an operator"}
                            </SheetDescription>
                        </SheetHeader>

                        <div className="flex-1 overflow-y-auto px-3 pb-3 sm:p-4">
                            <FieldGroup>
                                <FieldSet>
                                    <FieldGroup>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <Field>
                                                <FieldLabel>DC name <span className="text-red-500">*</span></FieldLabel>
                                                <Input
                                                    {...register("name", {
                                                        required: "DC name is required",
                                                    })}
                                                    placeholder="Pune DC"
                                                    className="placeholder:text-sm text-sm sm:text-md"
                                                />
                                                {errors.name && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.name.message}
                                                    </p>
                                                )}
                                            </Field>

                                            <Field>
                                                <FieldLabel>City <span className="text-red-500">*</span></FieldLabel>
                                                <Controller
                                                    name="city"
                                                    control={control}
                                                    rules={{ required: "City is required" }}
                                                    render={({ field }) => (
                                                        <Select value={field.value} onValueChange={field.onChange}>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select city..." />
                                                            </SelectTrigger>
                                                            <SelectContent className="bg-white border shadow-md">
                                                                <SelectGroup>
                                                                    <SelectLabel>Cities</SelectLabel>
                                                                    <SelectItem value="Pune">Pune</SelectItem>
                                                                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                                                                    <SelectItem value="Nashik">Nashik</SelectItem>
                                                                    <SelectItem value="Nagpur">Nagpur</SelectItem>
                                                                    <SelectItem value="Kolhapur">Kolhapur</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                                {errors.city && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.city.message}
                                                    </p>
                                                )}
                                            </Field>
                                        </div>

                                        <Field>
                                            <FieldLabel>Full address <span className="text-red-500">*</span></FieldLabel>
                                            <Input
                                                {...register("address", {
                                                    required: "Address is required",
                                                })}
                                                placeholder="Plot no., area, pincode"
                                                className="placeholder:text-sm text-sm sm:text-md"
                                            />
                                            <FieldDescription className="text-xs">
                                                Used to geocode the DC location on the map
                                            </FieldDescription>
                                            {errors.address && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.address.message}
                                                </p>
                                            )}
                                        </Field>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <Field>
                                                <FieldLabel>Operator name</FieldLabel>
                                                <Input
                                                    {...register("contact_name")}
                                                    placeholder="e.g. Suresh Pawar"
                                                    className="placeholder:text-sm text-sm sm:text-md"
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel>Operator phone</FieldLabel>
                                                <Input
                                                    {...register("contact_phone", {
                                                        pattern: {
                                                            value: /^[0-9+\-\s()]{10,15}$/,
                                                            message: "Enter a valid phone number",
                                                        },
                                                    })}
                                                    placeholder="+91 98XXX XXXXX"
                                                    className="placeholder:text-sm text-sm sm:text-md"
                                                />
                                                {errors.contact_phone && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.contact_phone.message}
                                                    </p>
                                                )}
                                            </Field>
                                        </div>

                                        <Field>
                                            <FieldLabel>Operator email</FieldLabel>
                                            <Input
                                                {...register("contact_email", {
                                                    pattern: {
                                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                        message: "Enter a valid email",
                                                    },
                                                })}
                                                type="email"
                                                placeholder="operator@brand.com"
                                                className="placeholder:text-sm text-sm sm:text-md"
                                            />
                                            <FieldDescription className="text-xs">
                                                A user account with DC operator role will be created for this email
                                            </FieldDescription>
                                            {errors.contact_email && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.contact_email.message}
                                                </p>
                                            )}
                                        </Field>

                                        {dc && (
                                            <Field>
                                                <FieldLabel>Status</FieldLabel>
                                                <Controller
                                                    name="status"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select value={field.value} onValueChange={field.onChange}>
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent className="bg-white border shadow-md">
                                                                <SelectGroup>
                                                                    <SelectLabel>Status</SelectLabel>
                                                                    <SelectItem value="active" className="text-sm">Active</SelectItem>
                                                                    <SelectItem value="inactive" className="text-sm">Inactive</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                                <FieldDescription className="text-xs">
                                                    Setting to inactive hides this DC from dispatch forms
                                                </FieldDescription>
                                            </Field>
                                        )}
                                    </FieldGroup>
                                </FieldSet>
                            </FieldGroup>
                        </div>

                        <SheetFooter className="flex flex-col sm:flex-row gap-2 items-center w-full border-t border-gray-200">
                            <Button type="submit" className='w-full sm:w-1/2 bg-maroon hover:bg-maroon-dark'>
                                {dc ? "Update Warehouse" : "Add Warehouse"} <Warehouse />
                            </Button>
                            <SheetClose className='basis-1/2' asChild>
                                <Button className="w-full" variant="outline">Cancel</Button>
                            </SheetClose>
                        </SheetFooter>
                    </form>
                </SheetContent>
            </Sheet>
        )
    }