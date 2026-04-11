// PasswordSection.jsx (Updated - Fully Functional)
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Eye, EyeOff, ShieldCheck, Check, X } from "lucide-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUser, updateUserPassword } from "@/lib/features/auth/authSlice"
import { toast } from "sonner"

function PasswordInput({ label, description, placeholder, value, onChange, name }) {
    const [show, setShow] = useState(false)
    return (
        <Field>
            <FieldLabel>{label}</FieldLabel>
            <div className="relative">
                <Input
                    type={show ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    name={name}
                    className="pr-10 placeholder:text-sm text-sm sm:text-md"
                />
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
    const dispatch = useDispatch()
    const { user } = useSelector(selectUser)

    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: "",
    })

    const handleChange = (e) => {
        setPasswords(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // Password validation rules
    const validations = {
        length: passwords.new.length >= 8,
        uppercase: /[A-Z]/.test(passwords.new),
        number: /[0-9]/.test(passwords.new),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(passwords.new),
    }

    const isPasswordValid = Object.values(validations).every(Boolean)

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validation
        if (!passwords.current || !passwords.new || !passwords.confirm) {
            toast.error("Please fill in all fields",{
                style: {
                    color: 'red'
                }
            })
            return
        }

        // Check current password (demo mode)
        if (user && passwords.current !== user.password) {
            toast.error("Current password is incorrect",{
                style: {
                    color: 'red'
                }
            })
            return
        }

        // Check password requirements
        if (!isPasswordValid) {
            toast.error("New password does not meet requirements",{
                style: {
                    color: 'red'
                }
            })
            return
        }

        // Check passwords match
        if (passwords.new !== passwords.confirm) {
            toast.error("New passwords do not match",{
                style: {
                    color: 'red'
                }
            })
            return
        }

        // Same as current
        if (passwords.new === passwords.current) {
            toast.error("New password must be different from current password",{
                style: {
                    color: 'red'
                }
            })
            return
        }

        // Update password in Redux
        dispatch(updateUserPassword(passwords.new))

        toast.success("Password updated successfully", {
            description: "Your password has been changed.",
            style: {
                color: 'green'
            }
        })

        // Reset form
        setPasswords({ current: "", new: "", confirm: "" })
    }

    const ValidationItem = ({ label, isValid }) => (
        <li className="text-xs text-gray-500 flex items-center gap-2">
            {isValid ? (
                <Check size={12} className="text-green-500 shrink-0" />
            ) : (
                <X size={12} className="text-gray-300 shrink-0" />
            )}
            <span className={isValid ? "text-green-600" : ""}>{label}</span>
        </li>
    )

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-base font-semibold">Change password</h2>
                <p className="text-sm text-gray-500 mt-0.5">Keep your account secure with a strong password</p>
            </div>

            {/* Requirements card */}
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck size={14} className="text-maroon" />
                    <p className="text-xs font-semibold text-gray-600">Password requirements</p>
                </div>
                <ul className="flex flex-col gap-1">
                    <ValidationItem label="Minimum 8 characters" isValid={validations.length} />
                    <ValidationItem label="At least one uppercase letter" isValid={validations.uppercase} />
                    <ValidationItem label="At least one number" isValid={validations.number} />
                    <ValidationItem label="At least one special character" isValid={validations.special} />
                </ul>
            </div>

            <form onSubmit={handleSubmit}>
                <FieldGroup>
                    <FieldSet>
                        <FieldGroup>
                            <PasswordInput
                                label="Current password"
                                placeholder="Enter current password"
                                name="current"
                                value={passwords.current}
                                onChange={handleChange}
                            />
                            <PasswordInput
                                label="New password"
                                placeholder="Enter new password"
                                description="Must meet the requirements above"
                                name="new"
                                value={passwords.new}
                                onChange={handleChange}
                            />
                            <PasswordInput
                                label="Confirm new password"
                                placeholder="Re-enter new password"
                                name="confirm"
                                value={passwords.confirm}
                                onChange={handleChange}
                            />
                        </FieldGroup>
                    </FieldSet>
                </FieldGroup>

                <div className="mt-6 flex gap-2">
                    <Button
                        type="submit"
                        className="bg-maroon hover:bg-maroon-dark text-white"
                    >
                        Update password
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setPasswords({ current: "", new: "", confirm: "" })}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    )
}


// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
// import { Eye, EyeOff, ShieldCheck } from "lucide-react"
// import { useState } from "react"
 
// function PasswordInput({ label, description, placeholder }) {
//     const [show, setShow] = useState(false)
//     return (
//         <Field>
//             <FieldLabel>{label}</FieldLabel>
//             <div className="relative">
//                 <Input type={show ? "text" : "password"} placeholder={placeholder} className="pr-10 placeholder:text-sm text-sm sm:text-md"/>
//                 <button
//                     type="button"
//                     onClick={() => setShow(s => !s)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                     {show ? <EyeOff size={15} /> : <Eye size={15} />}
//                 </button>
//             </div>
//             {description && <FieldDescription className="text-xs">{description}</FieldDescription>}
//         </Field>
//     )
// }
 
// export function PasswordSection() {
//     return (
//         <div>
//             <div className="mb-6">
//                 <h2 className="text-base font-semibold">Change password</h2>
//                 <p className="text-sm text-gray-500 mt-0.5">Keep your account secure with a strong password</p>
//             </div>
 
//             {/* Requirements card — same bg-gray-50 border border-gray-100 rounded-lg style */}
//             <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 mb-6">
//                 <div className="flex items-center gap-2 mb-2">
//                     <ShieldCheck size={14} className="text-maroon" />
//                     <p className="text-xs font-semibold text-gray-600">Password requirements</p>
//                 </div>
//                 <ul className="flex flex-col gap-1">
//                     {["Minimum 8 characters", "At least one uppercase letter", "At least one number", "At least one special character"].map(r => (
//                         <li key={r} className="text-xs text-gray-500 flex items-center gap-2">
//                             <span className="w-1 h-1 rounded-full bg-gray-400 shrink-0" />{r}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
 
//             <FieldGroup>
//                 <FieldSet>
//                     <FieldGroup>
//                         <PasswordInput label="Current password" placeholder="Enter current password" />
//                         <PasswordInput label="New password" placeholder="Enter new password" description="Must meet the requirements above" />
//                         <PasswordInput label="Confirm new password" placeholder="Re-enter new password" />
//                     </FieldGroup>
//                 </FieldSet>
//             </FieldGroup>
 
//             <div className="mt-6">
//                 <Button className="bg-maroon hover:bg-maroon-dark text-white">Update password</Button>
//             </div>
//         </div>
//     )
// }