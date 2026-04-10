import { Link, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

function MenuCard({ item }) {
  return (
    <Card className="group transition-all duration-200 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.03] bg-white/95 hover:bg-white">
      <Link to={item.path}>
        <CardContent className="flex flex-col items-center justify-center gap-3 p-3 lg:p-4">
          <div
            className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center ${item.bg} shadow-md transition-transform duration-200 group-hover:scale-110`}
          >
            {item.icon}
          </div>

          <span className="text-xs font-semibold text-gray-600 text-center">
            {item.label}
          </span>
        </CardContent>
      </Link>
    </Card>
  );
}

export default function DashboardHomePageAdminTask({ tasks = [] }) {
  const {pathname} = useLocation();
  return (
    <main className="flex-1 flex items-center justify-center lg:px-6 pb-6">
      <div className="w-full max-w-150 grid gap-3 lg:gap-5 grid-cols-2 sm:grid-cols-3">
        {tasks.map((item, index) => {
          const isLast = index === tasks.length - 1 && pathname.startsWith('/admin');
          return (
            <div 
              key={item.key || index} 
              className={isLast ? "col-span-1 sm:col-span-3 flex justify-center" : ""}
            >
              <div className={isLast ? "w-full sm:w-1/3" : "w-full"}>
              <MenuCard key={item.label || index} item={item} />
                {/* <MenuCard item={item} /> */}
              </div>
            </div>
          )
        }
        )}
      </div>
    </main>
  );
}