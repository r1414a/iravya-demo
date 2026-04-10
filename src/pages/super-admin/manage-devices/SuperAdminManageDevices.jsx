// SuperAdminManageDevices.jsx (Updated - Complete)
import DeviceFilter from "@/components/manage-gps/DeviceFitler"
import AdminSubHeader from "@/components/AdminSubHeader"
import AddGPSDeviceModal from "@/components/manage-gps/AddGPSDeviceModal"
import DeviceTable from "@/components/manage-gps/DeviceTable"
import { useSelector } from "react-redux"
import { selectUser } from "@/lib/features/auth/authSlice"
import { useMemo, useState } from "react"

const initialDevices = [
    {
        id: "1",
        deviceId: "GPS-001-PUNE",
        imei: "354678901234560",
        simNo: "9833012345",
        firmware: "v2.4.1",
        homeDC: "Pune Warehouse DC",
        brand: "Tata Westside",
        status: "in_transit",
        currentTripId: "TRP-2841",
        currentTruckReg: "MH12AB1234",
        currentDriverName: "Ravi Deshmukh",
        currentStoreId: null,
        currentStoreName: null,
        lastPing: "8s ago",
        lastPingDate: "Today, 10:42 AM",
        signalStrength: 87,
        battery: 92,
        totalTrips: 148,
        tripsThisMonth: 9,
        location: "Pune–Mumbai Expressway",
        installDate: "Jan 2023",
    },
    {
        id: "2",
        deviceId: "GPS-002-PUNE",
        imei: "354678901234561",
        simNo: "9833012346",
        firmware: "v2.4.1",
        homeDC: "Pune Warehouse DC",
        brand: "Zudio",
        status: "in_transit",
        currentTripId: "TRP-2840",
        currentTruckReg: "MH14CD5678",
        currentDriverName: "Suresh Pawar",
        currentStoreId: null,
        currentStoreName: null,
        lastPing: "12s ago",
        lastPingDate: "Today, 10:42 AM",
        signalStrength: 74,
        battery: 68,
        totalTrips: 87,
        tripsThisMonth: 5,
        location: "Hinjawadi Rd, Pune",
        installDate: "Jun 2023",
    },
    {
        id: "3",
        deviceId: "GPS-003-PUNE",
        imei: "354678901234562",
        simNo: "9833012347",
        firmware: "v2.3.8",
        homeDC: "Nashik DC",
        brand: "Tata Cliq",
        status: "at_store",
        currentTripId: "TRP-2839",
        currentTruckReg: null,
        currentDriverName: null,
        currentStoreId: "STR-003",
        currentStoreName: "FC Road Store",
        lastPing: "6h ago",
        lastPingDate: "Today, 04:15 AM",
        signalStrength: 0,
        battery: 41,
        totalTrips: 211,
        tripsThisMonth: 0,
        location: "FC Road Store, Pune",
        installDate: "Feb 2022",
    },
    {
        id: "4",
        deviceId: "GPS-004-PUNE",
        imei: "354678901234563",
        simNo: "9833012348",
        firmware: "v2.4.0",
        homeDC: "Pune Warehouse DC",
        brand: null,
        status: "available",
        currentTripId: null,
        currentTruckReg: null,
        currentDriverName: null,
        currentStoreId: null,
        currentStoreName: null,
        lastPing: "Never",
        lastPingDate: "—",
        signalStrength: 0,
        battery: 100,
        totalTrips: 0,
        tripsThisMonth: 0,
        location: "DC shelf",
        installDate: "Mar 2026",
    },
    {
        id: "5",
        deviceId: "GPS-005-PUNE",
        imei: "354678901234564",
        simNo: "9833012349",
        firmware: "v2.4.1",
        homeDC: "Pune Warehouse DC",
        brand: "Tata Westside",
        status: "offline",
        currentTripId: null,
        currentTruckReg: null,
        currentDriverName: null,
        currentStoreId: null,
        currentStoreName: null,
        lastPing: "4h ago",
        lastPingDate: "Today, 06:38 AM",
        signalStrength: 0,
        battery: 11,
        totalTrips: 57,
        tripsThisMonth: 4,
        location: "Last: Baner, Pune",
        installDate: "Sep 2024",
    },
]

export default function SuperAdminManageDevices() {
    const { user } = useSelector(selectUser)
    const isadmin = user.role === 'super_admin'
    
    const [devices, setDevices] = useState(initialDevices)
    const [searchInput, setSearchInput] = useState("")
    const [open, setOpen] = useState(false)

    const handleClear = () => setSearchInput("")

    const handleAddDevice = (newDevice) => {
        setDevices((prev) => [newDevice, ...prev])
    }

    const handleEditDevice = (updatedDevice) => {
        setDevices((prev) =>
            prev.map((device) =>
                device.id === updatedDevice.id ? { ...updatedDevice } : device
            )
        )
    }

    const handleDeleteDevice = (deviceId) => {
        setDevices((prev) => prev.filter((device) => device.id !== deviceId))
    }

    const filteredDevices = useMemo(() => {
        const search = searchInput.trim().toLowerCase()

        if (!search) return devices

        return devices.filter((device) =>
            device.deviceId.toLowerCase().includes(search) ||
            device.imei.toLowerCase().includes(search) ||
            device.simNo.toLowerCase().includes(search)
        )
    }, [devices, searchInput])

    return (
        <section className="mb-10">
            <AdminSubHeader
                to={isadmin ? '/admin' : '/dc'}
                heading={'GPS Devices'}
                subh={
                    isadmin 
                        ? "All tracking devices across every brand and DC — register, assign to DCs, monitor health"
                        : "GPS devices assigned to this DC — monitor status, check diagnostics and manage device returns from stores"
                }
            />

            <DeviceFilter
                CreateButton={isadmin ? <AddGPSDeviceModal
    open={open}
    setOpen={setOpen}
    onAdd={handleAddDevice}
/> : null}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                handleClear={handleClear}
            />
            
            <DeviceTable 
                devices={filteredDevices}
                onEditDevice={handleEditDevice}
                onDeleteDevice={handleDeleteDevice}
            />
        </section>
    )
}