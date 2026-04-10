import { columns } from "./alert-table/columns"
import { DataTable } from "./alert-table/data-table"
 
const alerts = [
    {
        id: "ALT-1001",
        type: "speeding",
        severity: "high",
        brand: "Tata Westside",
        truck: "MH12AB1234",
        driver: "Ravi Deshmukh",
        tripId: "TRP-2841",
        dc: "Pune Warehouse DC",
        description: "Truck travelling at 96 km/h — limit is 80 km/h",
        location: "Pune–Mumbai Expressway, near Khopoli",
        time: "Today, 10:42 AM",
        isRead: false,
    },
    {
        id: "ALT-1002",
        type: "long_stop",
        severity: "medium",
        brand: "Zudio",
        truck: "MH14CD5678",
        driver: "Suresh Pawar",
        tripId: "TRP-2840",
        dc: "Mumbai Warehouse DC",
        description: "Truck stopped for 22 minutes on active trip",
        location: "Hinjawadi Phase 2, Pune",
        time: "Today, 09:15 AM",
        isRead: false,
    },
    {
        id: "ALT-1003",
        type: "device_offline",
        severity: "high",
        brand: "Tata Cliq",
        truck: "MH04EF9012",
        driver: "Anil Bhosale",
        tripId: "TRP-2839",
        dc: "Nashik DC",
        description: "GPS device GPS-003-PUNE stopped pinging for 18 minutes djkfhsd fsdf sdf sdfsd fsd fs df s fs f s d   sdf",
        location: "Last known: FC Road, Pune",
        time: "Today, 08:31 AM",
        isRead: true,
    },
    {
        id: "ALT-1004",
        type: "route_deviation",
        severity: "medium",
        brand: "Tata Westside",
        truck: "MH20IJ7890",
        driver: "Kiran Sawant",
        tripId: "TRP-2838",
        dc: "Pune Warehouse DC",
        description: "Truck deviated 4.2 km from planned route",
        location: "Wakad, Pune",
        time: "Yesterday, 04:52 PM",
        isRead: true,
    },
    {
        id: "ALT-1005",
        type: "device_low_batt",
        severity: "low",
        brand: "Tanishq",
        truck: "MH12GH3456",
        driver: "Manoj Kale",
        tripId: "TRP-2837",
        dc: "Pune Warehouse DC",
        description: "GPS device battery at 11% — may go offline soon",
        location: "Baner, Pune",
        time: "Yesterday, 03:20 PM",
        isRead: true,
    },
    {
        id: "ALT-1006",
        type: "geofence_enter",
        severity: "info",
        brand: "Zudio",
        truck: "MH15KL2345",
        driver: "Vijay Jadhav",
        tripId: "TRP-2836",
        dc: "Mumbai Warehouse DC",
        description: "Truck entered geofence of Hinjawadi Store",
        location: "Hinjawadi Store, Pune",
        time: "Yesterday, 02:10 PM",
        isRead: true,
    },
    {
        id: "ALT-1007",
        type: "speeding",
        severity: "high",
        brand: "Tata Cliq",
        truck: "MH09MN6789",
        driver: "Sunita Mehta",
        tripId: "TRP-2835",
        dc: "Nashik DC",
        description: "Truck travelling at 104 km/h — limit is 80 km/h",
        location: "Nashik–Pune Highway",
        time: "Mar 24, 11:30 AM",
        isRead: true,
    },
]
 
export default function AlertsTable() {
    // const [selectedAlert, setSelectedAlert] = useState(null)
 
    return (
        <section className="my-6 px-4 lg:px-10">
            <div className="border rounded-lg">
                <DataTable
                    columns={columns}
                    data={alerts}
                    // onRowClick={(row) => setSelectedAlert(row)}
                />
            </div>

        </section>
    )
}