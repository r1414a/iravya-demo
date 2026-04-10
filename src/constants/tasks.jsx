import { BookUser, Building2, ChartNoAxesCombined, LocateFixed, Road, Settings, Siren, Store, Truck, Warehouse } from "lucide-react";


export const SUPER_ADMIN_TASKS = [
  // { key: "brands", label: "Brands", icon: <Building2 size={35} color="white"strokeWidth={1}/>, bg: "bg-pink-700 shadow-lg shadow-pink-500/40", path: "/admin/manage-brands" },
  { key: "users", label: "Users", icon: <BookUser size={35} color="white"strokeWidth={1}/>, bg: "bg-sky-700 shadow-lg shadow-sky-700/40", path: "/admin/manage-users" },
  { key: "dcs", label: "DC's", icon: <Warehouse size={35} color="white"strokeWidth={1}/>, bg: "bg-amber-700 shadow-lg shadow-amber-700/40", path: "/admin/manage-dcs" },
  { key: "stores", label: "Stores", icon: <Store size={35} color="white"strokeWidth={1}/>, bg: "bg-cyan-700 shadow-lg shadow-cyan-700/40", path: "/admin/manage-stores" },
  { key: "trips", label: "View Trips", icon: <Road size={35} color="white"strokeWidth={1}/>, bg: "bg-slate-800 shadow-lg shadow-slate-800/40", path: "/admin/manage-trips" },
  { key: "drivers", label: "Drivers", icon: <BookUser size={35} color="white"strokeWidth={1}/>, bg:  "bg-amber-700 shadow-lg shadow-amber-700/40", path: "/admin/manage-drivers" },
  { key: "trucks", label: "Trucks", icon: <Truck size={35} color="white"strokeWidth={1}/>, bg: "bg-violet-600 shadow-lg shadow-violet-600/40", path: "/admin/manage-trucks" },
  { key: "devices", label: "GPS Devices", icon: <LocateFixed size={35} color="white"strokeWidth={1}/>, bg: "bg-teal-700 shadow-lg shadow-teal-700/40", path: "/admin/manage-gps-devices" },
   { key: "alerts", label: "Alerts", icon: <Siren size={35} color="white"strokeWidth={1}/>, bg: "bg-red-800 shadow-lg shadow-red-800/40", path: "/admin/alerts" },
  { key: "analytics", label: "Analytics", icon: <ChartNoAxesCombined strokeWidth={1} size={35} color="white"/>, bg: "bg-yellow-700 shadow-lg shadow-yellow-700/40", path: "/admin/analytics" },
  { key: "settings", label: "Settings", icon: <Settings size={35} color="white" strokeWidth={1}/>,  bg: "bg-green-500 shadow-lg shadow-green-500/40", path: "/admin/settings" },
];

export const DC_TASKS = [
  { key: "trips", label: "Trips", icon: <Road size={35} color="white"strokeWidth={1}/>, bg: "bg-slate-800 shadow-lg shadow-slate-800/40", path: "/dc/manage-trips" },
  { key: "stores", label: "Stores", icon: <Store size={35} color="white"strokeWidth={1}/>, bg: "bg-cyan-700 shadow-lg shadow-cyan-700/40", path: "/dc/manage-stores" },
  { key: "drivers", label: "Drivers", icon: <BookUser size={35} color="white"strokeWidth={1}/>, bg:  "bg-amber-700 shadow-lg shadow-amber-700/40", path: "/dc/manage-drivers" },
  { key: "trucks", label: "Trucks", icon: <Truck size={35} color="white"strokeWidth={1}/>, bg: "bg-violet-600 shadow-lg shadow-violet-600/40", path: "/dc/manage-trucks" },
  { key: "devices", label: "GPS Devices", icon: <LocateFixed size={35} color="white"strokeWidth={1}/>, bg: "bg-teal-700 shadow-lg shadow-teal-700/40", path: "/dc/manage-gps-devices" },
];