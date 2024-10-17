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
      path: "/workerProfile/:id", // Ruta con parámetro ID para WorkerProfile
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
    path: "/",
    element: <Protected />,  
    children: [{
        path: "/profile",
        element: <Profile />,
      },
    ],
}]);


  return (
    <AuthenticationContextProvider>
      <RouterProvider router={router} />
    </AuthenticationContextProvider>
  );
};

export default App;