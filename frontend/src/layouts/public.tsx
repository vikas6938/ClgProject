import Header from "@/components/custom/header"
import { useAuthStore } from "@/store"
import { Navigate, Outlet } from "react-router-dom"

const Public = () => {
    const { user } = useAuthStore()
    if (user) {
        return <Navigate to={'/app/dashboard'} replace={true} />
    }
    return (
        <div className="bg-gray-100 dark:bg-card">
            <Header />
            <Outlet />
        </div>
    )
}

export default Public