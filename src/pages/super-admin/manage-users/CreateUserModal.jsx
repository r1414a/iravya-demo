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
import { Plus, UserRound } from "lucide-react"
import { useState } from "react"
import CreateFormSheetTrigger from "@/components/CreateFormSheetTrigger"
import { useForm } from "react-hook-form"
import { emailV, firstNameV, lastNameV, roleV } from "@/validations/validations"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateUserMutation } from "@/lib/features/users/userApi"

const SCOPE_OPTIONS = {
    "dc_manager": ["Pune Warehouse DC", "Mumbai Warehouse DC", "Nashik DC", "Nagpur DC"],
    "store_manager": ["Koregaon Park Store", "Hinjawadi Store", "FC Road Store", "Baner Store", "Kothrud Store"],
}

const ROLE_HINT = {
    "dc_manager": "Can dispatch trips and manage trucks from their assigned DC",
    "store_manager": "Can track deliveries coming to their assigned store",
}


const createUserSchema = z.object({
    f_name: firstNameV,
    l_name: lastNameV,
    email: emailV,
    role: roleV
})

export default function CreateUserModal() {
    // const [selectedRole, setSelectedRole] = useState("dc_manager");
    const [createUser, {isLoading, isError, error}] = useCreateUserMutation();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(createUserSchema)
    })


    async function handleCreateUser(data) {
        console.log(data);
        try{
            // const newUser = await createUser(data).unwrap();
            // console.log(newUser);

        }catch(err){
            console.error("Error while creating new user", err);
            
        }
        

    }
    return (
        <div>
            <Sheet direction="right" className="">
                <CreateFormSheetTrigger text={'Create User'} />

                <SheetContent className="bg-white flex flex-col h-full">
                    <form onSubmit={handleSubmit(handleCreateUser)} className="h-full flex flex-col">
                        <SheetHeader className="border-b border-gray-200">
                            <SheetTitle>Create new user</SheetTitle>
                            <SheetDescription>Set role and brand for created user</SheetDescription>
                        </SheetHeader>
                        <div className="pt-0 px-4 sm:p-4 flex-1 overflow-y-auto">
                            <FieldGroup>
                                <FieldSet>
                                    <FieldGroup>
                                        <div className="flex gap-2">
                                            <Field>
                                                <FieldLabel htmlFor="f_name">First name <span className="text-red-500">*</span></FieldLabel>
                                                <Input
                                                    id="f_name"
                                                    type="text"
                                                    {...register("f_name")}
                                                    placeholder="Rahul"
                                                    className="placeholder:text-sm text-sm sm:text-md"
                                                />
                                                {errors.f_name && (
                                                    <span className="text-red-500 text-[10px] mt-0.5 ml-1">{errors.f_name.message}</span>
                                                )}
                                            </Field>

                                            <Field>
                                                <FieldLabel htmlFor="l_name">Last name <span className="text-red-500">*</span></FieldLabel>
                                                <Input
                                                    id="l_name"
                                                    type="text"
                                                    {...register("l_name")}
                                                    placeholder="Sharma"
                                                    className="placeholder:text-sm text-sm sm:text-md"
                                                />
                                                {errors.l_name && (
                                                    <span className="text-red-500 text-[10px] mt-0.5 ml-1">{errors.l_name.message}</span>
                                                )}
                                            </Field>
                                        </div>

                                        <Field>
                                            <FieldLabel htmlFor="username">Email address <span className="text-red-500">*</span></FieldLabel>
                                            <Input
                                                id="email"
                                                type="email"
                                                {...register("email")}
                                                placeholder="rahul.sharma@westside.com"
                                                className="placeholder:text-sm text-sm sm:text-md"
                                            />
                                            <FieldDescription className="text-xs">
                                                Invite will be sent to this email
                                            </FieldDescription>

                                            {errors.email && (
                                                <span className="text-red-500 text-[10px] mt-0.5 ml-1">{errors.email.message}</span>
                                            )}
                                        </Field>


                                        <Field>
                                            <FieldLabel>Role <span className="text-red-500">*</span></FieldLabel>
                                            <Select
                                                value={watch('role') || ""}
                                                // {...register("role")}     
                                                // defaultValue="dc_manager"
                                                onValueChange={(val) => setValue("role", val)}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a role..." />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white border shadow-md">
                                                    <SelectGroup>
                                                        <SelectLabel>Role</SelectLabel>
                                                        {/* <SelectItem value="Brand manager">Brand Manager</SelectItem> */}
                                                        <SelectItem value="dc_manager">DC Operator</SelectItem>
                                                        <SelectItem value="store_manager">Store Manager</SelectItem>
                                                        <SelectItem value="driver">Driver</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            {watch("role") && (
                                                <FieldDescription className="text-xs">
                                                    {ROLE_HINT[watch("role")]}
                                                </FieldDescription>
                                            )}

                                            {errors.role && (
                                                <span className="text-red-500 text-[10px] mt-0.5 ml-1">{errors.role.message}</span>
                                            )}
                                        </Field>



                                        {/* Scope — only shown for dc_manager and Store manager */}
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


                        <SheetFooter className="flex flex-col sm:flex-row gap-2 items-center w-full border-t border-gray-200 p-4">
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
        </div>

    )
}