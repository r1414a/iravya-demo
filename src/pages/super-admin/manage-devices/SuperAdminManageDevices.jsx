 
import DeviceFilter from "@/components/manage-gps/DeviceFitler"
import AdminSubHeader    from "@/components/AdminSubHeader"
import AddGPSDeviceModal from "@/components/manage-gps/AddGPSDeviceModal"
import DeviceTable from "@/components/manage-gps/DeviceTable"
 
export default function SuperAdminManageDevices() {
    return (
        <section className="mb-10">
            <AdminSubHeader
                to={'/admin'}
                heading={'GPS Devices'}
                subh="All tracking devices across every brand and DC — register, assign to DCs, monitor health"
            />
           
           <DeviceFilter CreateButton={<AddGPSDeviceModal/>}/>
                       <DeviceTable />
        </section>
    )
}