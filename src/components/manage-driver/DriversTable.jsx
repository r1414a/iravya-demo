import { columns } from "./drivers-table/column"
import { DataTable } from "./drivers-table/data-table"

export default function DriversTable({ drivers, onEditDriver, onDeleteDriver }) {
    return (
        <section className="mt-6 px-4 lg:px-10">
            <div className="border rounded-lg">
                <DataTable
                    columns={columns({ onEditDriver, onDeleteDriver })}
                    data={drivers}
                />
            </div>
        </section>
    )
}
    
        // import { columns } from "./drivers-table/column"
        // import { DataTable } from "./drivers-table/data-table"

        
        // const drivers = [
        //     {
        //         id: 1,
        //         initials: "RD",
        //         color: "ua-teal",
        //         name: "Ravi Deshmukh",
        //         phone: "+91 98201 11234",
        //         licenceNo: "MH1220190012345",
        //         licenceClass: "HMV",
        //         licenceExpiry: "Aug 2027",
        //         currentTrip: "TRP-2841",
        //         totalTrips: 142,
        //         tripsThisMonth: 9,
        //         lastActive: "2h ago",
        //         lastActiveDate: "Today, 09:14 AM",
        //         since: "Jan 2023",
        //         status: "on_trip",
        //     },
        //     {
        //         id: 2,
        //         initials: "SP",
        //         color: "ua-green",
        //         name: "Suresh Pawar",
        //         phone: "+91 99705 44321",
        //         licenceNo: "MH1420180056789",
        //         licenceClass: "HGMV",
        //         licenceExpiry: "Mar 2026",
        //         currentTrip: "TRP-4841",
        //         totalTrips: 87,
        //         tripsThisMonth: 5,
        //         lastActive: "Yesterday",
        //         lastActiveDate: "Mar 24, 05:30 PM",
        //         since: "Jun 2023",
        //         status: "on_trip",
        //     },
        //     {
        //         id: 3,
        //         initials: "AB",
        //         color: "ua-amber",
        //         name: "Anil Bhosale",
        //         phone: "+91 91305 77654",
        //         licenceNo: "MH1220210078901",
        //         licenceClass: "LMV",
        //         licenceExpiry: "Nov 2028",
        //         currentTrip: null,
        //         totalTrips: 34,
        //         tripsThisMonth: 2,
        //         lastActive: "3 days ago",
        //         lastActiveDate: "Mar 22, 02:10 PM",
        //         since: "Sep 2024",
        //         status: "available",
        //     },
        //     {
        //         id: 4,
        //         initials: "MK",
        //         color: "ua-purple",
        //         name: "Manoj Kale",
        //         phone: "+91 87654 32109",
        //         licenceNo: "MH0420170034567",
        //         licenceClass: "HMV",
        //         licenceExpiry: "Jan 2025",
        //         currentTrip: "TRP-2561",
        //         totalTrips: 210,
        //         tripsThisMonth: 0,
        //         lastActive: "2 weeks ago",
        //         lastActiveDate: "Mar 11, 08:00 AM",
        //         since: "Feb 2022",
        //         status: "on_trip",
        //     },
        //     {
        //         id: 5,
        //         initials: "VJ",
        //         color: "ua-coral",
        //         name: "Vijay Jadhav",
        //         phone: "+91 93422 65432",
        //         licenceNo: "MH1220220091234",
        //         licenceClass: "HGMV",
        //         licenceExpiry: "Sep 2029",
        //         currentTrip: null,
        //         totalTrips: 12,
        //         tripsThisMonth: 4,
        //         lastActive: "5h ago",
        //         lastActiveDate: "Today, 06:45 AM",
        //         since: "Dec 2024",
        //         status: "available",
        //     },
        // ]
        
        // export default function DriversTable() {
        //     return (
        //         <section className="mt-6 px-4 lg:px-10">
        //             <div className="border rounded-lg">
        //                 <DataTable 
        //                     columns={columns} 
        //                     data={drivers} 
        //                 />
        //             </div>
        //         </section>
        //     )
        // }