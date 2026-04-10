// StoreForm.jsx (Updated)
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
import { Store, Pencil } from "lucide-react"
import { useEffect, useState } from "react"
import CreateFormSheetTrigger from "../CreateFormSheetTrigger"
import { toast } from "sonner"

export default function StoreForm({ mode, store, onAddStore, onEditStore }) {
    const isEdit = mode === "edit"
    const [open, setOpen] = useState(false)
    
    const [form, setForm] = useState({
        brand: store?.brand || "",
        name: store?.name || "",
        city: store?.city || "",
        address: store?.address || "",
        publicTrackingSlug: store?.publicTrackingSlug || "",
        managerName: store?.managerName || "",
        managerPhone: store?.managerPhone || "",
        managerEmail: store?.managerEmail || "",
        status: store?.status || "active"
    })

    useEffect(() => {
        if (store && isEdit) {
            setForm({
                brand: store.brand,
                name: store.name,
                city: store.city,
                address: store.address,
                publicTrackingSlug: store.publicTrackingSlug,
                managerName: store.managerName,
                managerPhone: store.managerPhone,
                managerEmail: store.managerEmail,
                status: store.status
            })
        }
    }, [store, isEdit])

    function handleFieldChange(name, value) {
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-")
    }

    const slug = generateSlug(form.name)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!form.brand || !form.name || !form.city || !form.address) {
            toast.error("Please fill in all required fields")
            return
        }

        try {
            if (isEdit) {
                const updatedStore = {
                    ...store,
                    brand: form.brand,
                    name: form.name,
                    city: form.city,
                    address: form.address,
                    publicTrackingSlug: slug,
                    managerName: form.managerName,
                    managerPhone: form.managerPhone,
                    managerEmail: form.managerEmail,
                    status: form.status,
                }

                onEditStore(updatedStore)
                
                toast.success("Store updated successfully", {
                    description: `${updatedStore.name} has been updated.`,
                })
            } else {
                const newStore = {
                    id: crypto.randomUUID(),
                    brand: form.brand,
                    name: form.name,
                    city: form.city,
                    address: form.address,
                    publicTrackingSlug: slug,
                    managerName: form.managerName,
                    managerPhone: form.managerPhone,
                    managerEmail: form.managerEmail,
                    deliveriesToday: 0,
                    totalDeliveries: 0,
                    currentDevices: [],
                    lastDelivery: "Never",
                    status: "active",
                    createdAt: new Date().toISOString(),
                }

                onAddStore(newStore)
                
                toast.success("Store added successfully", {
                    description: `${newStore.name} has been created.`,
                })

                // Reset form
                setForm({
                    brand: "",
                    name: "",
                    city: "",
                    address: "",
                    publicTrackingSlug: "",
                    managerName: "",
                    managerPhone: "",
                    managerEmail: "",
                    status: "active"
                })
            }
            
            setOpen(false)
        } catch (err) {
            console.error(err)
            toast.error("Failed to save store", {
                description: err.message || "Please try again"
            })
        }
    }

    return (
        <Sheet direction="right" open={open} onOpenChange={setOpen}>
            {isEdit ? (
                <SheetTrigger asChild>
                    <Button variant="outline" size="xs" className="hover:bg-maroon cursor-pointer hover:text-white">
                        <Pencil size={16} />
                    </Button>
                </SheetTrigger>
            ) : (
                <CreateFormSheetTrigger text={'Add Store'} />
            )}

            <SheetContent className="w-full sm:max-w-md lg:max-w-lg bg-white p-0 flex flex-col">
                <form onSubmit={handleSubmit} className="h-full flex flex-col">
                    <SheetHeader className="border-b border-gray-200">
                        <SheetTitle>{isEdit ? "Edit store" : "Add new store"}</SheetTitle>
                        <SheetDescription>
                            {isEdit
                                ? "Update store details and manager information"
                                : "Register a retail store and assign it to a brand"}
                        </SheetDescription>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                        <FieldGroup>
                            <FieldSet>
                                <FieldGroup>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <Field>
                                        <FieldLabel>Brand <span className="text-red-500">*</span></FieldLabel>
                                        <Select 
                                            value={form.brand} 
                                            onValueChange={(value) => handleFieldChange('brand', value)}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select brand..." />
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
                                    </Field>

                                    <Field>
                                            <FieldLabel>City <span className="text-red-500">*</span></FieldLabel>
                                            <Select 
                                                value={form.city} 
                                                onValueChange={(value) => handleFieldChange('city', value)}
                                            >
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
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </Field>
                                    </div>
                                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-3"> */}
                                        <Field className="sm:col-span-1">
                                            <FieldLabel>Store name <span className="text-red-500">*</span></FieldLabel>
                                            <Input
                                                name="name"
                                                placeholder="Westside — Koregaon Park"
                                                value={form.name}
                                                className="w-full placeholder:text-sm text-sm sm:text-md"
                                                onChange={({ target: { name, value } }) => handleFieldChange(name, value)}
                                            />
                                        </Field>
                                        
                                    {/* </div> */}

                                    <Field>
                                        <FieldLabel>Full address <span className="text-red-500">*</span></FieldLabel>
                                        <Input
                                            name="address"
                                            value={form.address}
                                            onChange={({ target: { name, value } }) => handleFieldChange(name, value)} 
                                            placeholder="Shop no., mall/building, area, pincode"
                                            className="placeholder:text-sm text-sm sm:text-md"
                                        />
                                        <FieldDescription className="text-xs">
                                            Used to place the store pin on the map and compute geofence
                                        </FieldDescription>
                                    </Field>

                                    {/* <Field>
                                        <FieldLabel>Public tracking URL slug</FieldLabel>
                                        <div className="flex items-center border rounded-md overflow-hidden">
                                            <span className="bg-gray-100 text-gray-500 text-xs px-3 py-2.5 border-r whitespace-nowrap">
                                                /track/
                                            </span>
                                            <Input
                                                className="border-0 rounded-none focus-visible:ring-0 font-mono text-sm placeholder:text-sm sm:text-md"
                                                value={slug}
                                                placeholder="auto-generated"
                                                readOnly
                                            />
                                        </div>
                                        <FieldDescription className="text-xs">
                                            Auto-generated from store name. Store can share this URL for public delivery tracking.
                                        </FieldDescription>
                                    </Field> */}

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <Field>
                                            <FieldLabel>Manager name</FieldLabel>
                                            <Input
                                                name="managerName"
                                                value={form.managerName}
                                                onChange={({ target: { name, value } }) => handleFieldChange(name, value)} 
                                                placeholder="e.g. Arjun Joshi" 
                                                className="placeholder:text-sm text-sm sm:text-md" 
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel>Manager phone</FieldLabel>
                                            <Input
                                                name="managerPhone"
                                                value={form.managerPhone}
                                                onChange={({ target: { name, value } }) => handleFieldChange(name, value)} 
                                                placeholder="+91 98XXX XXXXX" 
                                                className="placeholder:text-sm text-sm sm:text-md" 
                                            />
                                        </Field>
                                    </div>

                                    <Field>
                                        <FieldLabel>Manager email</FieldLabel>
                                        <Input
                                            name="managerEmail"
                                            value={form.managerEmail}
                                            onChange={({ target: { name, value } }) => handleFieldChange(name, value)}
                                            type="email" 
                                            placeholder="manager@brand.com" 
                                            className="placeholder:text-sm text-sm sm:text-md" 
                                        />
                                        <FieldDescription className="text-xs">
                                            A user account with store manager role will be created for this email
                                        </FieldDescription>
                                    </Field>

                                    {isEdit && (
                                        <Field>
                                            <FieldLabel>Status</FieldLabel>
                                            <Select 
                                                value={form.status}
                                                onValueChange={(value) => handleFieldChange('status', value)}
                                            >
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
                                                Inactive stores won't appear in new trip assignments.
                                            </FieldDescription>
                                        </Field>
                                    )}
                                </FieldGroup>
                            </FieldSet>
                        </FieldGroup>
                    </div>

                    <SheetFooter className="flex flex-col sm:flex-row gap-2 items-center w-full border-t border-gray-200">
                        <Button type="submit" className="w-full sm:w-1/2 bg-maroon hover:bg-maroon-dark">
                            {isEdit ? "Save Changes" : "Add Store"} <Store className="ml-1" size={15} />
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