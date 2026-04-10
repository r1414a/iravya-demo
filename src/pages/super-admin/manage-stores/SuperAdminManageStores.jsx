// SuperAdminManageStores.jsx
import AdminSubHeader from "@/components/AdminSubHeader"
import StoreForm from "@/components/manage-store/StoreForm"
import StoresFilter from "@/components/manage-store/StoresFilter"
import StoresTable from "@/components/manage-store/StoresTable"
import { selectUser } from "@/lib/features/auth/authSlice"
import { useMemo, useState } from "react"
import { useSelector } from "react-redux"

// Initial dummy data for stores
const initialStores = [
    {
        id: "1",
        name: "Westside — Koregaon Park",
        city: "Pune",
        address: "Shop 12, Phoenix Market City, Nagar Rd, Pune 411006",
        brand: "Tata Westside",
        managerName: "Arjun Joshi",
        managerPhone: "+91 98201 44321",
        managerEmail: "arjun.j@westside.com",
        publicTrackingSlug: "westside-koregaon-park",
        deliveriesToday: 2,
        totalDeliveries: 184,
        currentDevices: ["GPS-003-PUNE"],
        lastDelivery: "Today, 10:45 AM",
        status: "active",
        createdAt: "2023-01-10T10:00:00.000Z",
    },
    {
        id: "2",
        name: "Zudio — Hinjawadi",
        city: "Pune",
        address: "G-14, Xion Mall, Hinjawadi Phase 1, Pune 411057",
        brand: "Zudio",
        managerName: "Neha Patil",
        managerPhone: "+91 99705 12345",
        managerEmail: "neha.p@zudio.com",
        publicTrackingSlug: "zudio-hinjawadi",
        deliveriesToday: 1,
        totalDeliveries: 97,
        currentDevices: [],
        lastDelivery: "Today, 08:30 AM",
        status: "active",
        createdAt: "2023-03-15T10:00:00.000Z",
    },
    {
        id: "3",
        name: "Tata Cliq — FC Road",
        city: "Pune",
        address: "1st Floor, Westend Mall, FC Road, Pune 411004",
        brand: "Tata Cliq",
        managerName: "Sunita Mehta",
        managerPhone: "+91 91305 67890",
        managerEmail: "sunita.m@tatacliq.com",
        publicTrackingSlug: "tata-cliq-fc-road",
        deliveriesToday: 0,
        totalDeliveries: 122,
        currentDevices: ["GPS-007-PUNE"],
        lastDelivery: "Yesterday, 03:15 PM",
        status: "active",
        createdAt: "2023-06-20T10:00:00.000Z",
    },
    {
        id: "4",
        name: "Westside — Baner",
        city: "Pune",
        address: "Shop 4, Balewadi High St, Baner, Pune 411045",
        brand: "Tata Westside",
        managerName: "Kiran Sawant",
        managerPhone: "+91 87654 09876",
        managerEmail: "kiran.s@westside.com",
        publicTrackingSlug: "westside-baner",
        deliveriesToday: 1,
        totalDeliveries: 78,
        currentDevices: [],
        lastDelivery: "Today, 09:10 AM",
        status: "active",
        createdAt: "2023-09-10T10:00:00.000Z",
    },
    {
        id: "5",
        name: "Tanishq — Kothrud",
        city: "Pune",
        address: "Dahanukar Colony, Kothrud, Pune 411029",
        brand: "Tanishq",
        managerName: "Vijay Jadhav",
        managerPhone: "+91 93422 11234",
        managerEmail: "vijay.j@tanishq.com",
        publicTrackingSlug: "tanishq-kothrud",
        deliveriesToday: 0,
        totalDeliveries: 43,
        currentDevices: [],
        lastDelivery: "Mar 20, 11:00 AM",
        status: "inactive",
        createdAt: "2023-11-05T10:00:00.000Z",
    },
    {
        id: "6",
        name: "Zudio — Wakad",
        city: "Pune",
        address: "Spectrum Mall, Wakad, Pune 411057",
        brand: "Zudio",
        managerName: "Meera Agarwal",
        managerPhone: "+91 98765 43210",
        managerEmail: "meera.a@zudio.com",
        publicTrackingSlug: "zudio-wakad",
        deliveriesToday: 0,
        totalDeliveries: 61,
        currentDevices: [],
        lastDelivery: "Mar 22, 02:30 PM",
        status: "active",
        createdAt: "2024-01-18T10:00:00.000Z",
    },
]

export default function SuperAdminManageStores() {
    const {user} = useSelector(selectUser);

    const isadmin = user.role === 'super_admin'
    const [stores, setStores] = useState(initialStores)
    const [searchInput, setSearchInput] = useState("")

    const handleClear = () => setSearchInput("")

    const handleAddStore = (newStore) => {
        setStores((prev) => [newStore, ...prev])
    }

    const handleEditStore = (updatedStore) => {
        setStores((prev) =>
            prev.map((store) =>
                store.id === updatedStore.id ? { ...updatedStore } : store
            )
        )
    }

    const handleDeleteStore = (storeId) => {
        setStores((prev) => prev.filter((store) => store.id !== storeId))
    }

    const filteredStores = useMemo(() => {
        const search = searchInput.trim().toLowerCase()

        if (!search) return stores

        return stores.filter((store) =>
            store.name.toLowerCase().includes(search) ||
            store.city.toLowerCase().includes(search) ||
            store.brand.toLowerCase().includes(search) ||
            store.address.toLowerCase().includes(search) ||
            store.managerName.toLowerCase().includes(search)
        )
    }, [stores, searchInput])

    return (
        <section className="mb-10">
            <AdminSubHeader
                to={isadmin? '/admin': '/dc'}
                heading="Manage Stores"
                subh={
                    isadmin ? "All retail stores across all brands — add, edit, manage geofence and public tracking"
                    : "Stores this DC delivers to — track incoming deliveries, devices held and manager contacts"}
            />

            <StoresFilter 
                CreateButton={isadmin ? <StoreForm mode="add" onAddStore={handleAddStore} /> : null}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                handleClear={handleClear}
            />
            
            <StoresTable 
                stores={filteredStores}
                onEditStore={handleEditStore}
                onDeleteStore={handleDeleteStore}
            />
        </section>
    )
}