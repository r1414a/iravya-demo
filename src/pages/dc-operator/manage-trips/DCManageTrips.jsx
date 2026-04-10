
import TripsTable from "@/components/manage-trip/TripsTable"
import AdminSubHeader from "@/components/AdminSubHeader"
import CreateNewTrip from "@/components/manage-trip/CreateNewTrip"
import TripsFilter from "@/components/manage-trip/TripsFilter"

export default function DCManageTrips() {
    return (
        <section className="mb-10">

            <AdminSubHeader
                to="/dc"
                heading="Manage Trips"
                subh="Plan, track, and dispatch deliveries across all stores — select trucks, and schedule departures."
                
            />

            <TripsFilter CreateButton={<CreateNewTrip />}/>
            <TripsTable />

        </section>
    )
}