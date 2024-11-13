import { ReactNode } from "react"
import { Card, CardHeader } from "../ui/card"

interface propType {
    title: string
    children?: ReactNode
    subTitle: string
}

const SubHeader: React.FC<propType> = ({ title, children, subTitle }) => {
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold">{title}</h2>
                    <p className="text-xs text-gray-500">{subTitle}</p>
                </div>
                {children}
            </CardHeader>
        </Card>
    )
}

export default SubHeader