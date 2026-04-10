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
import { Plus, Route, X, GripVertical } from "lucide-react"
import { useState, useEffect } from "react"
import CreateFormSheetTrigger from "../CreateFormSheetTrigger"

// Stops are added dynamically and can be reordered
function StopsList({ stops, onRemove }) {
    if (stops.length === 0) return (
        <p className="text-xs text-gray-400 py-2">
            No stops added yet. Add at least one store.
        </p>
    )
    return (
        <div className="flex flex-col gap-2 mt-2">
            {stops.map((stop, index) => (
                <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-md px-3 py-2"
                >
                    <GripVertical size={14} className="text-gray-400 cursor-grab" />
                    <span className="text-xs font-medium text-gray-500 w-5">{index + 1}.</span>
                    <span className="text-xs flex-1">{stop}</span>
                    <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <X size={13} />
                    </button>
                </div>
            ))}
        </div>
    )
}

export default function CreateTripModal({ truck, open, onClose }) {

    const [driverAdded, setDriverAdded] = useState(false)
    const [aadharPreview, setAadharPreview] = useState(null)
    const [driverData, setDriverData] = useState({
        name: "",
        phone: "",
        aadhar: null,
    })
    const [truckNo, setTruckNo] = useState(truck?.regNo ?? "");
    const [gpsDevice, setGpsDevice] = useState(truck?.gpsDevice ?? "")
    const [otpSent, setOtpSent] = useState(false)
    const [otp, setOtp] = useState("")
    const [stops, setStops] = useState([])
    const [selectedStore, setSelectedStore] = useState("")
    const [selectedDriver, setSelectedDriver] = useState("")
    const [showAddDriver, setShowAddDriver] = useState(false)

    useEffect(() => {
        return () => {
            if (aadharPreview) URL.revokeObjectURL(aadharPreview)
        }
    }, [aadharPreview])

    const addStop = () => {
        if (selectedStore && !stops.includes(selectedStore)) {
            setStops(prev => [...prev, selectedStore])
            setSelectedStore("")
        }
    }

    const removeStop = (index) => {
        setStops(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <Sheet direction="right" open={open} onOpenChange={onClose}>
            {
                truck ?
                    null
                    :
                    <CreateFormSheetTrigger text='Dispatch Trip' />
              
            }


            <SheetContent className="w-full sm:max-w-md lg:max-w-lg bg-white p-0 flex flex-col">
                <SheetHeader className="border-b border-gray-200">
                    <SheetTitle>Dispatch new trip</SheetTitle>
                    <SheetDescription>
                        Select a truck, add store stops, and schedule departure
                    </SheetDescription>
                </SheetHeader>

                <div className="px-3 pb-3 sm:p-4 overflow-y-auto">
                    <FieldGroup>
                        <FieldSet>
                            <FieldGroup>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

                                    {/* Brand */}
                                    {/* <Field>
                                        <FieldLabel>Brand</FieldLabel>
                                        <Select>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select brand..." />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border shadow-md">
                                                <SelectGroup>
                                                    <SelectLabel>Brand</SelectLabel>
                                                    <SelectItem value="tata_westside">Tata Westside</SelectItem>
                                                    <SelectItem value="zudio">Zudio</SelectItem>
                                                    <SelectItem value="tata_cliq">Tata Cliq</SelectItem>
                                                    <SelectItem value="tanishq">Tanishq</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field> */}

                                    {/* Source DC */}

                                    {/* source dc will automatically comes from logged in account */}
                                    <Field>
                                        <FieldLabel>Source data center</FieldLabel>
                                        <p className="font-bold">Pune Warehouse DC</p>
                                    </Field>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {/* Truck */}
                                    <Field>
                                        <FieldLabel>Truck</FieldLabel>
                                        <Select value={truckNo} onValueChange={setTruckNo}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select idle truck..."/>
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border shadow-md">
                                                <SelectGroup>
                                                    <SelectLabel>Available trucks</SelectLabel>
                                                    <SelectItem value="MH04EF3344" className="text-xs">MH04EF3344</SelectItem>
                                                    <SelectItem value="MH14CD5678" className="text-xs">MH14CD5678</SelectItem>
                                                    <SelectItem value="MH20GH7788" className="text-xs">MH20GH7788</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FieldDescription className="text-xs">
                                            Only idle trucks are shown
                                        </FieldDescription>
                                    </Field>

                                    <Field>
                                        <FieldLabel>GPS Device</FieldLabel>
                                        <Select value={gpsDevice} onValueChange={setGpsDevice}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select gps device..." />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border shadow-md">
                                                <SelectGroup>
                                                    <SelectLabel>Available trucks</SelectLabel>
                                                    <SelectItem value="GPS-001-PUNE">GPS-001-PUNE</SelectItem>
                                                    <SelectItem value="GPS-002-PUNE">GPS-002-PUNE</SelectItem>
                                                    <SelectItem value="GPS-003-PUNE">GPS-003-PUNE</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </Field>

                                </div>

                                {/* Driver */}
                                <Field>
                                    <div className="flex justify-between items-center">
                                        <FieldLabel>Driver</FieldLabel>
                                        {/* Add new driver button */}
                                        {!driverAdded && (
                                            <button
                                                type="button"
                                                onClick={() => setShowAddDriver(!showAddDriver)}
                                                className="text-maroon hover:underline text-xs sm:text-sm"
                                            >
                                                {showAddDriver ? '- Select existing' : '+ Add new driver'}
                                            </button>
                                        )}
                                    </div>

                                    {driverAdded ? (
                                        <div className="p-3 border rounded-md bg-gray-50 flex flex-col gap-3">

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                <Input
                                                    value={driverData.name}
                                                    onChange={(e) =>
                                                        setDriverData({ ...driverData, name: e.target.value })
                                                    }
                                                    placeholder="Driver name"
                                                    className="text-sm"
                                                />

                                                <Input
                                                    value={driverData.phone}
                                                    onChange={(e) =>
                                                        setDriverData({ ...driverData, phone: e.target.value })
                                                    }
                                                    placeholder="Phone number"
                                                    className="text-sm"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-xs text-gray-500">
                                                    Aadhar card
                                                </label>
                                                <Input type="file" className="mt-1 text-xs" />
                                                {aadharPreview && (
                                                    <img
                                                        src={aadharPreview}
                                                        alt="Aadhar"
                                                        className="w-40 h-28 object-cover rounded-md border"
                                                    />
                                                )}
                                            </div>

                                            <p className="text-xs text-green-600 font-medium">
                                                ✓ Driver added successfully
                                            </p>
                                        </div>

                                    ) : showAddDriver ? (

                                        /* ─────────────── 2. ADD DRIVER FORM ─────────────── */
                                        <div className="p-3 border rounded-md bg-gray-50 flex flex-col gap-3">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                <Input
                                                    placeholder="Driver name"
                                                    className="placeholder:text-sm text-sm"
                                                    value={driverData.name}
                                                    onChange={(e) =>
                                                        setDriverData({ ...driverData, name: e.target.value })
                                                    }
                                                />

                                                <Input
                                                    placeholder="Phone number"
                                                    className="placeholder:text-sm text-sm"
                                                    type="tel"
                                                    value={driverData.phone}
                                                    onChange={(e) =>
                                                        setDriverData({ ...driverData, phone: e.target.value })
                                                    }
                                                />
                                            </div>

                                            <div>
                                                <label className="text-xs text-gray-500">
                                                    Aadhar card
                                                </label>
                                                <Input
                                                    type="file"
                                                    className="mt-1 placeholder:text-xs text-xs"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0]
                                                        if (file) {
                                                            setDriverData({ ...driverData, aadhar: file })
                                                            setAadharPreview(URL.createObjectURL(file))
                                                        }
                                                    }}
                                                />


                                            </div>
                                            {aadharPreview && (
                                                <div className="mt-2">
                                                    <p className="text-xs text-gray-500 mb-1">Preview</p>

                                                    <img
                                                        src={aadharPreview}
                                                        alt="Aadhar Preview"
                                                        className="w-40 h-28 object-cover rounded-md border"
                                                    />
                                                </div>
                                            )}

                                            <Button
                                                type="button"
                                                className="bg-maroon hover:bg-maroon-dark text-white"
                                                onClick={() => {
                                                    setDriverAdded(true)
                                                    setShowAddDriver(false)
                                                }}
                                            >
                                                Save Driver
                                            </Button>
                                        </div>

                                    ) : (

                                        /* ─────────────── 3. SELECT DRIVER ─────────────── */
                                        <Select
                                            value={selectedDriver}
                                            onValueChange={setSelectedDriver}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select driver..." />
                                            </SelectTrigger>

                                            <SelectContent className="bg-white border shadow-md">
                                                <SelectGroup>
                                                    <SelectLabel>Drivers</SelectLabel>
                                                    <SelectItem value="ramesh">Ramesh Kumar</SelectItem>
                                                    <SelectItem value="suresh">Suresh Patil</SelectItem>
                                                    <SelectItem value="vijay">Vijay Sharma</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    )}

                                    <FieldDescription className="text-xs">
                                        Select existing driver or add a new one
                                    </FieldDescription>
                                </Field>

                                {/* Stops */}
                                <Field>
                                    <FieldLabel>Delivery stops</FieldLabel>
                                    <div className="flex gap-2">
                                        <Select
                                            value={selectedStore}
                                            onValueChange={setSelectedStore}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select store..." />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border shadow-md">
                                                <SelectGroup>
                                                    <SelectLabel>Stores</SelectLabel>
                                                    <SelectItem value="Koregaon Park Store">Koregaon Park Store</SelectItem>
                                                    <SelectItem value="Hinjawadi Store">Hinjawadi Store</SelectItem>
                                                    <SelectItem value="FC Road Store">FC Road Store</SelectItem>
                                                    <SelectItem value="Baner Store">Baner Store</SelectItem>
                                                    <SelectItem value="Kothrud Store">Kothrud Store</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            type="button"
                                            onClick={addStop}
                                            className="bg-maroon hover:bg-maroon-dark text-white shrink-0"
                                        >
                                            <Plus size={14} />
                                        </Button>
                                    </div>
                                    <FieldDescription className="text-xs">
                                        Add stops in order — drag to reorder
                                    </FieldDescription>
                                    <StopsList stops={stops} onRemove={removeStop} />
                                </Field>

                                {/* Scheduled departure */}
                                <Field>
                                    <FieldLabel>Scheduled departure</FieldLabel>
                                    <Input type="datetime-local" className="text-sm"/>
                                    <FieldDescription className="text-xs">
                                        Leave blank to dispatch immediately
                                    </FieldDescription>
                                </Field>


                                {/* OTP Section */}
                                {!otpSent ? (
                                    <Button
                                        type="button"
                                        className="bg-maroon text-white"
                                        onClick={() => setOtpSent(true)}
                                    >
                                        Send OTP
                                    </Button>
                                ) : (
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <Input
                                            placeholder="Enter OTP"
                                            value={otp}
                                            className="w-full placeholder:text-sm text-sm"
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                        <Button className="bg-green-600 text-white">
                                            Verify
                                        </Button>
                                    </div>
                                )}

                            </FieldGroup>
                        </FieldSet>
                    </FieldGroup>
                </div>


                <SheetFooter className="flex flex-col sm:flex-row gap-2 items-center w-full border-t border-gray-200">
                    <Button className='w-full sm:w-1/2 bg-maroon hover:bg-maroon-dark'>Dispatch Trip <Route /></Button>
                    <SheetClose className='basis-1/2' asChild>
                        <Button className="w-full" variant="outline">Cancel</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}