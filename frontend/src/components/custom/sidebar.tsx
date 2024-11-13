import { DashboardIcon } from "@radix-ui/react-icons"
import { NavLink } from "react-router-dom"

type Props = {
    isMenuOpen: boolean
    setIsMenuOpen: (arg: boolean) => void
}

const Sidebar = ({ isMenuOpen, setIsMenuOpen }: Props) => {

    return (
        <aside className={`w-64 absolute bg-card z-10 lg:relative lg:-translate-x-0 ${isMenuOpen ? '' : '-translate-x-full'} h-screen border-r flex flex-col p-4`}>
            <div className="text-xl text-end lg:hidden">
                <button onClick={() => setIsMenuOpen(false)}><i className="fa-solid fa-xmark text-gray-500"></i></button>
            </div>
            <div className="logo text-primary text-3xl italic font-bold text-center mb-5">
                <h1>CapShare</h1>
            </div>
            <div className="mt-10">
                <ul className="menu flex flex-col pl-3 gap-3 font-medium">
                    <li><NavLink to='/app/dashboard' className="flex items-center gap-2 hover:bg-primary hover:text-white ease-in px-2 py-2 rounded-lg" ><DashboardIcon /> <span> Dashboard</span></NavLink></li>
                    <li><NavLink to='/app/customers' className="flex items-center gap-2 hover:bg-primary hover:text-white ease-in px-2 py-2 rounded-lg" > <i className="fa-solid fa-users"></i><span> Customers</span></NavLink></li>
                    <li><NavLink to='/app/events' className="flex items-center gap-2 hover:bg-primary hover:text-white ease-in px-2 py-2 rounded-lg" ><i className="fa-regular fa-calendar-check"></i> <span> Events</span></NavLink></li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar