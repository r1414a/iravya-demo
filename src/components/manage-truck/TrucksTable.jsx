// TrucksTable.jsx  
import { columns } from "./trucks-table/columns"
import { DataTable } from "./trucks-table/data-table"

export default function TrucksTable({ trucks, onEditTruck, onDeleteTruck }) {
    return (
        <section className="mt-6 px-4 lg:px-10">
            <DataTable
                columns={columns({ onEditTruck, onDeleteTruck })}
                data={trucks}
            />
        </section>
    )
}