import DashboardHomePageAdminTask from "@/components/DashboardHomePageAdminTasks"
import { DC_TASKS } from "@/constants/tasks"

export default function DCHome() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#701a40] to-[#5a1430] p-6">

      {/* Heading */}
      <div className="text-center mb-10">
        {/* <h1 className="text-3xl font-light text-white">
          Welcome to dashboard!.
        </h1> */}
        <p className="text-white/70 text-lg lg:text-xl mt-2 leading-6 tracking-tight">
          Manage trucks, drivers, stores, trips, gps devices.
        </p>
      </div>

      {/* Super Admin Task In Card Grid */}
      <DashboardHomePageAdminTask tasks={DC_TASKS} />
    </div>
  )
}