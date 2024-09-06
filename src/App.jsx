import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React, { useEffect } from "react";
import { AuthenticationContextProvider } from "./components/services/authenticationContext/authentication.context";
import Protected from "./components/routes/protected/Protected";
import Login from "./components/login/login";
import NotFound from "./components/routes/notFound/NotFound";
import Register from "./components/register/register";
import Profile from "./components/userData/Profile";
import MainPage from "./components/mainMenu/mainPage";
import RegisterWorker from "./components/worker Register/RegisterWorker";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
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
      path: "/RegisterWorker",
      element: <RegisterWorker />,
    },
    {
      path: "/",
      element: <Protected />,  
      children: [{
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  // Usar el evento "beforeunload" para borrar el localStorage al cerrar la pestaña o refrescar
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("user");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup para eliminar el evento cuando el componente se desmonte
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <AuthenticationContextProvider>
      <RouterProvider router={router} />
    </AuthenticationContextProvider>
  );
};

export default App;