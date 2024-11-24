import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/layout/LayOut"
import HomePage from "./components/pages/HomePage"
import "./App.css"
import FavoritePage from "./components/pages/FavoritePage"
import OrderFood from "./components/pages/OrderFood"


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />
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
