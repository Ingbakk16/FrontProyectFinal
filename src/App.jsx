import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
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
import CategoryForm from "./components/admin components/AdminCategoryForm/CategoryForm.jsx";
import AdminCategoriesPage from "./components/admin components/EDitCategoryAdmin/EditCategory";
import { ThemeContextProvider } from "./components/services/ThemeContext/Theme.context";
import SettingsPage from "./components/Ajustes/SettingsPage";
import CreateAdminForm from "./components/admin components/CreateAdminForm/CreateAdminForm";
import MakeWorkerForm from "./components/admin components/MakeWorkerForm/MakeWorkerForm.jsx";
import DeleteReview from "./components/admin components/AdminWorkerReviews/DeleteReview.jsx";
import AdminCreateUserForm from "./components/admin components/AdminCreateUser/AdminCreateUser.jsx";

const App = () => {
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "*", element: <NotFound /> },

    {
      path: "/",
      element: (
        <Protected allowedRoles={["ROLE_USER", "ROLE_WORKER", "ROLE_ADMIN"]} />
      ),
      children: [
        { path: "profile", element: <Profile /> },
        { path: "help", element: <HelpSeccion /> },
        { path: "mainPage", element: <MainPage /> },
        { path: "settings", element: <SettingsPage /> },
        { path: "workerProfile/:id", element: <WorkerProfile /> },
        { path: "categories", element: <CategoriesPage /> },
        { path: "favWorkers", element: <FavoritesPage /> },
        { path: "registerWorker", element: <RegisterWorkerFinal /> },

        {
          path: "worker",
          element: <Protected allowedRoles={["ROLE_WORKER"]} />,
          children: [{ path: "editWorker", element: <EditWorkerProfile /> }],
        },

        {
          path: "admin",
          element: <Protected allowedRoles={["ROLE_ADMIN"]} />,
          children: [
            { path: "", element: <SysAdmin /> },
            {
              path: "AdminCategoryForm/:categoryId",
              element: <CategoryForm />,
            },
            { path: "editUserAdmin/:id", element: <EditUserForm /> },
            { path: "adminWorkersPage", element: <AdminWorkersPage /> },
            { path: "adminWorkersEdit/:id", element: <WorkerForm /> },
            { path: "AdminCreateForm", element: <CreateAdminForm /> },
            { path: "makeWorkerForm/:id", element: <MakeWorkerForm /> },
            { path: "DeleteReview/:workerId", element: <DeleteReview /> },
            { path: "adminCreateUserForm", element: <AdminCreateUserForm /> },
            { path: "AdminEditCategory", element: <AdminCategoriesPage /> },
          ],
        },
      ],
    },
  ]);

  return (
    <ThemeContextProvider>
      <AuthenticationContextProvider>
        <RouterProvider router={router} />
      </AuthenticationContextProvider>
    </ThemeContextProvider>
  );
};

export default App;
