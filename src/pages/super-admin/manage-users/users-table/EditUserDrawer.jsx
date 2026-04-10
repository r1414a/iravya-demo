import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetTrigger,
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
import {
    UserRound,
    KeyRound,
    Ban,
    Plus,
    CheckCircle2,
    Clock,
    Pencil,
} from "lucide-react"
import { useState } from "react"
import CreateFormSheetTrigger from "@/components/CreateFormSheetTrigger"
import { getNameInitials } from "@/lib/utils/getNameInitials"
import { ROLES, STATUS } from "@/constants/constant"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"


// ── Scope options per role ────────────────────────────────────────────────────
const SCOPE_OPTIONS = {
    "dc_manager": ["Pune Warehouse DC", "Mumbai Warehouse DC", "Nashik DC", "Nagpur DC"],
    "store_manager": ["Koregaon Park Store", "Hinjawadi Store", "FC Road Store", "Baner Store", "Kothrud Store"],
}

const ROLE_HINT = {
    "dc_manager": "Can dispatch trips and manage trucks from their assigned DC",
    "store_manager": "Can track deliveries coming to their assigned store",
}

export default function EditUserDrawer({ open, setOpen, selectedUser }) {
    if (!selectedUser) return null

    const {first_name, last_name, email, last_login, user_status} = selectedUser
    const [selectedRole, setSelectedRole] = useState(selectedUser?.role ?? "")
    const [showResetConfirm, setShowResetConfirm] = useState(false)

    // Keep local role in sync when a different row is clicked
    const role = selectedRole || selectedUser?.role || ""


    const showScope = role === "dc_manager" || role === "store_manager"

    const {
            register,
            handleSubmit,
            setValue,
            watch,
            formState: { errors }
        } = useForm({
            // resolver: zodResolver(createUserSchema),
            defaultValues: { first_name, last_name, email, role, user_status}
        })
    

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="bg-white w-full max-w-full sm:max-w-md lg:max-w-lg flex flex-col h-full p-0">
            <form className="h-full flex flex-col">
                {/* ── Header — same border-b border-gray-200 style ── */}
                <SheetHeader className="px-4 sm:px-6 pt-5 sm:pt-6 pb-4 border-b border-gray-200">
                    <SheetTitle className="text-base sm:text-lg">Edit user</SheetTitle>
                    <SheetDescription className="text-xs sm:text-sm truncate">
                        {selectedUser.email}
                    </SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto">

                    {/* ── User identity card — same bg-gray-100 rounded-md style as your draft ── */}
                    <div className="px-4 sm:px-6 pt-4">
                        <div className="flex flex-col sm:flex-row gap-3 p-3 sm:p-4 bg-gray-100 rounded-md sm:items-start">

                            <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-white font-bold text-sm sm:text-lg shrink-0">
                                {getNameInitials(first_name, last_name)}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h2 className="text-sm sm:text-base font-semibold truncate">
                                    {first_name}
                                </h2>
                                <p className="text-[10px] sm:text-xs text-muted-foreground truncate">
                                    {email}
                                </p>

                                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                    <span className={`${ROLES[role].color} inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium border`}>
                                        {ROLES[role].text}
                                    </span>
                                    <span className={`${STATUS[user_status].color} inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium border`}>
                                        {user_status}
                                    </span>
                                </div>
                            </div>

                            <div className="text-left sm:text-right shrink-0">
                                <p className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider">
                                    Last login
                                </p>
                                <p className="text-xs font-medium text-gray-600 mt-0.5">
                                    {selectedUser.lastLogin}
                                </p>
                                <p className="text-[10px] text-gray-400">
                                    {selectedUser.loginDate}
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className="px-4 sm:px-6 py-4 flex-1">
                        <FieldGroup>
                            <FieldSet>
                                <FieldGroup>

                                    {/* Name */}
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

                                    {/* Email */}
                                    <Field>
                                        <FieldLabel>Email address</FieldLabel>
                                        <Input
                                            type="email"
                                            {...register("email")}
                                            placeholder="user@brand.com"
                                            className="placeholder:text-sm text-sm sm:text-md"
                                        />
                                    </Field>

                                    {/* Role */}
                                    <Field>
                                        <FieldLabel>Role</FieldLabel>
                                        <Select
                                            defaultValue={role}
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
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                        {role && (
                                            <FieldDescription className="text-xs wrap-break-words">
                                                {ROLE_HINT[role]}
                                            </FieldDescription>
                                        )}
                                    </Field>

                                    {/* Scope */}
                                    {showScope && (
                                        <Field>
                                            <FieldLabel>
                                                {role === "dc_manager" ? "Assigned DC" : "Assigned store"}
                                            </FieldLabel>

                                            <Select defaultValue={selectedUser.scope}>
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


                                    {/* Status */}
                                    <Field>
                                        <FieldLabel>Status</FieldLabel>
                                        <Select defaultValue={user_status}>
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

                                    {/* Account actions */}
                                    <div className="pt-2">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                            Account actions
                                        </p>

                                        {/* Reset */}
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
                                                variant="outline"
                                                size="sm"
                                                className="w-full sm:w-auto text-xs"
                                                onClick={() => setShowResetConfirm(!showResetConfirm)}
                                            >
                                                Reset
                                            </Button>
                                        </div>

                                        {/* Reset confirm */}
                                        {showResetConfirm && (
                                            <div className="mb-2 px-3 py-2.5 bg-blue-50 border border-blue-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                                <p className="text-xs text-blue-700 wrap-break-words">
                                                    Send reset link to <span className="font-medium">{selectedUser.email}</span>?
                                                </p>

                                                <div className="flex gap-2 w-full sm:w-auto">
                                                    <Button size="sm" className="w-1/2 sm:w-auto bg-maroon hover:bg-maroon-dark text-white text-xs h-7">
                                                        Send link
                                                    </Button>
                                                    <Button
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

                                        {/* Deactivate */}
                                        {/* <div className={`flex flex-col sm:flex-row items-start justify-between gap-3 p-3 rounded-lg border ${selectedUser.status === "active"
                                        ? "border-red-200 bg-red-50"
                                        : "border-green-200 bg-green-50"
                                        }`}>
                                        <div className="flex items-start gap-2">
                                            <Ban size={14} className={`mt-0.5 shrink-0 ${selectedUser.status === "active" ? "text-red-500" : "text-green-600"}`} />
                                            <div>
                                                <p className={`text-sm font-medium ${selectedUser.status === "active" ? "text-red-700" : "text-green-700"}`}>
                                                    {selectedUser.status === "active" ? "Deactivate account" : "Reactivate account"}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {selectedUser.status === "active"
                                                        ? "User will immediately lose access to the platform"
                                                        : "User will regain access to the platform"}
                                                </p>
                                            </div>
                                        </div>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setShowDeactivate(!showDeactivate)}
                                            className={`w-full sm:w-auto text-xs ${selectedUser.status === "active"
                                                ? "text-red-600 border-red-300 hover:bg-red-100"
                                                : "text-green-600 border-green-300 hover:bg-green-100"
                                                }`}
                                        >
                                            {selectedUser.status === "active" ? "Deactivate" : "Reactivate"}
                                        </Button>
                                    </div> */}

                                        {/* Deactivate confirm */}
                                        {/* {showDeactivate && (
                                        <div className="mt-2 px-3 py-2.5 bg-red-50 border border-red-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                            <p className="text-xs text-red-700 break-words">
                                                {selectedUser.status === "active"
                                                    ? `Deactivate ${selectedUser.name}? They will lose access immediately.`
                                                    : `Reactivate ${selectedUser.name}? They will regain access immediately.`}
                                            </p>

                                            <div className="flex gap-2 w-full sm:w-auto">
                                                <Button
                                                    size="sm"
                                                    className={`w-1/2 sm:w-auto text-white text-xs h-7 ${selectedUser.status === "active"
                                                        ? "bg-red-600 hover:bg-red-700"
                                                        : "bg-green-600 hover:bg-green-700"
                                                        }`}
                                                >
                                                    Confirm
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="w-1/2 sm:w-auto text-xs h-7"
                                                    onClick={() => setShowDeactivate(false)}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    )} */}
                                    </div>

                                </FieldGroup>
                            </FieldSet>
                        </FieldGroup>
                    </div>

                </div>
                {/* ── Footer — only shown on details tab ── */}

                <SheetFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center w-full border-t border-gray-200 px-4 sm:px-6 py-4">
                    <Button className="w-full sm:basis-1/2 bg-maroon hover:bg-maroon-dark">
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