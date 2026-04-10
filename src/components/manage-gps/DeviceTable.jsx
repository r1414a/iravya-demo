import { useState }        from "react"
import DeviceDetailDrawer  from "./DeviceDetailDrawer"
import { getColumns } from "./device-table/columns"
import {DataTable} from "./device-table/data-table"
 
const devices = [
    {
        id: 1,
        deviceId: "GPS-001-PUNE",
        imei: "354678901234560",
        simNo: "9833012345",
        firmware: "v2.4.1",
        homeDC: "Pune Warehouse DC",
        brand: "Tata Westside",
        // New fields — no assignedTruck, instead currentTripId + status reflects lifecycle
        status: "in_transit",         // available | in_transit | at_store | offline
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
        id: 2,
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
        id: 3,
        deviceId: "GPS-003-PUNE",
        imei: "354678901234562",
        simNo: "9833012347",
        firmware: "v2.3.8",
        homeDC: "Nashik DC",
        brand: "Tata Cliq",
        status: "at_store",           // handed to store, awaiting DC pickup
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
        id: 4,
        deviceId: "GPS-004-PUNE",
        imei: "354678901234563",
        simNo: "9833012348",
        firmware: "v2.4.0",
        homeDC: "Pune Warehouse DC",
        brand: null,
        status: "available",          // sitting at DC, ready to use
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
        id: 5,
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
 
// showBrandColumn — super admin sees brand column, DC does not
export default function DeviceTable({ showBrandColumn = false }) {
    const [selectedDevice, setSelectedDevice] = useState(null)
    const cols = getColumns({ showBrandColumn })
 
    return (
        <section className="mt-6 px-4 lg:px-10">
            <div className="border rounded-lg">
                <DataTable
                    columns={cols}
                    data={devices}
                    onRowClick={(row) => setSelectedDevice(row)}
                />
            </div>
 
            <DeviceDetailDrawer
                device={selectedDevice}
                open={!!selectedDevice}
                onClose={() => setSelectedDevice(null)}
            />
        </section>
    )
}