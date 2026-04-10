        import AdminSubHeader from "@/components/AdminSubHeader"
        import DriversFilter from "@/components/manage-driver/DriversFilter"
        import DriversTable from "@/components/manage-driver/DriversTable"
        import ManageDriverForm from "@/components/manage-driver/ManageDriverForm"
        import { initialDrivers } from "@/constants/seed_data"
        import { selectUser } from "@/lib/features/auth/authSlice"
        import { useMemo, useState } from "react"
        import { useSelector } from "react-redux"

        // const INITIAL_DRIVERS = [
        //     {
        //         id: "1",
        //         first_name: "Ravi",
        //         last_name: "Deshmukh",
        //         full_name: "Ravi Deshmukh",
        //         phone_number: "+91 98201 11234",
        //         licence_no: "MH1220190012345",
        //         licence_class: "hmv",
        //         licence_expiry: "2027-08-12",
        //         current_trip: "TRP-2841",
        //         total_trips: 142,
        //         trips_this_month: 9,
        //         driver_status: "On trip",
        //         createdAt: "2023-01-10T10:00:00.000Z",
        //     },
        //     {
        //         id: "2",
        //         first_name: "Suresh",
        //         last_name: "Pawar",
        //         full_name: "Suresh Pawar",
        //         phone_number: "+91 99705 44321",
        //         licence_no: "MH1420180056789",
        //         licence_class: "hgmv",
        //         licence_expiry: "2026-03-15",
        //         current_trip: "TRP-4841",
        //         total_trips: 87,
        //         trips_this_month: 5,
        //         driver_status: "On trip",
        //         createdAt: "2023-06-10T10:00:00.000Z",
        //     },
        //     {
        //         id: "3",
        //         first_name: "Anil",
        //         last_name: "Bhosale",
        //         full_name: "Anil Bhosale",
        //         phone_number: "+91 91305 77654",
        //         licence_no: "MH1220210078901",
        //         licence_class: "lmv",
        //         licence_expiry: "2028-11-22",
        //         current_trip: null,
        //         total_trips: 34,
        //         trips_this_month: 2,
        //         driver_status: "Available",
        //         createdAt: "2024-09-10T10:00:00.000Z",
        //     },
        // ]

        export default function SuperAdminManageDrivers() {
            const {user} = useSelector(selectUser);

            const isadmin = user.role === 'super_admin'
            const [drivers, setDrivers] = useState(initialDrivers)
            const [searchInput, setSearchInput] = useState("")

            const handleClear = () => setSearchInput("")

            const handleAddDriver = (newDriver) => {
                setDrivers((prev) => [newDriver, ...prev])
            }

            const handleEditDriver = (updatedDriver) => {
                setDrivers((prev) =>
                    prev.map((driver) =>
                        driver.id === updatedDriver.id ? { ...updatedDriver } : driver
                    )
                )
            }

            const handleDeleteDriver = (driverId) => {
                setDrivers((prev) => prev.filter((driver) => driver.id !== driverId))
            }

            const filteredDrivers = useMemo(() => {
                const search = searchInput.trim().toLowerCase()

                if (!search) return drivers

                return drivers.filter((driver) =>
                    driver.full_name.toLowerCase().includes(search) ||
                    driver.phone_number.toLowerCase().includes(search)
                )
            }, [drivers, searchInput])

            return (
                <section className="mb-10">
                    <AdminSubHeader
                        to={isadmin? '/admin': '/dc'}
                        heading="Manage Drivers"
                        subh={
                            isadmin ? "Manage drivers — view, edit, trip status, details, history, and deactivate":
                            "Manage drivers at this DC — add, edit, trip status, details, history, and deactivate"}
                    />

                    <DriversFilter
                        CreateButton={isadmin ? <ManageDriverForm onAddDriver={handleAddDriver} /> : null}
                        searchInput={searchInput}
                        setSearchInput={setSearchInput}
                        handleClear={handleClear}
                    />

                    <DriversTable
                        drivers={filteredDrivers}
                        onEditDriver={handleEditDriver}
                        onDeleteDriver={handleDeleteDriver}
                    />
                </section>
            )
        }