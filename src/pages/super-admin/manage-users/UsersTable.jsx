// UsersTable.jsx
import { columns } from "./users-table/columns"
import { DataTable } from "./users-table/data-table"

export default function UsersTable({ users, onEditUser, onDeleteUser }) {
    return (
        <section className="mt-6 px-4 lg:px-10">
            <DataTable
                columns={columns({ onEditUser, onDeleteUser })}
                data={users}
            />
        </section>
    )
}