import SubHeader from "@/components/custom/subHeader"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createFolder, getFolders } from "@/http/api"
import { FolderData, FolderDetails } from "@/types"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useParams, useSearchParams } from "react-router-dom"

const fetchFolders = async (id: string) => {
    const { data } = await getFolders(id)
    return data
}

const addFolder = async (data: FolderData) => {
    const { data: res } = await createFolder(data)
    return res
}

const Folder = () => {
    const [open, setOpen] = useState(false)
    const [inputError, setInputError] = useState(false)
    const { id: eventId } = useParams()
    const [searchParams] = useSearchParams()
    const { register, handleSubmit, resetField } = useForm<FolderData>()

    useEffect(() => {
        if (!open) {
            resetField('name')
        }
    }, [open, resetField])

    const { data: folders, refetch } = useQuery<FolderDetails[]>({
        queryKey: ['folders'],
        queryFn: () => fetchFolders(eventId!),
    })
    const { mutate: addMutate } = useMutation({
        mutationKey: ['addFolder'],
        mutationFn: addFolder,
        onSuccess: () => {
            refetch()
            setOpen(false)
        }
    })

    const onSubmit = (values: FolderData) => {
        if (values.name === '') {
            setInputError(true)
        } else {
            setInputError(false)
            addMutate({
                name: values.name,
                eventId: eventId!,
                customerId: searchParams.get('customer')!
            })
        }
    }

    return (
        <>
            <SubHeader title='Folder' subTitle=''>
                <Dialog open={open} onOpenChange={setOpen} >
                    <DialogTrigger asChild >
                        <Button variant="outline">Add</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Customer Details</DialogTitle>
                        </DialogHeader>
                        <Alert variant="destructive" hidden={!inputError}>
                            <div className="flex items-center">
                                <ExclamationTriangleIcon className="" />
                                <AlertTitle className='ml-2'>Fill all details</AlertTitle>
                            </div>
                        </Alert>
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input className="col-span-3" {...register('name')} placeholder="folder name" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" variant='outline' className='border-primary'>Save</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </SubHeader>

            <Card className='mt-5 flex-1 p-5'>
                <div className="flex flex-wrap gap-10">
                    {
                        folders && folders.map((folder) =>
                            <Link to={`/files/${folder._id}`} >
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" className="mx-auto" width={100} height={100} viewBox="0 0 256 256" xmlSpace="preserve">
                                    <defs>
                                    </defs>
                                    <g style={{ stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', fillRule: 'nonzero', opacity: 1 }} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                                        <path d="M 73.538 35.162 l -52.548 1.952 c -1.739 0 -2.753 0.651 -3.232 2.323 L 6.85 76.754 c -0.451 1.586 -2.613 2.328 -4.117 2.328 h 0 C 1.23 79.082 0 77.852 0 76.349 l 0 -10.458 V 23.046 v -2.047 v -6.273 c 0 -2.103 1.705 -3.808 3.808 -3.808 h 27.056 c 1.01 0 1.978 0.401 2.692 1.115 l 7.85 7.85 c 0.714 0.714 1.683 1.115 2.692 1.115 H 69.73 c 2.103 0 3.808 1.705 3.808 3.808 v 1.301 C 73.538 26.106 73.538 35.162 73.538 35.162 z" className="hover:stroke-primary stroke-gray-900 dark:stroke-gray-500" style={{ strokeWidth: 0.5, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', fillRule: 'nonzero', opacity: 1 }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                                        <path d="M 2.733 79.082 L 2.733 79.082 c 1.503 0 2.282 -1.147 2.733 -2.733 l 10.996 -38.362 c 0.479 -1.672 2.008 -2.824 3.748 -2.824 h 67.379 c 1.609 0 2.765 1.546 2.311 3.09 L 79.004 75.279 c -0.492 1.751 -1.571 3.818 -3.803 3.803 C 75.201 79.082 2.733 79.082 2.733 79.082 z" className="hover:stroke-primary stroke-gray-900 dark:stroke-gray-500" style={{ strokeWidth: 0.5, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', fillRule: 'nonzero', opacity: 1 }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                                    </g>
                                </svg>
                                <h2 className="dark:text-gray-300 text-gray-500 text-center">{folder.name}</h2>
                            </Link>
                        )
                    }
                </div>


                {
                    folders?.length === 0 &&
                    <div className="flex items-center justify-center h-full">
                        <h2 className='text-gray-500'>No folder available</h2>
                    </div>
                }
            </Card >
        </>
    )
}

export default Folder