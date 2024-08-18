import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState } from "react";


import Login from "./components/login/login";
import NotFound from "./components/routes/notFound/NotFound";
import Register from "./components/register/register";
import Profile from "./components/usaerData/Profile";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login onLogin={handleLogin} />,
    },
    {
        path: "/register",
        element: <Register onLogin={handleLogin} />,
      },
      {
        path: "/profile",
        element: <Profile onLogin={handleLogin} />,
      },
    {
      path: "*",
      element: <NotFound />
    }
  ]);


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;