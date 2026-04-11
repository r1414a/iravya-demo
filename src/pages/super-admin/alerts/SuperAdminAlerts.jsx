// SuperAdminAlerts.jsx
import AdminSubHeader from "@/components/AdminSubHeader"
import AlertsFilter from "@/components/super-admin/alerts/AlertsFilter"
import AlertsTable from "@/components/super-admin/alerts/AlertsTable"
import { useMemo, useState } from "react"

const initialAlerts = [
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
        createdAt: "2026-04-11T10:42:00.000Z",
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
        createdAt: "2026-04-11T09:15:00.000Z",
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
        description: "GPS device GPS-003-PUNE stopped pinging for 18 minutes",
        location: "Last known: FC Road, Pune",
        time: "Today, 08:31 AM",
        isRead: true,
        createdAt: "2026-04-11T08:31:00.000Z",
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
        createdAt: "2026-04-10T16:52:00.000Z",
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
        createdAt: "2026-04-10T15:20:00.000Z",
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
        createdAt: "2026-04-10T14:10:00.000Z",
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
        createdAt: "2026-03-24T11:30:00.000Z",
    },
]

export default function SuperAdminAlerts() {
    const [alerts, setAlerts] = useState(initialAlerts)
    const [searchInput, setSearchInput] = useState("")
    const [readFilter, setReadFilter] = useState("All")

    const handleClear = () => setSearchInput("")

    const handleMarkAsRead = (alertId) => {
        setAlerts((prev) =>
            prev.map((alert) =>
                alert.id === alertId ? { ...alert, isRead: true } : alert
            )
        )
    }

    const handleMarkAsUnread = (alertId) => {
        setAlerts((prev) =>
            prev.map((alert) =>
                alert.id === alertId ? { ...alert, isRead: false } : alert
            )
        )
    }

    const handleMarkAllAsRead = () => {
        setAlerts((prev) =>
            prev.map((alert) => ({ ...alert, isRead: true }))
        )
    }

    const handleDeleteAlert = (alertId) => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
    }

    const filteredAlerts = useMemo(() => {
        let filtered = alerts

        // Filter by read status
        if (readFilter === "Unread") {
            filtered = filtered.filter((alert) => !alert.isRead)
        } else if (readFilter === "Read") {
            filtered = filtered.filter((alert) => alert.isRead)
        }

        // Filter by search
        const search = searchInput.trim().toLowerCase()
        if (search) {
            filtered = filtered.filter((alert) =>
                alert.truck.toLowerCase().includes(search) ||
                alert.driver.toLowerCase().includes(search) ||
                alert.tripId.toLowerCase().includes(search) ||
                alert.description.toLowerCase().includes(search) ||
                alert.location.toLowerCase().includes(search)
            )
        }

        return filtered
    }, [alerts, searchInput, readFilter])

    return (
        <section className="mb-10">
            <AdminSubHeader
                to={'/admin'}
                heading="Alerts"
                subh="All system alerts across every brand — speeding, long stops, route deviations and device issues"
            />

            <AlertsFilter 
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                handleClear={handleClear}
                readFilter={readFilter}
                setReadFilter={setReadFilter}
            />
            
            <AlertsTable 
                alerts={filteredAlerts}
                allAlerts={alerts}
                onMarkAsRead={handleMarkAsRead}
                onMarkAsUnread={handleMarkAsUnread}
                onMarkAllAsRead={handleMarkAllAsRead}
                onDeleteAlert={handleDeleteAlert}
            />
        </section>
    )
}