// import { ArrowLeft } from "lucide-react"
// import { Link } from "react-router-dom"
import AdminSubHeader from "@/components/AdminSubHeader"
import AddBrandForm from "@/components/super-admin/manage-brands/addBrandsForm"
import BrandFilter from "@/components/super-admin/manage-brands/BrandFilter"
import BrandsTable from "@/components/super-admin/manage-brands/BrandsTable"
AdminSubHeader

export default function SuperAdminManageBrands() {
    return (
        <section className="mb-10">

            <AdminSubHeader
                to={'/admin'}
                heading="Manage Brands"
                subh="Add brands —  edit, assign operators"
                CreateButton={<AddBrandForm />}
            />
            {/* <div className="h-18 px-10 flex gap-4 items-center shadow-md">
                <Link to={'/admin'} className="bg-gold hover:bg-gold-dark p-2 rounded-full">
                    <ArrowLeft size={18} className="text-maroon" />
                </Link>
                <div className="flex items-center justify-between w-full">
                    <div className="-space-y-1">
                        <h1 className="text-lg">Manage Warehouses</h1>
                        <p className="text-sm text-gray-500">
                            All data centers across all brands — add, edit, assign operators and manage trucks
                        </p>
                    </div>
                    <AddDCForm />
                </div>
            </div> */}

            <BrandFilter />
            <BrandsTable /> 
        </section>
    )
}