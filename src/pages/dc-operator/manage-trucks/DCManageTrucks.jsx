import AdminSubHeader from "@/components/AdminSubHeader"
import TrucksFilter from "@/components/manage-truck/TrucksFilter"
import TrucksTable from "@/components/manage-truck/TrucksTable"
import SuperAdminManageTrucks from "@/pages/super-admin/manage-trucks/SuperAdminManageTrucks"

export default function DCManageTrucks() {
    return (
        <SuperAdminManageTrucks/>
        // <section className="mb-10">
        //     <AdminSubHeader
        //         to="/dc"
        //         heading="Trucks at this DC"
        //         subh="All trucks assigned to Pune Warehouse — view status, trip status, details, history, dispatch idle trucks "
                
        //     />


        //     <TrucksFilter />
        //     <TrucksTable />
        // </section>
    )
}