// DeviceTable.jsx
import { useState } from "react"
import DeviceDetailDrawer from "./DeviceDetailDrawer"
import { getColumns } from "./device-table/columns"
import { DataTable } from "./device-table/data-table"

export default function DeviceTable({ devices, onEditDevice, onDeleteDevice }) {
    const [selectedDevice, setSelectedDevice] = useState(null)
    const cols = getColumns({ onEditDevice, onDeleteDevice })

    return (
        <section className="mt-6 px-4 lg:px-10">
            <DataTable
                columns={cols}
                data={devices}
            />

            <DeviceDetailDrawer
                device={selectedDevice}
                open={!!selectedDevice}
                onClose={() => setSelectedDevice(null)}
            />
        </section>
    )
}