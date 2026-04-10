
// DCsTable.jsx
import { DataTable } from "./dc-table/data-table"
import { columns } from "./dc-table/columns"

export default function DCsTable({ dcs, onEditDC, onDeleteDC }) {
    return (
        <section className="mt-6 px-4 lg:px-10">
            <DataTable
                columns={columns({ onEditDC, onDeleteDC })}
                data={dcs}
            />
        </section>
    )
}

// import { DataTable } from "./dc-table/data-table"
// import { columns } from "./dc-table/columns"


// const dcs = [
//     {
//         id: 1,
//         name: "Pune Warehouse DC",
//         city: "Pune",
//         address: "Plot 14, Bhosari MIDC, Pune 411026",
//         contactName: "Suresh Pawar",
//         contactPhone: "+91 98201 11234",
//         contactEmail: "suresh.pawar@westside.com",
//         totalTrucks: 8,
//         activeTrucks: 5,
//         totalDrivers: 11,
//         totalDevices: 8,
//         devicesAvailable: 3,
//         activeTrips: 3,
//         totalTrips: 412,
//         status: "active",
//         createdAt: "Jan 2023",
//     },
//     {
//         id: 2,
//         name: "Mumbai Warehouse DC",
//         city: "Mumbai",
//         address: "Shed 7B, Bhiwandi Logistics Park, Mumbai 421302",
//         contactName: "Meera Joshi",
//         contactPhone: "+91 99705 44321",
//         contactEmail: "meera.j@zudio.com",
//         totalTrucks: 6,
//         activeTrucks: 2,
//         totalDrivers: 7,
//         totalDevices: 6,
//         devicesAvailable: 4,
//         activeTrips: 2,
//         totalTrips: 287,
//         status: "active",
//         createdAt: "Mar 2023",
//     },
//     {
//         id: 3,
//         name: "Nashik DC",
//         city: "Nashik",
//         address: "Gat No. 22, Sinnar Industrial Area, Nashik 422103",
//         contactName: "Anil Bhosale",
//         contactPhone: "+91 91305 77654",
//         contactEmail: "anil.b@tatacliq.com",
//         totalTrucks: 4,
//         activeTrucks: 1,
//         totalDrivers: 5,
//         totalDevices: 4,
//         devicesAvailable: 3,
//         activeTrips: 1,
//         totalTrips: 138,
//         status: "active",
//         createdAt: "Jul 2023",
//     },
//     {
//         id: 4,
//         name: "Nagpur Warehouse DC",
//         city: "Nagpur",
//         address: "Plot 88, Butibori MIDC, Nagpur 441108",
//         contactName: "Vijay Deshmukh",
//         contactPhone: "+91 87654 32109",
//         contactEmail: "vijay.d@tanishq.com",
//         totalTrucks: 3,
//         activeTrucks: 0,
//         totalDrivers: 3,
//         totalDevices: 3,
//         devicesAvailable: 3,
//         activeTrips: 0,
//         totalTrips: 54,
//         status: "inactive",
//         createdAt: "Nov 2023",
//     },
//     {
//         id: 5,
//         name: "Kolhapur DC",
//         city: "Kolhapur",
//         address: "Survey 101, Gokul Shirgaon, Kolhapur 416234",
//         contactName: "Priya Kulkarni",
//         contactPhone: "+91 93422 65432",
//         contactEmail: "priya.k@westside.com",
//         totalTrucks: 5,
//         activeTrucks: 3,
//         totalDrivers: 6,
//         totalDevices: 5,
//         devicesAvailable: 2,
//         activeTrips: 3,
//         totalTrips: 201,
//         status: "active",
//         createdAt: "Feb 2024",
//     },
// ]

// export default function DCsTable() {

//     return (
//         <section className="mt-6 px-4 lg:px-10">
//             <div className="border rounded-lg">
//                 <DataTable
//                     columns={columns}
//                     data={dcs}
//                 />
//             </div>
//         </section>
//     )
// }