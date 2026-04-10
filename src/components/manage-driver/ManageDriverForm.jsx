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
        import { BookUser } from "lucide-react"
        import {
            Field,
            FieldGroup,
            FieldLabel,
            FieldSet,
        } from "@/components/ui/field"
        import CreateFormSheetTrigger from "../CreateFormSheetTrigger"
        import { useForm } from "react-hook-form"
        import { useEffect, useState } from "react"
        import { LICENCE_CLASSES } from "@/constants/constant"
        import { toast } from "sonner"


        export default function ManageDriverForm({ onAddDriver }) {
            const [open, setOpen] = useState(false)

            const {
                register,
                handleSubmit,
                reset,
                setValue,
                watch,
                formState: { isSubmitSuccessful },
            } = useForm({
                defaultValues: {
                    full_name: "",
                    phone: "",
                    licence_no: "",
                    licence_class: "",
                    licence_expiry: "",
                },
            })

            const selectedClass = watch("licence_class")

            useEffect(() => {
                if (isSubmitSuccessful) {
                    reset()
                }
            }, [isSubmitSuccessful, reset])

            const onSubmit = (data) => {
                const nameParts = data.full_name.trim().split(" ")
                const first_name = nameParts[0] || ""
                const last_name = nameParts.slice(1).join(" ") || ""

                const newDriver = {
                    id: crypto.randomUUID(),
                    first_name,
                    last_name,
                    full_name: data.full_name,
                    phone_number: data.phone,
                    licence_no: data.licence_no,
                    licence_class: data.licence_class,
                    licence_expiry: data.licence_expiry,
                    current_trip: null,
                    total_trips: 0,
                    trips_this_month: 0,
                    driver_status: "Available",
                    createdAt: new Date().toISOString(),
                }

                onAddDriver(newDriver)

                toast.success("Driver added successfully", {
                    description: `${newDriver.full_name} has been created.`,
                    style: {
                    color: "green"
                }
                })
                reset()
                setOpen(false)
            }

            return (
                <Sheet direction="right" open={open} onOpenChange={setOpen}>
                    <CreateFormSheetTrigger text="Create Driver" />

                    <SheetContent className="w-full sm:max-w-md lg:max-w-lg bg-white p-0 flex flex-col h-full">
                        <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
                            <SheetHeader className="border-b border-gray-200">
                                <SheetTitle>Create new driver</SheetTitle>
                                <SheetDescription>
                                    Add driver details and licence information
                                </SheetDescription>
                            </SheetHeader>

                            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                                <FieldGroup>
                                    <FieldSet>
                                        <FieldGroup>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <Field>
                                                    <FieldLabel>Full name</FieldLabel>
                                                    <Input
                                                        {...register("full_name")}
                                                        placeholder="Ravi Deshmukh"
                                                        className="placeholder:text-sm text-sm sm:text-md"
                                                    />
                                                </Field>

                                                <Field>
                                                    <FieldLabel>Phone number</FieldLabel>
                                                    <Input
                                                        {...register("phone")}
                                                        placeholder="+91 98XXX XXXXX"
                                                        className="placeholder:text-sm text-sm sm:text-md"
                                                    />
                                                </Field>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <Field>
                                                    <FieldLabel>Licence number</FieldLabel>
                                                    <Input
                                                        {...register("licence_no")}
                                                        placeholder="MH1220190012345"
                                                        className="placeholder:text-sm text-sm sm:text-md"
                                                    />
                                                </Field>

                                                <Field>
                                                    <FieldLabel>Licence class</FieldLabel>
                                                    <Select
                                                        value={selectedClass}
                                                        onValueChange={(val) =>
                                                            setValue("licence_class", val)
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select class" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-white border shadow-md">
                                                            <SelectGroup>
                                                                <SelectLabel>Class</SelectLabel>
                                                                {LICENCE_CLASSES.map((c) => (
                                                                    <SelectItem key={c.type} value={c.type}>
                                                                        {c.full}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </Field>
                                            </div>

                                            <Field>
                                                <FieldLabel>Licence expiry</FieldLabel>
                                                <Input
                                                    {...register("licence_expiry")}
                                                    type="date"
                                                    className="text-xs"
                                                />
                                            </Field>
                                        </FieldGroup>
                                    </FieldSet>
                                </FieldGroup>
                            </div>

                            <SheetFooter className="flex flex-col sm:flex-row gap-2 items-center w-full border-t border-gray-200">
                                <Button
                                    type="submit"
                                    className="w-full sm:w-1/2 bg-maroon hover:bg-maroon-dark"
                                >
                                    Add Driver <BookUser />
                                </Button>

                                <SheetClose className="basis-1/2" asChild>
                                    <Button className="w-full" variant="outline">
                                        Cancel
                                    </Button>
                                </SheetClose>
                            </SheetFooter>
                        </form>
                    </SheetContent>
                </Sheet>
            )
        }