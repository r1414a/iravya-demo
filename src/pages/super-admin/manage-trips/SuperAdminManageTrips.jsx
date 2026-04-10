import AdminSubHeader from "@/components/AdminSubHeader"
import TripsFilter from "@/components/manage-trip/TripsFilter"
import TripsTable from "@/components/manage-trip/TripsTable"

export default function SuperAdminManageTrips() {
    return (
        <section className="mb-10">

            <AdminSubHeader
                to="/admin"
                heading="Manage Trips"
                subh="Plan, track, and dispatch deliveries across all stores"
            />

            <TripsFilter />
            <TripsTable />

        </section>
    )
}