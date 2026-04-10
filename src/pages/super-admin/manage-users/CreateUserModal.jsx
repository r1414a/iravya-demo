// CreateUserModal.jsx (Updated)
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
import { UserRound } from "lucide-react"
import { useState } from "react"
import CreateFormSheetTrigger from "@/components/CreateFormSheetTrigger"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const SCOPE_OPTIONS = {
    "dc_manager": ["Pune Warehouse DC", "Mumbai Warehouse DC", "Nashik DC", "Nagpur DC"],
    "store_manager": ["Koregaon Park Store", "Hinjawadi Store", "FC Road Store", "Baner Store", "Kothrud Store"],
}

const ROLE_HINT = {
    "dc_manager": "Can dispatch trips and manage trucks from their assigned DC",
    "store_manager": "Can track deliveries coming to their assigned store",
}

export default function CreateUserModal({ onAddUser }) {
    const [open, setOpen] = useState(false)
    
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            f_name: "",
            l_name: "",
            email: "",
            role: "",
            scope: ""
        }
    })

    async function handleCreateUser(data) {
        try {
            if (!data.f_name || !data.l_name || !data.email || !data.role) {
                toast.error("Please fill in all required fields")
                return
            }

            if ((data.role === "dc_manager" || data.role === "store_manager") && !data.scope) {
                toast.error("Please select a scope")
                return
            }

            const newUser = {
                id: crypto.randomUUID(),
                first_name: data.f_name,
                last_name: data.l_name,
                email: data.role === "driver" ? null : data.email,
                phone_number: data.role === "driver" ? data.email : `+91 ${Math.floor(Math.random() * 9000000000 + 1000000000)}`,
                role: data.role,
                scope: data.scope || null,
                last_login: null,
                user_status: "active",
                createdAt: new Date().toISOString(),
            }

            onAddUser(newUser)
            
            toast.success("User created successfully", {
                description: `${newUser.first_name} ${newUser.last_name} has been added.`,
            })

            reset()
            setOpen(false)
        } catch (err) {
            console.error("Error while creating new user", err)
            toast.error("Failed to create user")
        }
    }

    return (
        <Sheet direction="right" open={open} onOpenChange={setOpen}>
            <CreateFormSheetTrigger text={'Create User'} />

            <SheetContent className="bg-white flex flex-col h-full p-0">
                <form onSubmit={handleSubmit(handleCreateUser)} className="h-full flex flex-col">
                    <SheetHeader className="border-b border-gray-200 px-4 sm:px-6 pt-5 sm:pt-6 pb-4">
                        <SheetTitle>Create new user</SheetTitle>
                        <SheetDescription>Set role and scope for the new user</SheetDescription>
                    </SheetHeader>
                    
                    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
                        <FieldGroup>
                            <FieldSet>
                                <FieldGroup>
                                    <div className="flex gap-2">
                                        <Field>
                                            <FieldLabel htmlFor="f_name">First name <span className="text-red-500">*</span></FieldLabel>
                                            <Input
                                                id="f_name"
                                                type="text"
                                                {...register("f_name", { required: true })}
                                                placeholder="Rahul"
                                                className="placeholder:text-sm text-sm sm:text-md"
                                            />
                                        </Field>

                                        <Field>
                                            <FieldLabel htmlFor="l_name">Last name <span className="text-red-500">*</span></FieldLabel>
                                            <Input
                                                id="l_name"
                                                type="text"
                                                {...register("l_name", { required: true })}
                                                placeholder="Sharma"
                                                className="placeholder:text-sm text-sm sm:text-md"
                                            />
                                        </Field>
                                    </div>

                                    <Field>
                                        <FieldLabel htmlFor="email">Email address <span className="text-red-500">*</span></FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            {...register("email", { required: true })}
                                            placeholder="rahul.sharma@westside.com"
                                            className="placeholder:text-sm text-sm sm:text-md"
                                        />
                                        <FieldDescription className="text-xs">
                                            Invite will be sent to this email
                                        </FieldDescription>
                                    </Field>

                                    <Field>
                                        <FieldLabel>Role <span className="text-red-500">*</span></FieldLabel>
                                        <Select
                                            value={watch('role') || ""}
                                            onValueChange={(val) => setValue("role", val)}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a role..." />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border shadow-md">
                                                <SelectGroup>
                                                    <SelectLabel>Role</SelectLabel>
                                                    <SelectItem value="dc_manager">DC Operator</SelectItem>
                                                    <SelectItem value="store_manager">Store Manager</SelectItem>
                                                    <SelectItem value="driver">Driver</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {watch("role") && ROLE_HINT[watch("role")] && (
                                            <FieldDescription className="text-xs">
                                                {ROLE_HINT[watch("role")]}
                                            </FieldDescription>
                                        )}
                                    </Field>

                                    {(watch("role") === "dc_manager" || watch("role") === "store_manager") && (
                                        <Field>
                                            <FieldLabel>
                                                {watch("role") === "dc_manager" ? "Assigned DC" : "Assigned store"} <span className="text-red-500">*</span>
                                            </FieldLabel>
                                            <Select
                                                value={watch("scope") || ""}
                                                onValueChange={(val) => setValue("scope", val)}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder={`Select ${watch("role") === "dc_manager" ? "data center" : "store"}...`} />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white border shadow-md">
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            {watch("role") === "dc_manager" ? "Data Centers" : "Stores"}
                                                        </SelectLabel>
                                                        {(SCOPE_OPTIONS[watch("role")] ?? []).map((opt) => (
                                                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FieldDescription className="text-xs">
                                                {watch("role") === "dc_manager"
                                                    ? "User will only see trucks and trips from this DC"
                                                    : "User will only see deliveries coming to this store"}
                                            </FieldDescription>
                                        </Field>
                                    )}
                                </FieldGroup>
                            </FieldSet>
                        </FieldGroup>
                    </div>

                    <SheetFooter className="flex flex-col sm:flex-row gap-2 items-center w-full border-t border-gray-200 px-4 sm:px-6 py-4">
                        <Button type="submit" className='w-full sm:w-1/2 bg-maroon hover:bg-maroon-dark'>
                            Create User <UserRound />
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