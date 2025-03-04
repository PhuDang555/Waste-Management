import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import LoginPage from "../pages/LoginPage";
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
import MainLayout from "../components/layout/MainLayout";
import AdminLayout from "../components/layout/AdminLayout";
import FunctionAdminPage from "../pages/FunctionAdminPage";
import DataInputAdminPage from "../pages/DataInputAdminPage";
import PermissionsManagement from "../pages/PermissionsManagement";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <LoginPage />,
        },
        {
          path: "dashboard",
          element: <MainLayout />, // Layout cho user thường
          children: [
            {
              index: true,
              element: <DashboardPage />,
            },
            {
              path: "profile",
              index: true,
              element: <ProfilePage />,
            },
            {
              path: "data-input",
              index: true,
              element: <DataInputPage />,
            },
            {
              path: "collect-manage",
              children: [
                {
                  index: true,
                  element: <CollectionManagementPage />,
                },
                {
                  path: ":id",
                  index: true,
                  element: <CollectionDetailPage />,
                },
              ],
            },
            {
              path: "report",
              index: true,
              element: <StatisticsReport />,
            },
            {
              path: "recycling",
              index: true,
              element: <RecyclingProcessPage />,
            },
            {
              path: "capability",
              index: true,
              element: <CapabilityPage />,
            },
            {
              path: "support",
              index: true,
              element: <SupportPage />,
            },
            {
              path: "reservation",
              index: true,
              element: <ReservationPage />,
            },
          ],
        },
        {
          path: "admin",
          element: <AdminLayout />, // Layout cho admin
          children: [
            {
                index: true,
                element: <FunctionAdminPage />,
            },
            {
              path: "data-input",
              index: true,
              element: <DataInputAdminPage />,
            },
            {
              path: "collect-manage",
              children: [
                {
                  index: true,
                  element: <CollectionManagementPage />,
                },
                {
                  path: ":id",
                  index: true,
                  element: <CollectionDetailPage />,
                },
              ],
            },
            {
              path: "statistics-reports",
              index: true,
              element: <StatisticsReport />,
            },
            {
              path: "management",
              index: true,
              element: <PermissionsManagement />,
            },
            {
              path: "customer-support",
              index: true,
              element: <ProfilePage />,
            },
          ],
        },
      ],
    },
  ]);