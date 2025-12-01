import NavBar from '../components/ui/navbar'
import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"

export default function Layout() {
  return (
    <>
        <Toaster richColors position="top-right" />
        <NavBar />
        <main className="p-6 max-w-7xl mx-auto">
            <Outlet />
        </main>
    </>
  )
}
