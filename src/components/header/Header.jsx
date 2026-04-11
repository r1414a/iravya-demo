import { Link, useNavigate } from "react-router-dom"
import { LogOut } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"

import { selectUser, clearUser } from "@/lib/features/auth/authSlice"
import { useDispatch, useSelector } from "react-redux"
import { ROLES } from "@/constants/constant"
import { showSuccessToast } from "@/lib/utils/showSuccessToast"

export default function Header() {
  const { user, notifications } = useSelector(selectUser)
  console.log(user, notifications);
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(clearUser())
    localStorage.removeItem("demo-auth-user")
    showSuccessToast('See you soon!.')
    navigate("/", { replace: true })
  }

  const firstInitial =
    user?.first_name?.charAt(0) ||
    user?.name?.charAt(0) ||
    "A"

  const lastInitial =
    user?.last_name?.charAt(0) ||
    user?.name?.split(" ")?.[1]?.charAt(0) ||
    "M"

  const displayName = user?.first_name && user?.last_name
    ? `${user.first_name} ${user.last_name}`
    : user?.name || "Admin Manager"

  const roleText = user?.role && ROLES[user.role]
    ? ROLES[user.role].text
    : "User"

  return (
    <div className="bg-zinc-100 sticky top-0 z-50">
      <nav className="w-full px-4 lg:px-6 h-16 flex items-center justify-between bg-maroon shadow-lg">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-amber-500 text-maroon border-2 border-orange-200 font-bold text-lg shadow-md">
            I
          </div>

          <Link
            to={user?.role === "super_admin" ? "/admin" : "/dc"}
            className="flex flex-col leading-tight"
          >
            <span className="font-bold text-white text-sm">Iravya</span>
            <span className="text-[10px] font-semibold tracking-widest uppercase text-rose-200">
              Manager
            </span>
          </Link>
        </div>

        {/* Right: User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center cursor-pointer">
              <span className="hidden sm:block text-xs font-semibold text-white tracking-wide">
                {user
                  ? `${displayName}`
                  : "Admin Manager"}
              </span>

              <Button
                variant="ghost"
                className="flex items-center gap-2 px-2 py-1.5 hover:bg-transparent focus-visible:ring-0"
              >
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-amber-500 text-maroon font-bold border-2 border-orange-200">
                    {firstInitial}
                    {lastInitial}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-44 mt-2 bg-white">
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-500 focus:text-red-600 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  )
}