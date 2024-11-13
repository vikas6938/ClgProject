import { useAuthStore } from "@/store"
import { Navigate, Outlet } from "react-router-dom"
import Sidebar from "@/components/custom/sidebar"
import Header from "@/components/custom/header"
import { useState, useEffect } from "react"

const Protected = () => {
    const { user } = useAuthStore();
    const [isUserLoaded, setIsUserLoaded] = useState(false); // Track user loading state
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        // Check if user is already available, otherwise set isUserLoaded to true after a brief delay
        if (user !== null) {
            setIsUserLoaded(true);
        } else {
            setTimeout(() => setIsUserLoaded(true), 100); // Adjust delay as needed
        }
    }, [user]); // Run effect when user changes

    if (!isUserLoaded) {
        return null; // Return nothing while waiting for user state
    }

    if (user === null) {
        return <Navigate to={'/auth/login'} replace={true} />
    }
    return (
        <div className="lg:flex h-screen">
            <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <div className="flex-1 flex flex-col overflow-auto dark:bg-background bg-gray-100">
                <Header setIsMenuOpen={setIsMenuOpen} />
                <div className="p-5 flex flex-col flex-1">
                    <Outlet />
                </div>
            </div>
        </div>

    )
}

export default Protected