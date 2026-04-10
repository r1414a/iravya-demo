import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useSelector((state) => state.auth)

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}