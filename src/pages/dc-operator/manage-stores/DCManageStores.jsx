
import AdminSubHeader from "@/components/AdminSubHeader"
import StoresFilter from "@/components/manage-store/StoresFilter"
import StoresTable from "@/components/manage-store/StoresTable"
import SuperAdminManageStores from "@/pages/super-admin/manage-stores/SuperAdminManageStores"


export default function DCManageStores() {
    return (
        <SuperAdminManageStores/>
        // <section className="mb-10">
        //     <AdminSubHeader
        //         to="/dc"
        //         heading="Manage Stores"
        //         subh="Stores this DC delivers to — track incoming deliveries, devices held and manager contacts"
        //     />
        //     <StoresFilter CreateButton={null}/>
        //     <StoresTable />
        // </section>
    )
}