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
import {
    Truck,
    Upload,
    FileText,
    ShieldCheck,
    AlertTriangle,
    ExternalLink,
    Wind,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"
import CreateFormSheetTrigger from "../CreateFormSheetTrigger"
import { useForm } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

// ── Helpers ─────────────────────────────────────────────────────────────
const formatDisplayExpiry = (dateStr) => {
    if (!dateStr) return ""
    const date = new Date(dateStr)
    if (Number.isNaN(date.getTime())) return dateStr

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

const getDocStatus = (expiry) => {
    if (!expiry) return "valid"

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const expDate = new Date(expiry)
    expDate.setHours(0, 0, 0, 0)

    const diffDays = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "expired"
    if (diffDays <= 30) return "expiring"
    return "valid"
}

const createFileDocObject = (file, expiry = "") => {
    if (!file) return null

    return {
        name: file.name,
        size: `${(file.size / 1024).toFixed(0)} KB`,
        file,
        url: URL.createObjectURL(file),
        expiry: formatDisplayExpiry(expiry),
        rawExpiry: expiry,
        status: getDocStatus(expiry),
    }
}

const createExistingDocObject = (doc, expiry = "") => {
    if (!doc) return null

    return {
        name: doc.name || "Document.pdf",
        size: doc.size || "0 KB",
        url: doc.url || "#",
        expiry: doc.expiry || formatDisplayExpiry(expiry),
        rawExpiry: doc.rawExpiry || expiry || "",
        status: doc.status || getDocStatus(expiry),
        file: doc.file || null,
    }
}

// ── Dummy docs for old trucks when editing ─────────────────────────────
const mockDocs = {
    registration_cert: {
        name: "RC_MH12AB1234.pdf",
        size: "318 KB",
        expiry: "28 Dec 2026",
        rawExpiry: "2026-12-28",
        status: "valid",
        url: "#",
    },
    insurance_doc: {
        name: "Insurance_2024.pdf",
        size: "512 KB",
        expiry: "18 May 2026",
        rawExpiry: "2026-05-18",
        status: "expiring",
        url: "#",
    },
    PUC_cert: {
        name: "PUC_Mar2025.pdf",
        size: "128 KB",
        expiry: "10 Jan 2026",
        rawExpiry: "2026-01-10",
        status: "expired",
        url: "#",
    },
}

// ── Document status config ──────────────────────────────────────────────
const docStatusConfig = {
    valid: {
        color: "text-green-600",
        bg: "bg-green-50 border-green-200",
        label: "Valid",
    },
    expiring: {
        color: "text-amber-600",
        bg: "bg-amber-50 border-amber-200",
        label: "Expiring soon",
    },
    expired: {
        color: "text-red-600",
        bg: "bg-red-50 border-red-200",
        label: "Expired",
    },
    missing: {
        color: "text-gray-400",
        bg: "bg-gray-50 border-dashed border-gray-200",
        label: "Not uploaded",
    },
}

// ── Document icons ──────────────────────────────────────────────────────
const docIcons = {
    registration_cert: <FileText size={15} />,
    insurance_doc: <ShieldCheck size={15} />,
    PUC_cert: <Wind size={15} />,
}

const docLabels = {
    registration_cert: "RC",
    insurance_doc: "Insurance",
    PUC_cert: "PUC",
}

// ── Single Document Row ─────────────────────────────────────────────────
function DocRow({ docKey, doc, onChange }) {
    const inputRef = useRef(null)

    const normalizedDoc =
        doc instanceof File
            ? {
                  name: doc.name,
                  size: `${(doc.size / 1024).toFixed(0)} KB`,
                  status: "valid",
                  expiry: null,
                  url: null,
              }
            : doc && typeof doc === "object"
            ? doc
            : null

    const cfg = docStatusConfig[normalizedDoc?.status ?? "missing"]
    const displayName = normalizedDoc?.name ?? null
    const displaySize = normalizedDoc?.size ?? ""

    return (
        <div
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border ${cfg.bg} transition-colors`}
        >
            <span className={`shrink-0 ${cfg.color}`}>
                {docIcons[docKey]}
            </span>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                    <p className="text-xs sm:text-sm font-medium text-gray-800">
                        {docLabels[docKey]}
                    </p>

                    {normalizedDoc?.expiry && (
                        <span
                            className={`text-[8px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                                normalizedDoc.status === "expiring"
                                    ? "bg-amber-100 text-amber-700"
                                    : normalizedDoc.status === "expired"
                                    ? "bg-red-100 text-red-600"
                                    : "bg-green-100 text-green-700"
                            }`}
                        >
                            {normalizedDoc.status === "expiring" ? "⚠ " : ""}
                            Exp {normalizedDoc.expiry}
                        </span>
                    )}
                </div>

                {displayName ? (
                    <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                        {displayName} {displaySize ? `· ${displaySize}` : ""}
                    </p>
                ) : (
                    <p className="text-xs text-gray-400 italic">
                        No file uploaded
                    </p>
                )}
            </div>

            <div className="flex items-center sm:gap-1 shrink-0">
                {normalizedDoc?.url && normalizedDoc?.url !== "#" && (
                    <a
                        href={normalizedDoc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded hover:bg-white/60 text-gray-400 hover:text-gray-700 transition-colors"
                    >
                        <ExternalLink size={13} />
                    </a>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0] ?? null
                        onChange?.(file)
                    }}
                />

                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="p-1.5 rounded hover:bg-white/60 text-gray-400 hover:text-gray-700 transition-colors"
                    title={displayName ? "Replace" : "Upload"}
                >
                    <Upload size={13} />
                </button>
            </div>
        </div>
    )
}

// ── Main Component ───────────────────────────────────────────────────────
export default function AddTruckModal({
    truck = null,
    open,
    onClose,
    onAddTruck,
    onEditTruck,
}) {
    const getInitialDocs = (truckData = null) => {
        if (!truckData) {
            return {
                registration_cert: null,
                insurance_doc: null,
                PUC_cert: null,
            }
        }

        return {
            registration_cert: truckData?.registration_cert
                ? createExistingDocObject(
                      truckData.registration_cert,
                      truckData.rc_expiry
                  )
                : mockDocs.registration_cert,

            insurance_doc: truckData?.insurance_doc
                ? createExistingDocObject(
                      truckData.insurance_doc,
                      truckData.insurance_expiry
                  )
                : mockDocs.insurance_doc,

            PUC_cert: truckData?.PUC_cert
                ? createExistingDocObject(
                      truckData.PUC_cert,
                      truckData.puc_expiry
                  )
                : mockDocs.PUC_cert,
        }
    }

    const [docs, setDocs] = useState(getInitialDocs(truck))

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
    } = useForm({
        defaultValues: {
            registration_no: truck?.registration_no || "",
            model: truck?.model || "",
            type: truck?.type || "",
            capacity: truck?.capacity || "",
            rc_expiry: truck?.rc_expiry || "",
            insurance_expiry: truck?.insurance_expiry || "",
            puc_expiry: truck?.puc_expiry || "",
        },
    })

    const selectedType = watch("type")
    const rcExpiry = watch("rc_expiry")
    const insuranceExpiry = watch("insurance_expiry")
    const pucExpiry = watch("puc_expiry")

    // ── Reset form + docs whenever truck or open changes ─────────────────
    useEffect(() => {
        setDocs(getInitialDocs(truck))

        reset({
            registration_no: truck?.registration_no || "",
            model: truck?.model || "",
            type: truck?.type || "",
            capacity: truck?.capacity || "",
            rc_expiry:
                truck?.rc_expiry || truck?.registration_cert?.rawExpiry || "",
            insurance_expiry:
                truck?.insurance_expiry || truck?.insurance_doc?.rawExpiry || "",
            puc_expiry:
                truck?.puc_expiry || truck?.PUC_cert?.rawExpiry || "",
        })
    }, [truck, open, reset])

    // ── Update doc expiry/status live ────────────────────────────────────
    useEffect(() => {
        setDocs((prev) => ({
            ...prev,
            registration_cert: prev.registration_cert
                ? {
                      ...prev.registration_cert,
                      expiry: formatDisplayExpiry(rcExpiry),
                      rawExpiry: rcExpiry,
                      status: getDocStatus(rcExpiry),
                  }
                : prev.registration_cert,
            insurance_doc: prev.insurance_doc
                ? {
                      ...prev.insurance_doc,
                      expiry: formatDisplayExpiry(insuranceExpiry),
                      rawExpiry: insuranceExpiry,
                      status: getDocStatus(insuranceExpiry),
                  }
                : prev.insurance_doc,
            PUC_cert: prev.PUC_cert
                ? {
                      ...prev.PUC_cert,
                      expiry: formatDisplayExpiry(pucExpiry),
                      rawExpiry: pucExpiry,
                      status: getDocStatus(pucExpiry),
                  }
                : prev.PUC_cert,
        }))
    }, [rcExpiry, insuranceExpiry, pucExpiry])

    const handleDocChange = (key, file, expiry) => {
        setDocs((prev) => ({
            ...prev,
            [key]: file ? createFileDocObject(file, expiry) : null,
        }))
    }

    const onSubmit = async (data) => {
        try {
            if (truck) {
                const updatedTruck = {
                    ...truck,
                    registration_no: data.registration_no.toUpperCase().trim(),
                    model: data.model,
                    type: data.type,
                    capacity: data.capacity,
                    rc_expiry: data.rc_expiry || "",
                    insurance_expiry: data.insurance_expiry || "",
                    puc_expiry: data.puc_expiry || "",
                    registration_cert: docs.registration_cert,
                    insurance_doc: docs.insurance_doc,
                    PUC_cert: docs.PUC_cert,
                }

                onEditTruck(updatedTruck)

                toast.success("Truck updated successfully", {
                    description: `${updatedTruck.registration_no} has been updated.`,
                })
            } else {
                const newTruck = {
                    id: crypto.randomUUID(),
                    registration_no: data.registration_no.toUpperCase().trim(),
                    model: data.model,
                    type: data.type,
                    capacity: data.capacity,
                    total_trips: 0,
                    tripsThisMonth: 0,
                    lastTrip: "Never",
                    lastTripDate: "—",
                    status: "idle",
                    createdAt: new Date().toISOString(),

                    rc_expiry: data.rc_expiry || "",
                    insurance_expiry: data.insurance_expiry || "",
                    puc_expiry: data.puc_expiry || "",
                    registration_cert: docs.registration_cert,
                    insurance_doc: docs.insurance_doc,
                    PUC_cert: docs.PUC_cert,
                }

                onAddTruck(newTruck)

                toast.success("Truck added successfully", {
                    description: `${newTruck.registration_no} has been created.`,
                })

                reset({
                    registration_no: "",
                    model: "",
                    type: "",
                    capacity: "",
                    rc_expiry: "",
                    insurance_expiry: "",
                    puc_expiry: "",
                })

                setDocs({
                    registration_cert: null,
                    insurance_doc: null,
                    PUC_cert: null,
                })
            }

            onClose?.(false)
        } catch (err) {
            console.error(err)
            toast.error("Failed to save truck", {
                description: err.message || "Please try again",
            })
        }
    }

    return (
        <Sheet direction="right" open={open} onOpenChange={onClose}>
            {!truck && <CreateFormSheetTrigger text="Add Truck" />}

            <SheetContent className="w-full sm:max-w-md lg:max-w-lg bg-white p-0 flex flex-col">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="h-full flex flex-col"
                >
                    <SheetHeader className="border-b border-gray-200">
                        <SheetTitle>
                            {truck ? "Edit truck" : "Add a truck"}
                        </SheetTitle>
                        <SheetDescription>
                            {truck
                                ? "Update truck details and documents"
                                : "Register a new truck with all required details"}
                        </SheetDescription>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                        <FieldGroup>
                            <FieldSet>
                                <FieldGroup>
                                    <div className="flex gap-2">
                                        <Field>
                                            <FieldLabel>Registration no.</FieldLabel>
                                            <Input
                                                {...register("registration_no")}
                                                placeholder="MH12AB1234"
                                                className="font-mono uppercase text-sm sm:text-md placeholder:text-sm"
                                                required
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel>Make &amp; model</FieldLabel>
                                            <Input
                                                {...register("model")}
                                                className="placeholder:text-sm text-sm sm:text-md"
                                                placeholder="Tata 407"
                                            />
                                        </Field>
                                    </div>

                                    <div className="flex gap-2">
                                        <Field>
                                            <FieldLabel>Truck type</FieldLabel>
                                            <Select
                                                value={selectedType}
                                                onValueChange={(val) =>
                                                    setValue("type", val)
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white border shadow-md">
                                                    <SelectGroup>
                                                        <SelectLabel>Type</SelectLabel>
                                                        <SelectItem value="mini_truck">
                                                            Mini truck
                                                        </SelectItem>
                                                        <SelectItem value="medium">
                                                            Medium
                                                        </SelectItem>
                                                        <SelectItem value="heavy">
                                                            Heavy
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </Field>

                                        <Field>
                                            <FieldLabel>
                                                Capacity (in tons)
                                            </FieldLabel>
                                            <Input
                                                {...register("capacity")}
                                                className="placeholder:text-sm text-sm sm:text-md"
                                                placeholder="e.g. 4"
                                            />
                                        </Field>
                                    </div>

                                    {truck && (
                                        <FieldGroup>
                                            <Field orientation="horizontal">
                                                <Checkbox
                                                    id="maintenance-checkbox"
                                                    name="maintenance-checkbox"
                                                />
                                                <FieldLabel htmlFor="maintenance-checkbox">
                                                    Mark as maintenance
                                                </FieldLabel>
                                            </Field>
                                        </FieldGroup>
                                    )}

                                    {/* ── Documents Section ───────────────── */}
                                    <div className="pt-2">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <FileText
                                                    size={14}
                                                    className="text-gray-400"
                                                />
                                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                    Vehicle documents
                                                </p>
                                            </div>

                                            {truck && Object.values(docs).some(
                                                (d) =>
                                                    !d ||
                                                    ["expiring", "expired"].includes(
                                                        d?.status
                                                    )
                                            ) && (
                                                <span className="flex items-center gap-1 text-[11px] text-amber-600 font-medium">
                                                    <AlertTriangle size={11} />
                                                    Action needed
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            {/* RC */}
                                            <div className="space-y-2">
                                                <DocRow
                                                    docKey="registration_cert"
                                                    doc={docs.registration_cert}
                                                    onChange={(file) =>
                                                        handleDocChange(
                                                            "registration_cert",
                                                            file,
                                                            rcExpiry
                                                        )
                                                    }
                                                />
                                                <Field>
                                                    <FieldLabel>
                                                        Registration expiry
                                                    </FieldLabel>
                                                    <Input
                                                        {...register("rc_expiry")}
                                                        type="date"
                                                        className="text-xs"
                                                    />
                                                </Field>
                                            </div>

                                            {/* Insurance */}
                                            <div className="space-y-2">
                                                <DocRow
                                                    docKey="insurance_doc"
                                                    doc={docs.insurance_doc}
                                                    onChange={(file) =>
                                                        handleDocChange(
                                                            "insurance_doc",
                                                            file,
                                                            insuranceExpiry
                                                        )
                                                    }
                                                />
                                                <Field>
                                                    <FieldLabel>
                                                        Insurance expiry
                                                    </FieldLabel>
                                                    <Input
                                                        {...register(
                                                            "insurance_expiry"
                                                        )}
                                                        type="date"
                                                        className="text-xs"
                                                    />
                                                </Field>
                                            </div>

                                            {/* PUC */}
                                            <div className="space-y-2">
                                                <DocRow
                                                    docKey="PUC_cert"
                                                    doc={docs.PUC_cert}
                                                    onChange={(file) =>
                                                        handleDocChange(
                                                            "PUC_cert",
                                                            file,
                                                            pucExpiry
                                                        )
                                                    }
                                                />
                                                <Field>
                                                    <FieldLabel>
                                                        PUC expiry
                                                    </FieldLabel>
                                                    <Input
                                                        {...register("puc_expiry")}
                                                        type="date"
                                                        className="text-xs"
                                                    />
                                                </Field>
                                            </div>
                                        </div>
                                    </div>
                                </FieldGroup>
                            </FieldSet>
                        </FieldGroup>
                    </div>

                    <SheetFooter className="flex flex-col sm:flex-row gap-2 items-center w-full border-t border-gray-200">
                        <Button
                            type="submit"
                            className="w-full sm:w-1/2 bg-maroon hover:bg-maroon-dark"
                        >
                            {truck ? "Save changes" : "Add Truck"} <Truck />
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