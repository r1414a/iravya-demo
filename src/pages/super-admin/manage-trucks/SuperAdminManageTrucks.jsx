// SuperAdminManageTrucks.jsx (Main Page Component)
import AdminSubHeader from "@/components/AdminSubHeader"
import TrucksFilter from "@/components/manage-truck/TrucksFilter"
import TrucksTable from "@/components/manage-truck/TrucksTable"
import AddTruckModal from "@/components/manage-truck/AddTruckForm"
import { selectUser } from "@/lib/features/auth/authSlice"
import { useMemo, useState } from "react"
import { useSelector } from "react-redux"

// Initial dummy data for trucks
const initialTrucks = [
    {
        id: "1",
        registration_no: "MH12AB1234",
        type: "heavy",
        model: "Tata 407",
        capacity: "4",
        total_trips: 142,
        tripsThisMonth: 9,
        lastTrip: "2h ago",
        lastTripDate: "Today, 09:14 AM",
        status: "in_transit",
        createdAt: "2023-01-10T10:00:00.000Z",
    },
    {
        id: "2",
        registration_no: "MH14CD5678",
        type: "medium",
        model: "Ashok Leyland",
        capacity: "2.5",
        total_trips: 87,
        tripsThisMonth: 5,
        lastTrip: "Yesterday",
        lastTripDate: "Mar 24, 05:30 PM",
        status: "idle",
        createdAt: "2023-06-10T10:00:00.000Z",
    },
    {
        id: "3",
        registration_no: "MH12XY9090",
        type: "mini_truck",
        model: "Mahindra Bolero",
        capacity: "1",
        total_trips: 210,
        tripsThisMonth: 0,
        lastTrip: "2 weeks ago",
        lastTripDate: "Mar 11, 08:00 AM",
        status: "maintenance",
        createdAt: "2024-09-10T10:00:00.000Z",
    },
    {
        id: "4",
        registration_no: "MH04EF3344",
        type: "heavy",
        model: "Tata Prima",
        capacity: "6",
        total_trips: 12,
        tripsThisMonth: 4,
        lastTrip: "3 days ago",
        lastTripDate: "Mar 22, 01:10 PM",
        status: "idle",
        createdAt: "2024-01-10T10:00:00.000Z",
    },
    {
        id: "5",
        registration_no: "MH20GH7788",
        type: "medium",
        model: "Eicher Pro",
        capacity: "3",
        total_trips: 56,
        tripsThisMonth: 2,
        lastTrip: "5 days ago",
        lastTripDate: "Mar 20, 11:30 AM",
        status: "idle",
        createdAt: "2024-03-10T10:00:00.000Z",
    },
]

export default function SuperAdminManageTrucks() {
    const { user } = useSelector(selectUser)
    const isadmin = user.role === 'super_admin'
    
    const [trucks, setTrucks] = useState(initialTrucks)
    const [searchInput, setSearchInput] = useState("")

    const handleClear = () => setSearchInput("")

    const handleAddTruck = (newTruck) => {
        setTrucks((prev) => [newTruck, ...prev])
    }

    const handleEditTruck = (updatedTruck) => {
        setTrucks((prev) =>
            prev.map((truck) =>
                truck.id === updatedTruck.id ? { ...updatedTruck } : truck
            )
        )
    }

    const handleDeleteTruck = (truckId) => {
        setTrucks((prev) => prev.filter((truck) => truck.id !== truckId))
    }

    const filteredTrucks = useMemo(() => {
        const search = searchInput.trim().toLowerCase()

        if (!search) return trucks

        return trucks.filter((truck) =>
            truck.registration_no.toLowerCase().includes(search) ||
            truck.model.toLowerCase().includes(search) ||
            truck.type.toLowerCase().includes(search)
        )
    }, [trucks, searchInput])

    return (
        <section className="mb-10">
            <AdminSubHeader
                to={isadmin ? '/admin' : '/dc'}
                heading="Manage Trucks"
                subh={
                    isadmin 
                        ? "Manage trucks — view, edit, trip status, details, history, and maintenance"
                        : "Manage trucks at this DC — add, edit, trip status, details, history, and maintenance"
                }
            />

            <TrucksFilter
                CreateButton={<AddTruckModal onAddTruck={handleAddTruck} />}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                handleClear={handleClear}
            />

            <TrucksTable
                trucks={filteredTrucks}
                onEditTruck={handleEditTruck}
                onDeleteTruck={handleDeleteTruck}
            />
        </section>
    )
}