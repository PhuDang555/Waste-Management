import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../components/layout/MainLayout";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";

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
                    }
                ]
            },
        ]
    }
])