// SuperAdminManageDCs.jsx
import AdminSubHeader from "@/components/AdminSubHeader"
import AddDCForm from "@/components/super-admin/manage-dcs/AddDcForm"
import DCsFilter from "@/components/super-admin/manage-dcs/DcsFilter"
import DCsTable from "@/components/super-admin/manage-dcs/DcsTable"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useMemo, useState } from "react"


// Initial dummy data for DCs
const initialDCs = [
    {
        id: "1",
        dc_name: "Pune Warehouse DC",
        city: "Pune",
        address: "Plot 14, Bhosari MIDC, Pune 411026",
        dc_manager_name: "Suresh Pawar",
        dc_manager_phone: "+91 98201 11234",
        dc_manager_email: "suresh.pawar@westside.com",
        // total_trucks: 8,
        // active_trucks: 5,
        // total_drivers: 11,
        // total_devices: 8,
        // active_devices: 3,
        active_trips: 3,
        total_trips: 412,
        status: "active",
        created_at: "2023-01-10T10:00:00.000Z",
    },
    {
        id: "2",
        dc_name: "Mumbai Warehouse DC",
        city: "Mumbai",
        address: "Shed 7B, Bhiwandi Logistics Park, Mumbai 421302",
        dc_manager_name: "Meera Joshi",
        dc_manager_phone: "+91 99705 44321",
        dc_manager_email: "meera.j@zudio.com",
        // total_trucks: 6,
        // active_trucks: 2,
        // total_drivers: 7,
        // total_devices: 6,
        // active_devices: 4,
        active_trips: 2,
        total_trips: 287,
        status: "active",
        created_at: "2023-03-15T10:00:00.000Z",
    },
    {
        id: "3",
        dc_name: "Nashik DC",
        city: "Nashik",
        address: "Gat No. 22, Sinnar Industrial Area, Nashik 422103",
        dc_manager_name: "Anil Bhosale",
        dc_manager_phone: "+91 91305 77654",
        dc_manager_email: "anil.b@tatacliq.com",
        // total_trucks: 4,
        // active_trucks: 1,
        // total_drivers: 5,
        // total_devices: 4,
        // active_devices: 3,
        active_trips: 1,
        total_trips: 138,
        status: "active",
        created_at: "2023-07-20T10:00:00.000Z",
    },
    {
        id: "4",
        dc_name: "Nagpur Warehouse DC",
        city: "Nagpur",
        address: "Plot 88, Butibori MIDC, Nagpur 441108",
        dc_manager_name: "Vijay Deshmukh",
        dc_manager_phone: "+91 87654 32109",
        dc_manager_email: "vijay.d@tanishq.com",
        // total_trucks: 3,
        // active_trucks: 0,
        // total_drivers: 3,
        // total_devices: 3,
        // active_devices: 3,
        active_trips: 0,
        total_trips: 54,
        status: "inactive",
        created_at: "2023-11-05T10:00:00.000Z",
    },
    {
        id: "5",
        dc_name: "Kolhapur DC",
        city: "Kolhapur",
        address: "Survey 101, Gokul Shirgaon, Kolhapur 416234",
        dc_manager_name: "Priya Kulkarni",
        dc_manager_phone: "+91 93422 65432",
        dc_manager_email: "priya.k@westside.com",
        // total_trucks: 5,
        // active_trucks: 3,
        // total_drivers: 6,
        // total_devices: 5,
        // active_devices: 2,
        active_trips: 3,
        total_trips: 201,
        status: "active",
        created_at: "2024-02-18T10:00:00.000Z",
    },
]

export default function SuperAdminManageDCs() {
    const [dcs, setDcs] = useState(initialDCs)
    const [searchInput, setSearchInput] = useState("")
    const [addOpen, setAddOpen] = useState(false)   

    const handleClear = () => setSearchInput("")

    const handleAddDC = (newDC) => {
        setDcs((prev) => [newDC, ...prev])
    }

    const handleEditDC = (updatedDC) => {
        setDcs((prev) =>
            prev.map((dc) =>
                dc.id === updatedDC.id ? { ...updatedDC } : dc
            )
        )
    }

    const handleDeleteDC = (dcId) => {
        setDcs((prev) => prev.filter((dc) => dc.id !== dcId))
    }

    const filteredDCs = useMemo(() => {
        const search = searchInput.trim().toLowerCase()

        if (!search) return dcs

        return dcs.filter((dc) =>
            dc.dc_name.toLowerCase().includes(search) ||
            dc.city.toLowerCase().includes(search) ||
            dc.address.toLowerCase().includes(search) ||
            dc.dc_manager_name.toLowerCase().includes(search)
        )
    }, [dcs, searchInput])

    return (
        <section className="mb-10">
            <AdminSubHeader
                to={'/admin'}
                heading="Manage DCs"
                subh="All data centers across all brands — add, edit, assign operators and manage trucks"
            />
            
            <DCsFilter 
               CreateButton={
                <Button
                onClick={() => setAddOpen(true)}
        className="w-full sm:w-auto bg-maroon hover:bg-maroon-dark text-white"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add DC
      </Button>
}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                handleClear={handleClear}
            />


            <AddDCForm
    open={addOpen}
    onClose={setAddOpen}
    onAddDC={handleAddDC}
/>
            
            <DCsTable 
                dcs={filteredDCs}
                onEditDC={handleEditDC}
                onDeleteDC={handleDeleteDC}
            />
        </section>
    )
}