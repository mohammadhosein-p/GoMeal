import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout, { loader as mainLoader } from "./components/layout/Layout"
import HomePage, { foodLoader } from "./components/pages/HomePage"
import "./App.css"
import FavoritePage from "./components/pages/FavoritePage"
import OrderFood from "./components/pages/OrderFood"


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
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App

