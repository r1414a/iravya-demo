import UsersFilter from "./UsersFilter"
import UsersTable from "./UsersTable"
import AdminSubHeader from "@/components/AdminSubHeader"
import CreateUserModal from "./CreateUserModal"

export default function SuperAdminManageUser() {
    return (
        <section className="mb-10">
            <AdminSubHeader
                to={'/admin'}
                heading="Manage Users"
                subh="Manage users across all brands — invite, edit roles, deactivate and reset passwords"
            />
           

            <UsersFilter CreateButton={<CreateUserModal />}/>
            <UsersTable/>


        </section>
    )
}