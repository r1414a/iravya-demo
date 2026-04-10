// StoresTable.jsx
import { DataTable } from "./store-table/data-table"
import { columns } from "./store-table/columns"

export default function StoresTable({ stores, onEditStore, onDeleteStore }) {
    return (
        <section className="mt-6 px-4 lg:px-10">
            <DataTable
                columns={columns({ onEditStore, onDeleteStore })}
                data={stores}
            />
        </section>
    )
}