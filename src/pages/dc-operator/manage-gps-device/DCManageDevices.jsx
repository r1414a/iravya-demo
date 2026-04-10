
import AdminSubHeader  from "@/components/AdminSubHeader"
import DeviceFilter from "@/components/manage-gps/DeviceFitler"
import DeviceTable from "@/components/manage-gps/DeviceTable"
 
const DCManageDevices = () => {
    return (
        <section>
            <AdminSubHeader
                to="/dc"
                heading="GPS Devices"
                subh="GPS devices assigned to this DC — monitor status, check diagnostics and manage device returns from stores"
            />
            <DeviceFilter CreateButton={null}/>
            <DeviceTable />
        </section>
    )
}
 
export default DCManageDevices