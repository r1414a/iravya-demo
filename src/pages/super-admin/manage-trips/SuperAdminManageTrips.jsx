import AdminSubHeader from "@/components/AdminSubHeader"
import CreateTripModal from "@/components/manage-trip/CreateNewTrip"
import TripsFilter from "@/components/manage-trip/TripsFilter"
import TripsTable from "@/components/manage-trip/TripsTable"
import { selectUser } from "@/lib/features/auth/authSlice"
import { useMemo, useState } from "react"
import { useSelector } from "react-redux"


const initialTrips = [
    {
        id: "TRP-2841",
        truck: "MH12AB1234",
        driver: "Ankit S.",
        phone: "+91 98201 11234",
        gpsDevice: "GPS-001-PUNE",
        sourceDC: "Pune Warehouse DC",
        distance: "80 km",
        stops: [
            {name: "Koregaon Park Store", status: "completed"},
            {name: "Baner Store", status: "completed"},
        ],
        stopsCount: 2,
        status: "completed",
        departedAt: "Yesterday, 09:30 AM",
        eta: null,
        completedAt: "Yesterday, 11:45 AM",
    },
    // {
    //     id: "TRP-2840",
    //     truck: "MH14CD5678",
    //     driver: "Suresh P.",
    //     phone: "+91 97654 32109",
    //     // sourceDC: "Mumbai Warehouse DC",
    //     gpsDevice: "GPS-347-PUNE",
    //     sourceDC: "Pune Warehouse DC",
    //     stops: [
    //         {name: "Hinjawadi Store", status: "pending"},
    //     ],
    //     stopsCount: 1,
    //     status: "in_transit",
    //     departedAt: "Today, 08:15 AM",
    //     eta: "Today, 10:30 AM",
    //     completedAt: null,
    // },
    {
        id: "TRP-2839",
        truck: "MH04EF9012",
        driver: "Vijay P.",
        phone: "+91 91305 77654",
        distance: "123 km",
        // sourceDC: "Nashik DC",
        sourceDC: "Pune Warehouse DC",
        gpsDevice: "GPS-867-PUNE",
        stops: [
            {name: "FC Road Store", status: "completed"},
            {name: "Kothrud Store", status: "completed"},
            {name: "Baner Store", status: "completed"}
        ],
        stopsCount: 3,
        status: "completed",
        departedAt: "Yesterday, 07:00 AM",
        eta: null,
        completedAt: "Yesterday, 12:30 PM",
    },
    {
        id: "TRP-001",
        truck: "MH12GH3456",
        driver: "Rajesh K.",
        phone: "+91 98765 43210",
        gpsDevice: "GPS-002-PUNE",
        sourceDC: "Pune Warehouse DC",
        distance: "147 km",
        stops: [
            {name: "Phoenix Palladium, Mumbai", status: "pending"},
        ],
        stopsCount: 1,
        status: "in_transit",
        departedAt: "Today, 06:30 AM",
        eta: "Today, 11:00 AM",
        completedAt: null,
    },
    {
        id: "TRP-2837",
        truck: "MH20IJ7890",
        driver: "Kiran S.",
        phone: "+91 93422 65432",
        gpsDevice: "GPS-878-PUNE",
        distance: "78 km",
        sourceDC: "Pune Warehouse DC",
        stops: [
            {name: "Koregaon Park Store", status: "pending"},
        ],
        stopsCount: 1,
        status: "scheduled",
        departedAt: null,
        eta: "Today, 02:00 PM",
        completedAt: null,
    },
    {
        id: "TRP-2836",
        truck: "MH15KL2345",
        driver: "Meera A.",
        phone: "+91 73424 23432",
        distance: "66 km",
        gpsDevice: "GPS-987-PUNE",
        // sourceDC: "Mumbai Warehouse DC",
        sourceDC: "Pune Warehouse DC",
        stops: [
            {name: "FC Road Store", status: "pending"},
            {name: "Baner Store", status: "pending"}
        ],
        stopsCount: 2,
        status: "cancelled",
        departedAt: null,
        eta: null,
        completedAt: null,
    },
]

export default function SuperAdminManageTrips() {
    const {user} = useSelector(selectUser);

            const isadmin = user.role === 'super_admin'
    const [trips, setTrips] = useState(initialTrips)
    const [searchInput, setSearchInput] = useState("")
    const [statusFilter, setStatusFilter] = useState("All")
    const [dcFilter, setDcFilter] = useState("all_dcs")

    const handleClear = () => setSearchInput("")

    const handleCreateTrip = (newTrip) => {
        setTrips((prev) => [newTrip, ...prev])
    }

    const handleEditTrip = (updatedTrip) => {
        setTrips((prev) =>
            prev.map((trip) =>
                trip.id === updatedTrip.id ? { ...updatedTrip } : trip
            )
        )
    }

    const handleCancelTrip = (tripId) => {
        setTrips((prev) =>
            prev.map((trip) =>
                trip.id === tripId ? { ...trip, status: "cancelled" } : trip
            )
        )
    }

    const filteredTrips = useMemo(() => {
        const search = searchInput.trim().toLowerCase();

        if(!search) return trips;

        // Filter by DC
        // if (dcFilter !== "all_dcs") {
        //     const dcMap = {
        //         pune_dc: "Pune Warehouse DC",
        //         mumbai_dc: "Mumbai Warehouse DC",
        //         nashik_dc: "Nashik DC",
        //     }
        //     filtered = filtered.filter((trip) => trip.sourceDC === dcMap[dcFilter])
        // }

        // Filter by status
        // if (statusFilter !== "All") {
        //     const statusMap = {
        //         "In Transit": "in_transit",
        //         "Completed": "completed",
        //         "Scheduled": "scheduled",
        //         "Cancelled": "cancelled",
        //     }
        //     filtered = filtered.filter((trip) => trip.status === statusMap[statusFilter])
        // }

        // Filter by search
        
        return trips.filter((trip) =>
                trip.id.toLowerCase().includes(search) ||
                trip.truck.toLowerCase().includes(search) ||
                trip.driver.toLowerCase().includes(search) ||
                trip.phone.toLowerCase().includes(search)
            )        
    }, [trips, searchInput])
    
    return (
        <section className="mb-10">
            <AdminSubHeader
                to={isadmin ? "/admin" : "/dc"}
                heading="Manage Trips"
                subh={
                    isadmin ? "Plan, track, and dispatch deliveries across all stores":
                    "Plan, track, and dispatch deliveries across all stores — select trucks, and schedule departures."}
            />

            <TripsFilter
                CreateButton={<CreateTripModal onCreateTrip={handleCreateTrip} />}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                handleClear={handleClear}
            />

            <TripsTable
                trips={filteredTrips}
                onEditTrip={handleEditTrip}
                onCancelTrip={handleCancelTrip}
            />
        </section>
    )
}