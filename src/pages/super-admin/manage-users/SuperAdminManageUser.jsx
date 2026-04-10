// SuperAdminManageUser.jsx
import UsersFilter from "./UsersFilter"
import UsersTable from "./UsersTable"
import AdminSubHeader from "@/components/AdminSubHeader"
import CreateUserModal from "./CreateUserModal"
import { useMemo, useState } from "react"

// Initial dummy data for users
const initialUsers = [
    {
        id: "1",
        first_name: "Rahul",
        last_name: "Sharma",
        email: "rahul.sharma@westside.com",
        phone_number: "+91 98201 11234",
        role: "dc_manager",
        scope: "Pune Warehouse DC",
        last_login: "2024-04-09T14:30:00.000Z",
        user_status: "active",
        createdAt: "2023-01-15T10:00:00.000Z",
    },
    {
        id: "2",
        first_name: "Priya",
        last_name: "Kulkarni",
        email: "priya.k@zudio.com",
        phone_number: "+91 99705 44321",
        role: "store_manager",
        scope: "Koregaon Park Store",
        last_login: "2024-04-08T09:15:00.000Z",
        user_status: "active",
        createdAt: "2023-03-20T10:00:00.000Z",
    },
    {
        id: "3",
        first_name: "Amit",
        last_name: "Deshmukh",
        email: "amit.d@tatacliq.com",
        phone_number: "+91 91305 77654",
        role: "dc_manager",
        scope: "Mumbai Warehouse DC",
        last_login: "2024-04-07T16:45:00.000Z",
        user_status: "active",
        createdAt: "2023-06-10T10:00:00.000Z",
    },
    {
        id: "4",
        first_name: "Sneha",
        last_name: "Patil",
        email: "sneha.p@tanishq.com",
        phone_number: "+91 87654 32109",
        role: "store_manager",
        scope: "Hinjawadi Store",
        last_login: null,
        user_status: "inactive",
        createdAt: "2023-09-05T10:00:00.000Z",
    },
    {
        id: "5",
        first_name: "Vikram",
        last_name: "Joshi",
        email: "vikram.j@westside.com",
        phone_number: "+91 93422 65432",
        role: "dc_manager",
        scope: "Nashik DC",
        last_login: "2024-04-09T11:20:00.000Z",
        user_status: "active",
        createdAt: "2023-11-12T10:00:00.000Z",
    },
    {
        id: "6",
        first_name: "Anjali",
        last_name: "Mehta",
        email: "anjali.m@zudio.com",
        phone_number: "+91 98765 43210",
        role: "store_manager",
        scope: "FC Road Store",
        last_login: "2024-04-09T08:00:00.000Z",
        user_status: "active",
        createdAt: "2024-01-08T10:00:00.000Z",
    },
    {
        id: "7",
        first_name: "Ravi",
        last_name: "Kumar",
        email: null,
        phone_number: "+91 98201 99999",
        role: "driver",
        scope: null,
        last_login: "2024-04-09T07:30:00.000Z",
        user_status: "active",
        createdAt: "2024-02-14T10:00:00.000Z",
    },
]

export default function SuperAdminManageUser() {
    const [users, setUsers] = useState(initialUsers)
    const [searchInput, setSearchInput] = useState("")

    const handleClear = () => setSearchInput("")

    const handleAddUser = (newUser) => {
        setUsers((prev) => [newUser, ...prev])
    }

    const handleEditUser = (updatedUser) => {
        setUsers((prev) =>
            prev.map((user) =>
                user.id === updatedUser.id ? { ...updatedUser } : user
            )
        )
    }

    const handleDeleteUser = (userId) => {
        setUsers((prev) => prev.filter((user) => user.id !== userId))
    }

    const filteredUsers = useMemo(() => {
        const search = searchInput.trim().toLowerCase()

        if (!search) return users

        return users.filter((user) =>
            user.first_name.toLowerCase().includes(search) ||
            user.last_name.toLowerCase().includes(search) ||
            user.email?.toLowerCase().includes(search) ||
            user.phone_number?.toLowerCase().includes(search) ||
            user.scope?.toLowerCase().includes(search)
        )
    }, [users, searchInput])

    return (
        <section className="mb-10">
            <AdminSubHeader
                to={'/admin'}
                heading="Manage Users"
                subh="Manage users across all brands — invite, edit roles, deactivate and reset passwords"
            />

            <UsersFilter 
                CreateButton={<CreateUserModal onAddUser={handleAddUser} />}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                handleClear={handleClear}
            />
            
            <UsersTable 
                users={filteredUsers}
                onEditUser={handleEditUser}
                onDeleteUser={handleDeleteUser}
            />
        </section>
    )
}