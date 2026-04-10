import DashboardHomePageAdminTask from "@/components/DashboardHomePageAdminTasks"
import { SUPER_ADMIN_TASKS } from "@/constants/tasks"

export default function SuperAdminHome() {
  return (
    <div className="min-h-screen bg-linear-to-br from-maroon to-maroon-dark p-6">

      {/* Heading */}
      <div className="text-center mb-10">
        {/* <h1 className="text-3xl font-light text-white">
          Welcome to dashboard!.
        </h1> */}
        <p className="text-white/70 text-lg lg:text-xl mt-2 leading-6 tracking-tight">
          Manage platform, brands, dc's, devices, stores and view trips
        </p>
      </div>

      {/* Super Admin Task In Card Grid */}
      <DashboardHomePageAdminTask tasks={SUPER_ADMIN_TASKS}/>
    </div>
  )
}