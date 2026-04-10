import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Eye, EyeOff, ShieldCheck } from "lucide-react"
import { useState } from "react"
 
function PasswordInput({ label, description, placeholder }) {
    const [show, setShow] = useState(false)
    return (
        <Field>
            <FieldLabel>{label}</FieldLabel>
            <div className="relative">
                <Input type={show ? "text" : "password"} placeholder={placeholder} className="pr-10 placeholder:text-sm text-sm sm:text-md"/>
                <button
                    type="button"
                    onClick={() => setShow(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
            </div>
            {description && <FieldDescription className="text-xs">{description}</FieldDescription>}
        </Field>
    )
}
 
export function PasswordSection() {
    return (
        <div>
            <div className="mb-6">
                <h2 className="text-base font-semibold">Change password</h2>
                <p className="text-sm text-gray-500 mt-0.5">Keep your account secure with a strong password</p>
            </div>
 
            {/* Requirements card — same bg-gray-50 border border-gray-100 rounded-lg style */}
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck size={14} className="text-maroon" />
                    <p className="text-xs font-semibold text-gray-600">Password requirements</p>
                </div>
                <ul className="flex flex-col gap-1">
                    {["Minimum 8 characters", "At least one uppercase letter", "At least one number", "At least one special character"].map(r => (
                        <li key={r} className="text-xs text-gray-500 flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-gray-400 shrink-0" />{r}
                        </li>
                    ))}
                </ul>
            </div>
 
            <FieldGroup>
                <FieldSet>
                    <FieldGroup>
                        <PasswordInput label="Current password" placeholder="Enter current password" />
                        <PasswordInput label="New password" placeholder="Enter new password" description="Must meet the requirements above" />
                        <PasswordInput label="Confirm new password" placeholder="Re-enter new password" />
                    </FieldGroup>
                </FieldSet>
            </FieldGroup>
 
            <div className="mt-6">
                <Button className="bg-maroon hover:bg-maroon-dark text-white">Update password</Button>
            </div>
        </div>
    )
}