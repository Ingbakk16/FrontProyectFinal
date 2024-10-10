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
import FavoritesPage from "./components/favoritesPage/FavoritesPage";

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
      path: "/favoritesPage",
      element: <FavoritesPage />,
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
      path: "/workerProfile",
      element: <WorkerProfile />,
    },
    {
      path: "/categories",
      element: <CategoriesPage />,
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