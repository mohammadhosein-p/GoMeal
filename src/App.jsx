import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/layout/LayOut"
import HomePage from "./components/pages/HomePage"
import "./App.css"
import FavoritePage from "./components/pages/FavoritePage"


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
        element: <HomePage />
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
