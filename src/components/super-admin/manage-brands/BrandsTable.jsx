import { useState } from "react"
import BrandDetailDrawer from "./BrandDetailDrawer"
  
import { columns } from "./brands-table/columns"
import DataTable from "./brands-table/data-table"

const brands = [
    {
        id: 1,
        name: "Tata Westside",
        category: "Fashion & Lifestyle",
        contactPhone: "+91 22 6600 1234",
        contactEmail: "ops@westside.com",
        managerName: "Rohit Sharma",
        managerPhone: "+91 98200 11001",
        managerEmail: "rohit.sharma@westside.com",
        totalWarehouses: 3,
        totalTrucks: 18,
        todayDeliveries: 12,
        totalDeliveries: 1843,
        status: "active",
        createdAt: "Jan 2023",
    },
    {
        id: 2,
        name: "Zudio",
        category: "Value Fashion",
        contactPhone: "+91 22 6600 5678",
        contactEmail: "logistics@zudio.com",
        managerName: "Sneha Mehta",
        managerPhone: "+91 91234 56789",
        managerEmail: "sneha.mehta@zudio.com",
        totalWarehouses: 2,
        totalTrucks: 11,
        todayDeliveries: 7,
        totalDeliveries: 924,
        status: "active",
        createdAt: "Mar 2023",
    },
    {
        id: 3,
        name: "Tata Cliq",
        category: "E-commerce",
        contactPhone: "+91 22 6600 9012",
        contactEmail: "supply@tatacliq.com",
        managerName: "Aakash Verma",
        managerPhone: "+91 87654 90123",
        managerEmail: "aakash.v@tatacliq.com",
        totalWarehouses: 2,
        totalTrucks: 9,
        todayDeliveries: 4,
        totalDeliveries: 612,
        status: "active",
        createdAt: "Jul 2023",
    },
    {
        id: 4,
        name: "Tanishq",
        category: "Jewellery & Accessories",
        contactPhone: "+91 80 6600 3456",
        contactEmail: "distribution@tanishq.com",
        managerName: "Priti Nair",
        managerPhone: "+91 99800 77654",
        managerEmail: "priti.nair@tanishq.com",
        totalWarehouses: 1,
        totalTrucks: 5,
        todayDeliveries: 0,
        totalDeliveries: 218,
        status: "inactive",
        createdAt: "Nov 2023",
    },
    {
        id: 5,
        name: "Croma",
        category: "Electronics Retail",
        contactPhone: "+91 22 7100 1122",
        contactEmail: "ops@croma.com",
        managerName: "Deepak Pillai",
        managerPhone: "+91 93400 22334",
        managerEmail: "deepak.pillai@croma.com",
        totalWarehouses: 4,
        totalTrucks: 22,
        todayDeliveries: 18,
        totalDeliveries: 3201,
        status: "active",
        createdAt: "Feb 2022",
    },
]

export default function BrandsTable() {
    const [selectedBrand, setSelectedBrand] = useState(null)

    return (
        <section className="mt-6 px-10">
            <div className="border rounded-lg">
                <DataTable
                    columns={columns}
                    data={brands}
                    onRowClick={setSelectedBrand}
                />
            </div>

            <BrandDetailDrawer
                brand={selectedBrand}
                open={!!selectedBrand}
                onClose={() => setSelectedBrand(null)}
            />
        </section>
    )
}