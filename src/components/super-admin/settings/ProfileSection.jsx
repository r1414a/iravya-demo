import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Camera } from "lucide-react"
import { useRef } from "react"
 
export function ProfileSection() {
    const fileRef = useRef(null)
 
    return (
        <div>
            <div className="mb-6">
                <h2 className="text-base font-semibold">Profile</h2>
                <p className="text-sm text-gray-500 mt-0.5">Update your personal details and profile photo</p>
            </div>
 
            {/* Avatar upload */}
            <div className="flex gap-5 mb-4 pb-4 sm:mb-8 sm:pb-8 border-b border-gray-100">
                <div className="relative">
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gold flex items-center justify-center text-white text-2xl font-bold select-none">
                        SA
                    </div>
                </div>
                <div className="mt-2">
                    <p className="text-sm font-medium">Super Admin</p>
                    <p className="text-xs text-gray-400 mt-0.5">admin@fleettrack.in</p>
                </div>
            </div>
 
            {/* Form — same FieldGroup/FieldSet/Field pattern as AddDCForm */}
            <FieldGroup>
                <FieldSet>
                    <FieldGroup>
                        <div className="flex gap-3">
                            <Field>
                                <FieldLabel>First name</FieldLabel>
                                <Input defaultValue="Super" placeholder="First name" className="placeholder:text-sm text-sm sm:text-md"/>
                            </Field>
                            <Field>
                                <FieldLabel>Last name</FieldLabel>
                                <Input defaultValue="Admin" placeholder="Last name" className="placeholder:text-sm text-sm sm:text-md"/>
                            </Field>
                        </div>
                        <Field>
                            <FieldLabel>Email address</FieldLabel>
                            <Input type="email" defaultValue="admin@fleettrack.in" className="placeholder:text-sm text-sm sm:text-md"/>
                            <FieldDescription className="text-xs">Used to log in to the platform</FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel>Phone number</FieldLabel>
                            <Input type="tel" defaultValue="+91 98201 00000" placeholder="+91 XXXXX XXXXX" className="placeholder:text-sm text-sm sm:text-md"/>
                        </Field>
                    </FieldGroup>
                </FieldSet>
            </FieldGroup>
 
            <div className="mt-6">
                <Button className="w-full sm:w-fit bg-maroon hover:bg-maroon-dark text-white">Save profile</Button>
            </div>
        </div>
    )
}