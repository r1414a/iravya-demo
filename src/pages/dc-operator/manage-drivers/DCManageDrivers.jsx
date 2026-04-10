import AdminSubHeader from "@/components/AdminSubHeader"
import DriversFilter from "@/components/manage-driver/DriversFilter"
import DriversTable from "@/components/manage-driver/DriversTable"
import SuperAdminManageDrivers from "@/pages/super-admin/manage-drivers/SuperAdminManageDrivers"

export default function DCManageDrivers() {
    return (
        <SuperAdminManageDrivers/>
        // <section className="mb-10">
        //     <AdminSubHeader
        //         to="/dc"
        //         heading="Manage Drivers"
        //         subh="Manage drivers at this DC — add, edit, trip status, details, history, and deactivate"
        //     />
        //     <DriversFilter CreateButton={null}/>
        //     <DriversTable />
        // </section>
    )
}