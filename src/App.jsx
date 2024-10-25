import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React, { useEffect } from "react";
import { AuthenticationContextProvider } from "./components/services/authenticationContext/authentication.context";
import Protected from "./components/routes/protected/Protected";
import Login from "./components/login/login";
import NotFound from "./components/routes/notFound/NotFound";
import Register from "./components/register/register";
import Profile from "./components/ProfileUser/Profile";
import MainPage from "./components/mainMenu/mainPage";
import RegisterWorkerFinal from "./components/worker Register/RegisterWrokerFinal";
import WorkerProfile from "./components/WorkerProfile/WorkerProfile";
import CategoriesPage from "./components/categories/CategoriesPage";
import HelpSeccion from "./components/help/help";
import EditWorkerProfile from "./components/EditWorkerProfile/EditWorkerProfile";
import FavoritesPage from "./components/savedWorkers/savedWorkers";
import SysAdmin from "./components/admin components/admin page/adminPage";
import EditUserForm from "./components/admin components/editUserAdmin/EditUser";
import AdminWorkersPage from "./components/admin components/AdminWorkersPage/AdminWorkersPage";
import WorkerForm from "./components/admin components/editWorkerPage/WorkerForm";
import CategoryForm from "./components/admin components/AdminCategoryForm/CategoryForm ";
import AdminCategoriesPage from "./components/admin components/EDitCategoryAdmin/EditCategory";
import { ThemeContextProvider } from "./components/services/ThemeContext/Theme.context";
import SettingsPage from "./components/Ajustes/SettingsPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/help",
      element: <HelpSeccion />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/mainPage",
      element: <MainPage />,
    },
    {
      path: "/registerWorker",
      element: <RegisterWorkerFinal />,
    },
    {
      path: "/workerProfile/:id", 
      element: <WorkerProfile />,
    },
    {
      path: "/categories",
      element: <CategoriesPage />,
    },
    {
      path: "/favWorkers",
      element: <FavoritesPage />,
    },
    {
      path: "/editWorker",
      element: <EditWorkerProfile />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/Admin",
      element: <SysAdmin />,
    },
    {
      path: "/editUserAdmin",
      element: <EditUserForm />,
    },
    {
      path: "/adminWorkersPage",
      element: <AdminWorkersPage />,
    },
    {
      path: "/adminWorkersEdit",
      element: <WorkerForm />,
    },
    {
      path: "/AdminEditCategory",
      element: <AdminCategoriesPage />,
    },
    {
      path: "/AdminCategoryForm/:categoryId",
      element: <CategoryForm />,
    },
    {
      path: "/Settings",
      element: <SettingsPage />,
    },
    {
    path: "/",
    element: <Protected />,  
    children: [{
        path: "/profile",
        element: <Profile />,
      },
    ],
}]);


  return (
    <ThemeContextProvider>
    <AuthenticationContextProvider>
      <RouterProvider router={router} />
    </AuthenticationContextProvider>
    </ThemeContextProvider>
  );
};

export default App;