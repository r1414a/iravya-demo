// AlertsTable.jsx
import { columns } from "./alert-table/columns"
import { DataTable } from "./alert-table/data-table"

export default function AlertsTable({ 
    alerts, 
    allAlerts,
    onMarkAsRead, 
    onMarkAsUnread, 
    onMarkAllAsRead, 
    onDeleteAlert 
}) {
    return (
        <section className="my-6 px-4 lg:px-10">
            <DataTable
                columns={columns({ onMarkAsRead, onMarkAsUnread, onDeleteAlert })}
                data={alerts}
                allAlerts={allAlerts}
                onMarkAllAsRead={onMarkAllAsRead}
            />
        </section>
    )
}