// EditUserDrawer.jsx (Updated)
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { UserRound, KeyRound } from "lucide-react"
import { useEffect, useState } from "react"
import { getNameInitials } from "@/lib/utils/getNameInitials"
import { ROLES, STATUS } from "@/constants/constant"
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

export default function EditUserDrawer({ open, setOpen, selectedUser, onEditUser }) {
    if (!selectedUser) return null

    const [showResetConfirm, setShowResetConfirm] = useState(false)
    const [selectedRole, setSelectedRole] = useState(selectedUser?.role ?? "")

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset: resetForm
    } = useForm({
        defaultValues: {
            first_name: selectedUser.first_name,
            last_name: selectedUser.last_name,
            email: selectedUser.email,
            role: selectedUser.role,
            scope: selectedUser.scope,
            user_status: selectedUser.user_status
        }
    })

    useEffect(() => {
        if (selectedUser) {
            setValue("first_name", selectedUser.first_name)
            setValue("last_name", selectedUser.last_name)
            setValue("email", selectedUser.email)
            setValue("role", selectedUser.role)
            setValue("scope", selectedUser.scope)
            setValue("user_status", selectedUser.user_status)
            setSelectedRole(selectedUser.role)
        }
    }, [selectedUser, setValue])

    const role = selectedRole || selectedUser?.role || ""
    const showScope = role === "dc_manager" || role === "store_manager"

    const onSubmit = (data) => {
        try {
            const updatedUser = {
                ...selectedUser,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                role: selectedRole,
                scope: data.scope,
                user_status: data.user_status,
            }

            onEditUser(updatedUser)
            
            toast.success("User updated successfully", {
                description: `${updatedUser.first_name} ${updatedUser.last_name} has been updated.`,
            })

            setOpen(false)
        } catch (err) {
            console.error(err)
            toast.error("Failed to update user")
        }
    }

    const handleResetPassword = () => {
        toast.success("Password reset link sent", {
            description: `Reset link sent to ${selectedUser.email}`,
        })
        setShowResetConfirm(false)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="bg-white w-full max-w-full sm:max-w-md lg:max-w-lg flex flex-col h-full p-0">
                <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
                    <SheetHeader className="px-4 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-gray-200">
                        <SheetTitle className="text-base sm:text-lg">Edit user</SheetTitle>
                        <SheetDescription className="text-xs sm:text-sm truncate">
                            {selectedUser.email || selectedUser.phone_number}
                        </SheetDescription>
                    </SheetHeader>
                    
                    <div className="flex-1 overflow-y-auto">
                        <div className="px-4 sm:px-6 pt-4">
                            <div className="flex flex-col sm:flex-row gap-3 p-3 sm:p-4 bg-gray-100 rounded-md sm:items-start">
                                <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-white font-bold text-sm sm:text-lg shrink-0">
                                    {getNameInitials(selectedUser.first_name, selectedUser.last_name)}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h2 className="text-sm sm:text-base font-semibold truncate">
                                        {selectedUser.first_name} {selectedUser.last_name}
                                    </h2>
                                    <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                                        {selectedUser.email || selectedUser.phone_number}
                                    </p>

                                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                        <span className={`${ROLES[role]?.color || ''} inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium border`}>
                                            {ROLES[role]?.text || role}
                                        </span>
                                        <span className={`${STATUS[selectedUser.user_status]?.color || ''} inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium border`}>
                                            {STATUS[selectedUser.user_status]?.text || selectedUser.user_status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-4 sm:px-6 py-4 flex-1">
                            <FieldGroup>
                                <FieldSet>
                                    <FieldGroup>
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <Field>
                                                <FieldLabel>First name</FieldLabel>
                                                <Input
                                                    {...register("first_name")}
                                                    placeholder="First name"
                                                    className="placeholder:text-sm text-sm sm:text-md"
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel>Last name</FieldLabel>
                                                <Input
                                                    {...register("last_name")}
                                                    placeholder="Last name"
                                                    className="placeholder:text-sm text-sm sm:text-md"
                                                />
                                            </Field>
                                        </div>

                                        {selectedUser.role !== 'driver' && (
                                            <Field>
                                                <FieldLabel>Email address</FieldLabel>
                                                <Input
                                                    type="email"
                                                    {...register("email")}
                                                    placeholder="user@brand.com"
                                                    className="placeholder:text-sm text-sm sm:text-md"
                                                />
                                            </Field>
                                        )}

                                        <Field>
                                            <FieldLabel>Role</FieldLabel>
                                            <Select
                                                value={selectedRole}
                                                onValueChange={(val) => setSelectedRole(val)}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a role..." />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white border shadow-md">
                                                    <SelectGroup>
                                                        <SelectLabel>Role</SelectLabel>
                                                        <SelectItem value="dc_manager">DC Manager</SelectItem>
                                                        <SelectItem value="store_manager">Store Manager</SelectItem>
                                                        <SelectItem value="driver">Driver</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>

                                            {role && ROLE_HINT[role] && (
                                                <FieldDescription className="text-xs wrap-break-words">
                                                    {ROLE_HINT[role]}
                                                </FieldDescription>
                                            )}
                                        </Field>

                                        {showScope && (
                                            <Field>
                                                <FieldLabel>
                                                    {role === "dc_manager" ? "Assigned DC" : "Assigned store"}
                                                </FieldLabel>

                                                <Select 
                                                    value={watch("scope") || ""}
                                                    onValueChange={(val) => setValue("scope", val)}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder={`Select ${role === "dc_manager" ? "data center" : "store"}...`} />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white border shadow-md">
                                                        <SelectGroup>
                                                            <SelectLabel>
                                                                {role === "dc_manager" ? "Data Centers" : "Stores"}
                                                            </SelectLabel>
                                                            {(SCOPE_OPTIONS[role] ?? []).map((opt) => (
                                                                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>

                                                <FieldDescription className="text-xs wrap-break-words">
                                                    {role === "dc_manager"
                                                        ? "User will only see trucks and trips from this DC"
                                                        : "User will only see deliveries coming to this store"}
                                                </FieldDescription>
                                            </Field>
                                        )}

                                        <Field>
                                            <FieldLabel>Status</FieldLabel>
                                            <Select 
                                                value={watch("user_status") || "active"}
                                                onValueChange={(val) => setValue("user_status", val)}
                                            >
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
                                            <FieldDescription className="text-xs">
                                                Inactive users cannot log in or access any data until reactivated
                                            </FieldDescription>
                                        </Field>

                                        {selectedUser.role !== 'driver' && (
                                            <div className="pt-2">
                                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                                    Account actions
                                                </p>

                                                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50 mb-2">
                                                    <div className="flex items-start gap-2">
                                                        <KeyRound size={14} className="text-gray-500 mt-0.5 shrink-0" />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-700">Reset password</p>
                                                            <p className="text-xs text-gray-400 mt-0.5 wrap-break-words">
                                                                Send a password reset link to {selectedUser.email}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full sm:w-auto text-xs"
                                                        onClick={() => setShowResetConfirm(!showResetConfirm)}
                                                    >
                                                        Reset
                                                    </Button>
                                                </div>

                                                {showResetConfirm && (
                                                    <div className="mb-2 px-3 py-2.5 bg-blue-50 border border-blue-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                                        <p className="text-xs text-blue-700 wrap-break-words">
                                                            Send reset link to <span className="font-medium">{selectedUser.email}</span>?
                                                        </p>

                                                        <div className="flex gap-2 w-full sm:w-auto">
                                                            <Button 
                                                                type="button"
                                                                size="sm" 
                                                                className="w-1/2 sm:w-auto bg-maroon hover:bg-maroon-dark text-white text-xs h-7"
                                                                onClick={handleResetPassword}
                                                            >
                                                                Send link
                                                            </Button>
                                                            <Button
                                                                type="button"
                                                                size="sm"
                                                                variant="outline"
                                                                className="w-1/2 sm:w-auto text-xs h-7"
                                                                onClick={() => setShowResetConfirm(false)}
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </FieldGroup>
                                </FieldSet>
                            </FieldGroup>
                        </div>
                    </div>

                    <SheetFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center w-full border-t border-gray-200 px-4 sm:px-6 py-4">
                        <Button type="submit" className="w-full sm:basis-1/2 bg-maroon hover:bg-maroon-dark">
                            Save changes <UserRound className="ml-1" size={15} />
                        </Button>

                        <SheetClose className="w-full sm:basis-1/2" asChild>
                            <Button className="w-full" variant="outline">Cancel</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}