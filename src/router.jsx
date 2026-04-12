import { createBrowserRouter } from "react-router-dom";
import {lazy} from "react";
import ProtectedRoute from "./ProtectedRoute";
import { ROLES } from "./constants/constant";


const Auth = lazy(() => import("./pages/auth/Auth"))

const AuthLayout = lazy(() => import("./layouts/AuthLayout"))
const AdminLayout = lazy(() => import("./layouts/AdminLayout"))

const SuperAdminHome = lazy(() => import("./pages/super-admin/SuperAdminHome"));
const SuperAdminManageUser = lazy(() => import("./pages/super-admin/manage-users/SuperAdminManageUser"));


const DCHome = lazy(() => import("./pages/dc-operator/DCHome"));
const DCManageTrips = lazy(() => import("./pages/dc-operator/manage-trips/DCManageTrips"));
const DCManageDrivers = lazy(() => import("./pages/dc-operator/manage-drivers/DCManageDrivers"));
const DCManageTrucks = lazy(() => import("./pages/dc-operator/manage-trucks/DCManageTrucks"));
const DCManageStores = lazy(() => import("./pages/dc-operator/manage-stores/DCManageStores"));
const DCManageDevices = lazy(() => import("./pages/dc-operator/manage-gps-device/DCManageDevices"));


const SuperAdminManageTrips = lazy(() => import("./pages/super-admin/manage-trips/SuperAdminManageTrips"));
const SuperAdminManageDCs = lazy(() => import("./pages/super-admin/manage-dcs/SuperAdminManageDCS"));
const SuperAdminManageDrivers = lazy(() => import("./pages/super-admin/manage-drivers/SuperAdminManageDrivers"));
const SuperAdminManageTrucks = lazy(() => import("./pages/super-admin/manage-trucks/SuperAdminManageTrucks"));
const SuperAdminManageStores = lazy(() => import("./pages/super-admin/manage-stores/SuperAdminManageStores"));
const SuperAdminSettings = lazy(() => import("./pages/super-admin/settings/SuperAdminSettings"));
const SuperAdminAlerts = lazy(() => import("./pages/super-admin/alerts/SuperAdminAlerts"));
const SuperAdminManageDevices = lazy(() => import("./pages/super-admin/manage-devices/SuperAdminManageDevices"));
const SuperAdminManageBrands = lazy(() => import("./pages/super-admin/manage-brands/SuperAdminManageBrands"));


const TrackTrip = lazy(() => import("./pages/track-trip/TrackTrip"))


const DriverDashboard = lazy(() => import("./pages/driver/DriverDashboard"))


const Analytics = lazy(() => import("@/pages/super-admin/analytics/Analytics"))
const DCLiveMap = lazy(() => import("@/pages/dc-operator/live-track/DCLiveMap"))




const router = createBrowserRouter([
    //Auth Routes
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <Auth />
            }
        ]
    },

    //Admin Routes
    {
        element: <ProtectedRoute allowedRoles={[ROLES.super_admin.role]} />,
        children: [
            {
                path: '/admin',
                element: <AdminLayout />,
                children: [
                    {
                        index: true,
                        element: <SuperAdminHome />
                    },
                    {
                        path: "manage-dcs",
                        element: <SuperAdminManageDCs />
                    },
                    {
                        path: "manage-gps-devices",
                        element: <SuperAdminManageDevices />
                    },
                    {
                        path: "manage-users",
                        element: <SuperAdminManageUser />
                    },
                    {
                        path: "manage-trips",
                        element: <SuperAdminManageTrips />
                    },
                    {
                        path: "manage-drivers",
                        element: <SuperAdminManageDrivers />
                    },
                    {
                        path: "manage-trucks",
                        element: <SuperAdminManageTrucks />
                    },
                    {
                        path: "manage-stores",
                        element: <SuperAdminManageStores />
                    },
                    {
                        path: "settings",
                        element: <SuperAdminSettings />
                    },
                    {
                        path: "analytics",
                        element: <Analytics/>
                    },
                    {
                        path: "alerts",
                        element: <SuperAdminAlerts />
                    },
                    {
                        path: "manage-brands",
                        element: <SuperAdminManageBrands />
                    }


                ]
            }
        ]

    },
    //DC Routes
    {
        element: <ProtectedRoute allowedRoles={[ROLES.dc_manager.role]} />,
        children: [
            {
                path: '/dc',
                element: <AdminLayout />,
                children: [
                    {
                        index: true,
                        element: <DCHome />
                    },
                    {
                        path: 'manage-trips',
                        element: <DCManageTrips />
                    },
                    {
                        path: 'manage-drivers',
                        element: <DCManageDrivers />
                    },
                    {
                        path: "manage-trucks",
                        element: <DCManageTrucks />
                    },
                    {
                        path: "manage-gps-devices",
                        element: <DCManageDevices />
                    },
                    //more pages
                    {
                        path: 'manage-stores',
                        element: <DCManageStores />
                    },
                    {
                        path: 'track',
                        element: <DCLiveMap/>
                    }
                ]
            }

        ]

    },
    //Driver Route
    {
        path: "/driver",
        element: <DriverDashboard/>
    },

    //Tracking Public Route
    {
        path: '/track',
        element: <TrackTrip />
        // element: <AdminLayout />,
        // children: [
        //     {
        //         index: true,
        //     },
        // ]
    }
])

export default router;
