
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import EditUserDrawer from "./EditUserDrawer"
import { useState } from "react"
import { Pencil } from "lucide-react"
import DeleteModal from "@/components/DeleteModal"
import { getNameInitials } from "@/lib/utils/getNameInitials"
import { ROLES, STATUS } from "@/constants/constant"
import {formatDistanceToNow, parseISO} from "date-fns"

const BRANDS = ["Tata Westside", "Zudio", "Tata Cliq", "Tanishq"]
const STATUS_COLOR = {
  active: "bg-green-100  border-green-200 text-green-700",
  inactive: "bg-red-100  border-red-200 text-red-700",
  // pending: "bg-yellow-100 border border-yellow-600 text-yellow-600",
}

function ActionsCell({ row }) {
  const user = row.original;
  const [editUser, setEditUser] = useState(false);
  return (
    <>
      <EditUserDrawer
        open={editUser} setOpen={setEditUser} selectedUser={user}
      />

      <div className="flex items-center gap-2 justify-end">
        <Button variant="outline" size="xs" onClick={() => setEditUser(true)} className="hover:bg-maroon cursor-pointer text-blue-800 hover:text-white"><Pencil size={16} /></Button>
        <DeleteModal
          who={user.name}
          m1active="User will immediately lose access to the platform"
        />

      </div>
    </>
  )
}

export const columns = [
  {
    accessorKey: "name",
    header: "USERS",
    cell: ({ row }) => {
      const user = row.original

      return (
        <div className="flex gap-4 items-center">
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold p-1 bg-gold text-white">
            {getNameInitials(user.first_name, user.last_name)}
          </div>
          <div>
            <p>{user.first_name} {user.last_name}</p>
            <p className="text-xs text-muted-foreground">
              {user.role !== 'driver' ? user.email : user.phone_number}
            </p>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      const current = column.getFilterValue() || "all";
      return (
        <div className="flex items-center gap-2">
          <span>Role</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-6 min-w-18 text-[10px]"
              >
                {current === "all" ? "All" : ROLES[current].text}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 bg-white border shadow-md">
              <DropdownMenuRadioGroup
                value={current}
                onValueChange={(val) =>
                  column.setFilterValue(val === "all" ? undefined : val)
                }
              >
                <DropdownMenuRadioItem value="all" className="text-xs">
                  All roles
                </DropdownMenuRadioItem>
                {Object.entries(ROLES).map(([key, value]) => (
                  <DropdownMenuRadioItem key={key} value={key} className="text-xs">
                    {value.text}
                  </DropdownMenuRadioItem>
                ))
                }
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    cell: ({ row }) => {
      const role = row.getValue("role")
      return (
        <span className={`${ROLES[role.toLowerCase()].color} inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border`}>
          {ROLES[role].text}
        </span>
      )
    },
    filterFn: (row, id, value) =>
      !value || row.getValue(id).toLowerCase() === value.toLowerCase(),
  },
  // {
  //   accessorKey: "brand",
  //   header: ({ column }) => {
  //     const current = column.getFilterValue() || "all"
  //     return (
  //       <div className="flex items-center gap-2">
  //         <span>Brand</span>
  //         <DropdownMenu>
  //           <DropdownMenuTrigger asChild>
  //             <Button variant="outline" size="sm" className="h-6 min-w-18 text-[10px]">
  //               {current === "all" ? "All" : current.split(" ")[1] ?? current}
  //             </Button>
  //           </DropdownMenuTrigger>
  //           <DropdownMenuContent className="w-40 bg-white border shadow-md">
  //             <DropdownMenuRadioGroup
  //               value={current}
  //               onValueChange={(val) =>
  //                 column.setFilterValue(val === "all" ? undefined : val)
  //               }
  //             >
  //               <DropdownMenuRadioItem value="all" className="text-xs">All brands</DropdownMenuRadioItem>
  //               {BRANDS.map((b) => (
  //                 <DropdownMenuRadioItem key={b} value={b} className="text-xs">{b}</DropdownMenuRadioItem>
  //               ))}
  //             </DropdownMenuRadioGroup>
  //           </DropdownMenuContent>
  //         </DropdownMenu>
  //       </div>
  //     )
  //   },
  //   cell: ({ row }) => (
  //     <span className="text-sm text-gray-700">{row.getValue("brand")}</span>
  //   ),
  //   filterFn: (row, id, value) => !value || row.getValue(id) === value,
  // },
  {
    accessorKey: "scope",
    header: "SCOPE",
  },
  {
    accessorKey: "last_login",
    header: "LAST LOGIN",
    cell: ({row}) => {
      const lastLogin = row.getValue("last_login");
      // console.log(lastLogin);

      if(!lastLogin) return <span className="text-gray-400">-</span>

      const relativeTime = formatDistanceToNow(parseISO(lastLogin), {
        addSuffix: true
      })

      return(
        <p className="text-gray-600 capitalize">{relativeTime.replace('about', '')}</p>
      )
    }
  },
  {
    accessorKey: "user_status",
    header: ({ column }) => {
      const currentValue = column.getFilterValue() || "all";

      return (
        <div className="flex items-center gap-2">
          <span>Status</span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-6 min-w-18 text-[10px]">
                {currentValue === "all"
                  ? "All"
                  : currentValue === "inactive"
                    ? "In active"
                    : currentValue.charAt(0).toUpperCase() + currentValue.slice(1)}
              </Button>
              {/* <Filter size={16} fill="#701a40" stroke=" #701a40" /> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 bg-white border shadow-md">
              <DropdownMenuRadioGroup
                value={currentValue}
                onValueChange={(value) => {
                  column.setFilterValue(
                    value === "all" ? undefined : value
                  )
                }}
              >
                <DropdownMenuRadioItem value="all" className="text-xs">
                  All
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="active" className="text-xs">
                  Active
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="inactive" className="text-xs">
                  In active
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    cell: ({ row }) => {
      const s = row.original.user_status
      return (
        <span className={`${STATUS[s].color} inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border`}>
          {STATUS[s].text}
        </span>
      )
    },
    filterFn: (row, id, value) => {

      if (!value) return true
      return row.getValue(id) === value
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} />,
  },
]