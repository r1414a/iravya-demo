// ProfileSection.jsx (Updated - Fully Functional)
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Camera } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUser, updateUserProfile } from "@/lib/features/auth/authSlice"
import { toast } from "sonner"

export function ProfileSection() {
    const fileRef = useRef(null)
    const dispatch = useDispatch()
    const { user } = useSelector(selectUser)

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        avatar: null,
    })

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                email: user.email || "",
                phone: user.phone || "",
                avatar: user.avatar || null,
            })
        }
    }, [user])

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatar: reader.result }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validation
        if (!formData.first_name || !formData.last_name) {
            toast.error("Please fill in all required fields", {
                style: {
                    color: 'red'
                }
            })
            return
        }

        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error("Please enter a valid email address", {
                style: {
                    color: 'red'
                }
            })
            return
        }

        // Update Redux state
        dispatch(updateUserProfile(formData))

        toast.success("Profile updated successfully", {
            description: "Your changes have been saved.",
            style: {
                color: 'green'
            }
        })
    }

    const getInitials = () => {
        if (!user) return "SA"
        return `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase()
    }

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
            {/* <div className="flex gap-5 mb-4 pb-4 sm:mb-8 sm:pb-8 border-b border-gray-100">
                <div className="relative">
                    {formData.avatar ? (
                        <img
                            src={formData.avatar}
                            alt="Profile"
                            className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gold flex items-center justify-center text-white text-2xl font-bold select-none">
                            {getInitials()}
                        </div>
                    )}

                    <button
                        onClick={() => fileRef.current?.click()}
                        className="absolute bottom-0 right-0 bg-maroon hover:bg-maroon-dark text-white p-1.5 rounded-full shadow-md transition-colors"
                    >
                        <Camera size={12} />
                    </button>

                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                    />
                </div>

                <div className="mt-2">
                    <p className="text-sm font-medium">
                        {formData.firstName} {formData.lastName}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{formData.email}</p>
                    <button
                        onClick={() => fileRef.current?.click()}
                        className="text-xs text-maroon hover:underline mt-1"
                    >
                        Change photo
                    </button>
                </div>
            </div> */}

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <FieldGroup>
                    <FieldSet>
                        <FieldGroup>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Field>
                                    <FieldLabel>
                                        First name <span className="text-red-500">*</span>
                                    </FieldLabel>
                                    <Input
                                        value={formData.first_name}
                                        onChange={(e) => handleChange("first_name", e.target.value)}
                                        placeholder="First name"
                                        className="placeholder:text-sm text-sm sm:text-md"
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>
                                        Last name <span className="text-red-500">*</span>
                                    </FieldLabel>
                                    <Input
                                        value={formData.last_name}
                                        onChange={(e) => handleChange("last_name", e.target.value)}
                                        placeholder="Last name"
                                        className="placeholder:text-sm text-sm sm:text-md"
                                    />
                                </Field>
                            </div>

                            <Field>
                                <FieldLabel>
                                    Email address <span className="text-red-500">*</span>
                                </FieldLabel>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    className="placeholder:text-sm text-sm sm:text-md"
                                />
                                <FieldDescription className="text-xs">
                                    Used to log in to the platform
                                </FieldDescription>
                            </Field>

                            <Field>
                                <FieldLabel>Phone number</FieldLabel>
                                <Input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                    placeholder="+91 XXXXX XXXXX"
                                    className="placeholder:text-sm text-sm sm:text-md"
                                />
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                </FieldGroup>

                <div className="mt-6 flex gap-2">
                    <Button
                        type="submit"
                        className="w-full sm:w-fit bg-maroon hover:bg-maroon-dark text-white"
                    >
                        Save profile
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                            if (user) {
                                setFormData({
                                    first_name: user.first_name || "",
                                    last_name: user.last_name || "",
                                    email: user.email || "",
                                    phone: user.phone || "",
                                    avatar: user.avatar || null,
                                })
                            }
                        }}
                        className="w-full sm:w-fit"
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
// import { Camera } from "lucide-react"
// import { useRef } from "react"
 
// export function ProfileSection() {
//     const fileRef = useRef(null)
 
//     return (
//         <div>
//             <div className="mb-6">
//                 <h2 className="text-base font-semibold">Profile</h2>
//                 <p className="text-sm text-gray-500 mt-0.5">Update your personal details and profile photo</p>
//             </div>
 
//             {/* Avatar upload */}
//             <div className="flex gap-5 mb-4 pb-4 sm:mb-8 sm:pb-8 border-b border-gray-100">
//                 <div className="relative">
//                     <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gold flex items-center justify-center text-white text-2xl font-bold select-none">
//                         SA
//                     </div>
//                 </div>
//                 <div className="mt-2">
//                     <p className="text-sm font-medium">Super Admin</p>
//                     <p className="text-xs text-gray-400 mt-0.5">admin@fleettrack.in</p>
//                 </div>
//             </div>
 
//             {/* Form — same FieldGroup/FieldSet/Field pattern as AddDCForm */}
//             <FieldGroup>
//                 <FieldSet>
//                     <FieldGroup>
//                         <div className="flex gap-3">
//                             <Field>
//                                 <FieldLabel>First name</FieldLabel>
//                                 <Input defaultValue="Super" placeholder="First name" className="placeholder:text-sm text-sm sm:text-md"/>
//                             </Field>
//                             <Field>
//                                 <FieldLabel>Last name</FieldLabel>
//                                 <Input defaultValue="Admin" placeholder="Last name" className="placeholder:text-sm text-sm sm:text-md"/>
//                             </Field>
//                         </div>
//                         <Field>
//                             <FieldLabel>Email address</FieldLabel>
//                             <Input type="email" defaultValue="admin@fleettrack.in" className="placeholder:text-sm text-sm sm:text-md"/>
//                             <FieldDescription className="text-xs">Used to log in to the platform</FieldDescription>
//                         </Field>
//                         <Field>
//                             <FieldLabel>Phone number</FieldLabel>
//                             <Input type="tel" defaultValue="+91 98201 00000" placeholder="+91 XXXXX XXXXX" className="placeholder:text-sm text-sm sm:text-md"/>
//                         </Field>
//                     </FieldGroup>
//                 </FieldSet>
//             </FieldGroup>
 
//             <div className="mt-6">
//                 <Button className="w-full sm:w-fit bg-maroon hover:bg-maroon-dark text-white">Save profile</Button>
//             </div>
//         </div>
//     )
// }