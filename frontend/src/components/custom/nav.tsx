import { Button } from "../ui/button"
import { Card } from "../ui/card"

type Props = {
    handleFilter: (arg: string) => void
    selectedTab: string
    filterNames: string[]
}

const Nav = ({ handleFilter, selectedTab, filterNames }: Props) => {
    return (
        <Card className="px-5 py-2 mt-3">
            <Button onClick={() => handleFilter('all')} className={`mr-2 ${selectedTab === 'all' ? 'bg-secondary' : ''}`} size='sm' variant='outline'>All</Button>
            {
                filterNames && filterNames.map((item, i) =>
                    <Button key={i} onClick={() => handleFilter(item)} className={`mr-2 ${selectedTab === item ? 'bg-secondary' : ''}`} size='sm' variant='outline'>{item}</Button>
                )
            }
        </Card>
    )
}

export default Nav