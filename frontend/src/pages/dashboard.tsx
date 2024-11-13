import { Card } from "@/components/ui/card"
import { getCustomer, getEvents } from "@/http/api"
import { EventData, ICustomerData } from "@/types"
import { useQuery } from "@tanstack/react-query"

const fetchEvents = async () => {
    const { data } = await getEvents()
    return data
}

const fetchCustomers = async () => {
    const { data } = await getCustomer()
    return data
}

const Dashboard = () => {
    const { data: events } = useQuery<EventData[]>({
        queryKey: ['events'],
        queryFn: fetchEvents
    })

    const { data: customers } = useQuery<ICustomerData[]>({
        queryKey: ['customers'],
        queryFn: fetchCustomers
    })

    return (
        <div className="grid grid-cols-1 gap-3">
            <div className="grid gap-2 md:grid-cols-2">
                <Card className="p-3">
                    <h1 className="text-xl font-medium">Total Customers</h1>
                    <p>{customers?.length}</p>
                </Card>
                <Card className="p-3">
                    <h1 className="text-xl font-medium">Total Events</h1>
                    <p>{events?.length}</p>
                </Card>
                {/* <Card className="p-3">
                    <h1 className="text-xl font-medium">Total Pending Events</h1>
                    <p>{events?.filter(event => !event.isCompleted).length}</p>
                </Card> */}
            </div>
            <Card className="p-3 pb-5">
                <h1 className="text-xl font-medium mb-3">Pending Events</h1>
                <table className="w-full">
                    <tr>
                        <td className="border px-2 font-medium bg-gray-100 dark:bg-gray-900 text-gray-500" >Event Name</td>
                        <td className="border px-2 font-medium bg-gray-100 dark:bg-gray-900 text-gray-500" >Customer</td>
                        <td className="border px-2 font-medium bg-gray-100 dark:bg-gray-900 text-gray-500" >Access Code</td>
                    </tr>
                    {
                        events?.map(event =>
                            <tr>
                                <td className="border px-2 text-gray-600" >{event.name}</td>
                                <td className="border px-2 text-gray-600" >{event.customerId.name}</td>
                                <td className="border px-2 text-gray-600" >{event.accessCode}</td>
                            </tr>
                        )
                    }
                </table>
            </Card>
        </div>
    )
}

export default Dashboard