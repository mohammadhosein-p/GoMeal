import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/layout/LayOut"
import HomePage from "./components/pages/HomePage"
import "./App.css"


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App
