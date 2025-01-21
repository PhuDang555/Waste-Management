import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../components/layout/MainLayout";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import DataInputPage from "../pages/DataInputPage";
import CollectionManagementPage from "../pages/CollectionManagementPage";
import StatisticsReport from "../pages/StatisticsReport";
import RecyclingProcessPage from "../pages/recyclingProcessPage";
import CapabilityPage from "../pages/capabilityPage";
import SupportPage from "../pages/SupportPage";
import ReservationPage from "../pages/ReservationPage";
import CollectionDetailPage from "../pages/CollectionDetailPage";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <LoginPage />
            },
            {
                path:"dashboard",
                element:<MainLayout />,
                children: [
                    {
                        index: true,
                        element: <DashboardPage />
                    },
                    {
                        path:"profile",
                        index: true,
                        element: <ProfilePage />
                    },
                    {
                        path:"data-input",
                        index: true,
                        element: <DataInputPage />
                    },
                    {
                        path:"collect-manage",
                        children: [
                            {
                                index: true,
                                element: <CollectionManagementPage />
                            },
                            {
                                path:":id",
                                index: true,
                                element: <CollectionDetailPage />
                            },
                            // {
                            //     path:"edit/:id",
                            //     element: <CollectionEditPage />
                            // }
                        ]
                    },
                    {
                        path:"report",
                        index: true,
                        element: <StatisticsReport />
                    },
                    {
                        path:"recycling",
                        index: true,
                        element: <RecyclingProcessPage />,
                    },
                    {
                        path:"capability",
                        index: true,
                        element: <CapabilityPage />
                    },
                    {
                        path:"support",
                        index: true,
                        element: <SupportPage />
                    },
                    {
                        path:"reservation",
                        index: true,
                        element: <ReservationPage />
                    },
                ]
            },
        ]
    }
])