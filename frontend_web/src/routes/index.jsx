import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import DataInputPage from "../pages/DataInputPage";
import CollectionManagementPage from "../pages/CollectionManagementPage";
import StatisticsReport from "../pages/StatisticsReport";
import RecyclingProcessPage from "../pages/recyclingProcessPage";
import CapabilityPage from "../pages/CapabilityPage";
import SupportPage from "../pages/SupportPage";
import ReservationPage from "../pages/ReservationPage";
import CollectionDetailPage from "../pages/CollectionDetailPage";
import MainLayout from "../components/layout/MainLayout";
import AdminLayout from "../components/layout/AdminLayout";
import FunctionAdminPage from "../pages/FunctionAdminPage";
import DataInputAdminPage from "../pages/DataInputAdminPage";
import PermissionsManagement from "../pages/PermissionsManagement";
import SupportAdminPage from "../pages/SupportAdminPage";
import SupportDetailAdminPage from "../pages/SupportDetailAdminPage";
import ManagementLayout from "../components/layout/ManagementLayout";
import ProfileAdminPage from "../pages/ProfileAdminPage";
import ListCustomerPage from "../pages/ListCustomerPage";
import WastCategoriesPage from "../pages/WastCategoriesPage";
import CollectUnitAdminPage from "../pages/CollectUnitAdminPage";
import Capacity from "../pages/Capacity";
import Licenses from "../pages/Licenses";
import Vehicles from "../pages/Vehicles";
import TransferStations from "../pages/TransferStations";
import ProcessUnitAdminPage from "../pages/ProcessUnitAdminPage";
import Partner from "../pages/Partner";

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
              element: <ManagementLayout />,
              children: [
                  {
                    index: true,
                    element: <PermissionsManagement />,
                  },
                  {
                    path: "create-account",
                    index: true,
                    element: <ProfileAdminPage />,
                  },
                  {
                    path: "customer-list",
                    index: true,
                    element: <ListCustomerPage />,
                  },
                  {
                    path: "waste-categories",
                    index: true,
                    element: <WastCategoriesPage />,
                  },
                  {
                    path: "collect-units",
                    index: true,
                    element: <CollectUnitAdminPage />,
                  },
                  {
                    path: "process-units",
                    index: true,
                    element: <ProcessUnitAdminPage />,
                  },
                  {
                    path: "partners",
                    index: true,
                    element: <Partner />,
                  },
                  {
                    path: "capacity",
                    index: true,
                    element: <Capacity />,
                  },
                  {
                    path: "licenses",
                    index: true,
                    element: <Licenses />,
                  },
                  {
                    path: "vehicles",
                    index: true,
                    element: <Vehicles />,
                  },
                  {
                    path: "transfer-stations",
                    index: true,
                    element: <TransferStations />,
                  },
                ]
            },
            {
              path: "customer-support",
              children: [
                {
                  index: true,
                  element: <SupportAdminPage />,
                },
                {
                  path: ":id",
                  index: true,
                  element: <SupportDetailAdminPage />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);