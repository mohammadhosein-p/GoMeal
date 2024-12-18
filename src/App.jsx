import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout, { loader as mainLoader } from "./components/layout/Layout"
import HomePage, { foodLoader } from "./components/pages/HomePage"
import "./App.css"
import FavoritePage from "./components/pages/FavoritePage"
import OrderFood from "./components/pages/OrderFood"
import ContactPage from "./components/pages/ContactPage"
import AboutPage from "./components/pages/AboutPage"
import LoginPage from "./components/pages/LoginPage"
import SignupPage from "./components/pages/SignupPage"


const router = createBrowserRouter([
  {
    element: <Layout />,
    loader: mainLoader,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: foodLoader,
      },
      {
        path: '/food',
        element: <OrderFood />
      },
      {
        path: "/favorite",
        element: <FavoritePage />
      },
      {
        path: "/contact",
        element: <ContactPage />
      },
      {
        path:"/about",
        element:<AboutPage />
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignupPage />
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App

