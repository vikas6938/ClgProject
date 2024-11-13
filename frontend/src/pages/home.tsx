import Header from "@/components/custom/header"
import { useAuthStore } from "@/store"
import { Link, Navigate } from "react-router-dom"

const Home = () => {
    const { user } = useAuthStore()
    if (user) {
        return <Navigate to={'/app/dashboard'} replace={true} />
    }
    return (
        <>
            <Header />
            <div className="container mx-auto px-4 py-8">

                <section className="text-center">
                    <h2 className="text-4xl font-semibold mb-4">Welcome to Capshare</h2>
                    <p className="text-lg mb-8">Capshare is a revolutionary photo selection platform designed for photographers and clients.</p>
                    <p className="text-lg mb-8">With its intuitive interface and powerful features, Capshare streamlines the photo selection process, making collaboration between photographers and clients seamless and efficient.</p>
                    <Link to="/auth/signup" className="bg-blue-500 text-white px-6 py-3 rounded-full text-xl font-medium hover:bg-blue-600">Get Started</Link>
                </section>
                <section className="mt-12">
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
                        <p className="font-bold">Note:</p>
                        <p>The backend server may take 30 to 60 seconds to respond on your first request due to hosting on render.com. Thank you for your patience.</p>
                    </div>
                </section>

                <section className="mt-12">
                    <h3 className="text-3xl font-semibold mb-6">Key Features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <li>
                            <h4 className="text-xl font-medium mb-2">Effortless Photo Selection</h4>
                            <p className="text-lg mb-4">Clients can easily browse through uploaded photos and select their favorites with just a few clicks.</p>
                        </li>
                        <li>
                            <h4 className="text-xl font-medium mb-2">Real-time Collaboration</h4>
                            <p className="text-lg mb-4">Photographers can instantly view client selections, facilitating communication and ensuring client satisfaction.</p>
                        </li>
                        <li>
                            <h4 className="text-xl font-medium mb-2">Secure Storage</h4>
                            <p className="text-lg mb-4">All photos are securely stored, ensuring data safety and reliability</p>
                        </li>
                        <li>
                            <h4 className="text-xl font-medium mb-2">User-Friendly Interface</h4>
                            <p className="text-lg mb-4">Capshare boasts a sleek and intuitive interface, providing a smooth and enjoyable user experience for both photographers and clients.</p>
                        </li>
                    </ul>
                </section>

            </div>
        </>
    )
}

export default Home