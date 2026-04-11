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
    import { Warehouse, Ban } from "lucide-react"
    import { useState, useEffect } from "react"
    import { useUpdateDcMutation } from "@/lib/features/dcs/dcApi"
    import { useForm } from "react-hook-form" 

    export default function EditDCDrawer({ dc, open, onClose }) {
        if (!dc) return null
    // console.log(dc);

        const {dc_name, city,} = dc
    
    
        const [updateDc, { isLoading }] = useUpdateDcMutation()
        
            const {
                register,
                handleSubmit,
                reset,
                control,
                setValue,
                watch,
                formState: { errors, isSubmitSuccessful },
            } = useForm({
                defaultValues: {
                    name: "",
                    city: "",
                    state: "Maharashtra",
                    address: "",
                    contact_name: "",
                    contact_phone: "",
                    contact_email: "",
                    status: "active",
                },
            })
        
        
            useEffect(() => {
                if (isSubmitSuccessful) {
                    reset();
                    // onClose?.(false)
                }
            }, [isSubmitSuccessful, reset]);
        
            const onSubmit = async (data) => {
                try {
                    console.log(data);
                    
                    await addDc(data).unwrap();
                } catch (err) {
                    console.error(err);
        
                }
            }
    
        return (
            <Sheet open={open} onOpenChange={(v) => { onClose(v); setShowDeactivateConfirm(false) }}>
                <SheetContent className="w-full sm:max-w-md lg:max-w-lg bg-white p-0 flex flex-col">
    
                    <SheetHeader className="border-b border-gray-200">
                        <SheetTitle>Edit warehouse</SheetTitle>
                        <SheetDescription>{dc.dc_name} · {dc.city}</SheetDescription>
                    </SheetHeader>
    
                    <div className="flex-1 overflow-y-auto px-3 pb-3 sm:p-4">
                        <FieldGroup>
                            <FieldSet>
                                <FieldGroup>
    
                                    {/* Brand */}
                                    {/* <Field>
                                        <FieldLabel>Brand <span className="text-red-500">*</span></FieldLabel>
                                        <Select defaultValue={dc.brand}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border shadow-md">
                                                <SelectGroup>
                                                    <SelectLabel>Brands</SelectLabel>
                                                    <SelectItem value="Tata Westside">Tata Westside</SelectItem>
                                                    <SelectItem value="Zudio">Zudio</SelectItem>
                                                    <SelectItem value="Tata Cliq">Tata Cliq</SelectItem>
                                                    <SelectItem value="Tanishq">Tanishq</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FieldDescription className="text-xs">
                                            This DC will only manage trucks and trips for this brand
                                        </FieldDescription>
                                    </Field> */}
    
                                    {/* DC name + city */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <Field>
                                            <FieldLabel>DC name <span className="text-red-500">*</span></FieldLabel>
                                            <Input
                                                defaultValue={dc.name}
                                                placeholder="e.g. Pune Warehouse DC"
                                                className="placeholder:text-sm text-sm sm:text-md"
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel>City <span className="text-red-500">*</span></FieldLabel>
                                            <Select defaultValue={dc.city}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue />
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
                                        </Field>
                                    </div>
    
                                    {/* Full address */}
                                    <Field>
                                        <FieldLabel>Full address <span className="text-red-500">*</span></FieldLabel>
                                        <Input
                                            defaultValue={dc.address}
                                            placeholder="Plot no., area, pincode"
                                            className="placeholder:text-sm text-sm sm:text-md"
                                        />
                                        <FieldDescription className="text-xs">
                                            Used to geocode the DC location on the map
                                        </FieldDescription>
                                    </Field>
    
                                    {/* Operator contact */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <Field>
                                            <FieldLabel>Operator name</FieldLabel>
                                            <Input
                                                defaultValue={dc.contactName}
                                                placeholder="e.g. Suresh Pawar"
                                                className="placeholder:text-sm text-sm sm:text-md"
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel>Operator phone</FieldLabel>
                                            <Input
                                                defaultValue={dc.contactPhone}
                                                placeholder="+91 98XXX XXXXX"
                                                className="placeholder:text-sm text-sm sm:text-md"
                                            />
                                        </Field>
                                    </div>
    
                                    <Field>
                                        <FieldLabel>Operator email</FieldLabel>
                                        <Input
                                            type="email"
                                            defaultValue={dc.contactEmail}
                                            placeholder="operator@brand.com"
                                            className="placeholder:text-sm text-sm sm:text-md"
                                        />
                                        <FieldDescription className="text-xs">
                                            The user account linked to this DC operator
                                        </FieldDescription>
                                    </Field>
    
                                    {/* Status */}
                                    <Field>
                                        <FieldLabel>Status</FieldLabel>
                                        <Select defaultValue={dc.status}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border shadow-md">
                                                <SelectGroup>
                                                    <SelectLabel>Status</SelectLabel>
                                                    <SelectItem value="active">Active</SelectItem>
                                                    <SelectItem value="inactive">Inactive</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FieldDescription className="text-xs">
                                            Inactive DCs cannot dispatch new trips
                                        </FieldDescription>
                                    </Field>
    
                                    {/* Danger zone — same red/green card as EditUserDrawer */}
                                    {/* <div className="pt-2">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                            Danger zone
                                        </p>
    
                                        <div className={`flex items-start justify-between gap-4 p-3 rounded-lg border ${
                                            isActive
                                                ? "border-red-200 bg-red-50"
                                                : "border-green-200 bg-green-50"
                                        }`}>
                                            <div className="flex items-start gap-2">
                                                <Ban size={14} className={`mt-0.5 shrink-0 ${isActive ? "text-red-500" : "text-green-600"}`} />
                                                <div>
                                                    <p className={`text-sm font-medium ${isActive ? "text-red-700" : "text-green-700"}`}>
                                                        {isActive ? "Deactivate this DC" : "Reactivate this DC"}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        {isActive
                                                            ? "No new trips can be dispatched from this DC"
                                                            : "DC will be able to dispatch trips again"
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setShowDeactivateConfirm(!showDeactivateConfirm)}
                                                className={`shrink-0 text-xs ${
                                                    isActive
                                                        ? "text-red-600 border-red-300 hover:bg-red-100"
                                                        : "text-green-600 border-green-300 hover:bg-green-100"
                                                }`}
                                            >
                                                {isActive ? "Deactivate" : "Reactivate"}
                                            </Button>
                                        </div>
    
                                        {showDeactivateConfirm && (
                                            <div className={`mt-2 px-3 py-2.5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                                                isActive ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
                                            }`}>
                                                <p className={`text-xs ${isActive ? "text-red-700" : "text-green-700"}`}>
                                                    {isActive
                                                        ? `Deactivate ${dc.name}? Operators will not be able to dispatch new trips.`
                                                        : `Reactivate ${dc.name}? It will resume normal operations.`
                                                    }
                                                </p>
                                                <div className="flex gap-2 shrink-0">
                                                    <Button
                                                        size="sm"
                                                        className={`text-white text-xs h-7 ${
                                                            isActive
                                                                ? "bg-red-600 hover:bg-red-700"
                                                                : "bg-green-600 hover:bg-green-700"
                                                        }`}
                                                    >
                                                        Confirm
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="text-xs h-7"
                                                        onClick={() => setShowDeactivateConfirm(false)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </div> */}
    
                                </FieldGroup>
                            </FieldSet>
                        </FieldGroup>
                    </div>
    
                    {/* Footer — same sm:flex-row pattern as AddDCForm */}
                    <SheetFooter className="flex flex-col sm:flex-row gap-2 items-center w-full border-t border-gray-200">
                        <Button className="w-full sm:w-1/2 bg-maroon hover:bg-maroon-dark">
                            Save changes <Warehouse className="ml-1" size={15} />
                        </Button>
                        <SheetClose className="w-full sm:w-1/2" asChild>
                            <Button className="w-full" variant="outline">Cancel</Button>
                        </SheetClose>
                    </SheetFooter>
    
                </SheetContent>
            </Sheet>
        )
    }