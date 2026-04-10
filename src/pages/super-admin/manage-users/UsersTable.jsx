import { DataTable } from "./users-table/data-table";
import { columns } from "./users-table/columns";
import { useGetAllUsersQuery } from "@/lib/features/users/userApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useState } from "react";


const users = [
    // { id:1,initials: 'RS', color: 'ua-teal', name: 'Rahul Sharma', email: 'rahul.sharma@westside.com', role: 'Brand manager', roleClass: 'rb-brand', brand: 'Tata Westside', scope: 'All DCs & Stores', lastLogin: '2h ago', loginDate: 'Today, 09:14 AM', since: 'Jan 2024', status: 'active' },
    { id:2,initials: 'PK', color: 'ua-purple', name: 'Priya Kulkarni', email: 'priya.k@zudio.com', role: 'DC operator', roleClass: 'rb-dc', brand: 'Zudio', scope: 'Pune Warehouse DC', lastLogin: '5h ago', loginDate: 'Today, 06:22 AM', since: 'Mar 2024', status: 'active' },
    { id:3,initials: 'AJ', color: 'ua-coral', name: 'Arjun Joshi', email: 'arjun.j@tatacliq.com', role: 'Store manager', roleClass: 'rb-store', brand: 'Tata Cliq', scope: 'Koregaon Park Store', lastLogin: 'Yesterday', loginDate: 'Mar 24, 03:10 PM', since: 'Nov 2023', status: 'active' },
    { id:4,initials: 'NP', color: 'ua-purple', name: 'Neha Patil', email: 'neha.p@tanishq.com', role: 'Store manager', roleClass: 'rb-store', brand: 'Tanishq', scope: 'Hinjawadi Store', lastLogin: '5 days ago', loginDate: 'Mar 20, 02:15 PM', since: 'Apr 2024', status: 'inactive' },
    // { id:5,initials: 'SM', color: 'ua-green', name: 'Sunita Mehta', email: 'sunita.m@westside.com', role: 'Brand manager', roleClass: 'rb-brand', brand: 'Tata Westside', scope: 'All DCs & Stores', lastLogin: '2 days ago', loginDate: 'Mar 23, 11:45 AM', since: 'Feb 2024', status: 'active' },
    { id:6,initials: 'VR', color: 'ua-amber', name: 'Vikram Rao', email: 'vikram.r@zudio.com', role: 'DC operator', roleClass: 'rb-dc', brand: 'Zudio', scope: 'Mumbai Warehouse DC', lastLogin: '3 days ago', loginDate: 'Mar 22, 09:30 AM', since: 'Dec 2023', status: 'active' },
    { id:7,initials: 'KS', color: 'ua-teal', name: 'Kiran Sawant', email: 'kiran.s@tatacliq.com', role: 'DC operator', roleClass: 'rb-dc', brand: 'Tata Cliq', scope: 'Nashik DC', lastLogin: '1 week ago', loginDate: 'Mar 18, 10:00 AM', since: 'Feb 2023', status: 'active' },
    // { id:8,initials: 'MA', color: 'ua-coral', name: 'Meera Agarwal', email: 'meera.a@westside.com', role: 'Store manager', roleClass: 'rb-store', brand: 'Tata Westside', scope: 'FC Road Store', lastLogin: 'Never', loginDate: '—', since: 'Mar 2026', status: 'pending' },
];

export default function UsersTable() {
    const [page, setPage] = useState(1);
    const {data, isLoading, isFetching} = useGetAllUsersQuery({
        page,
        limit: 10
    });
    console.log("allusers", data,page)

    if(isLoading){
        return <LoadingSpinner/>
    }
    return (
        
        <section className="mt-6 px-4 lg:px-10">
            <div className="border rounded-lg">
                <DataTable 
                    columns={columns} 
                    data={data?.data?.users || []}
                    page={data?.data?.page || 1}
                    totalPages={data?.data?.totalPages || 1}
                    onPrevious={() => setPage((prev) => Math.max(prev-1,1))}
                    onNext={() => setPage((prev) => prev < (data?.data?.totalPages || 1) ? prev + 1 : prev)}
                    isFetching={isFetching}
                />
                
            </div>
        </section>
    )
}