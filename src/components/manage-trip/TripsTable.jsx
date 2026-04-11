import { columns } from "./trips-table/columns"
import { DataTable } from "./trips-table/data-table"


const trips = [
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

export default function TripsTable({ trips, onEditTrip, onCancelTrip }) {
    return (
        <section className="mt-6 px-4 lg:px-10">
            <DataTable 
                columns={columns({ onEditTrip, onCancelTrip })} 
                data={trips} 
            />
        </section>
    )
}