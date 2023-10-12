import "./App.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Favorite from "./pages/Favorites"
import CharityDetail from "./pages/CharityDetail"
import NotFound from "./pages/NotFound"
import Header from "./components/Header"
import { Outlet } from "react-router-dom"
function App() {
  const HeaderLayout = () => (
    <>
      <header>
        <Header />
      </header>
      <Outlet />
    </>
  )
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <NotFound />,
      element: <HeaderLayout />,
      children: [
        { path: "/", Component: Home },
        {
          path: "/favorites",
          Component: Favorite,
        },
        {
          path: "/charity/:id",
          Component: CharityDetail,
        },
      ],
    },
  ])

  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  )
}

export default App
