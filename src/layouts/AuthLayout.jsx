import AuthLoader from "@/AuthLoader";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* No navbar OR simple auth navbar */}
      <Outlet />
    </div>
    //   {/*<AuthLoader>*/}
    //  {/*</AuthLoader> */}
  );
}