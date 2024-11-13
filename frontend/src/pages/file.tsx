import SubHeader from "@/components/custom/subHeader"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { createFile, getEvent, getFiles } from "@/http/api"
import { useEventStore } from "@/store"
import { EventData, FileData, FileDetails } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useRef, useState } from "react"
import { useDropzone } from 'react-dropzone'
import { EmptyObject } from "react-hook-form"
import { Link, useParams } from "react-router-dom"
// import { partial } from "filesize"
import { Skeleton } from "@/components/ui/skeleton"
import Nav from "@/components/custom/nav"
// const filesize = partial({ standard: "jedec" })

const uploadImage = async (files: File[], eventId: string) => {
    try {
        const formData = new FormData()
        files.forEach(file => {
            formData.append('logo', file)
        })
        const response = await createFile(eventId, formData)
        return response
        console.log('Image uploaded successfully:', response.data)
    } catch (error) {
        console.error('Error uploading image:', error)
    }
}

const fetchFiles = async (id: string) => {
    const { data } = await getFiles(id)
    return data
}
const fetchEvent = async (id: string) => {
    const { data } = await getEvent(id)
    return data
}

const File = () => {
    const [eventData, setEventData] = useState<EventData | EmptyObject>({})
    const [filteredFiles, setFilteredFiles] = useState<FileData[]>([])
    const { events } = useEventStore()
    const { id } = useParams()
    const [skeletonCount] = useState([1, 2, 3, 4, 5, 6])
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedTab, setSelectedTab] = useState('all')


    const { data: files, isPending, refetch: filesRefetch } = useQuery<FileDetails>({
        queryKey: ['files'],
        queryFn: () => fetchFiles(id!)
    })

    const { data: event, refetch } = useQuery<EventData>({
        queryKey: ['event'],
        queryFn: () => fetchEvent(id!),
        enabled: true
    })

    useEffect(() => {
        if (events) {
            const currentEvent = events.filter(event => event._id === id)
            setEventData(currentEvent[0])
        }
    }, [events, id])

    useEffect(() => {
        if (!events && !event) {
            refetch()
        } else {
            if (event) {
                setEventData(event)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [event, setEventData])

    useEffect(() => {
        if (files) {
            setFilteredFiles(files.data)
        }
    }, [files])


    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        // Do something with the files
        await uploadImage(acceptedFiles, id!)
        filesRefetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
        onDrop,
        accept: {
            'image/png': [],
            'image/jpeg': [],
            'image/webp': []
        }
    })

    useEffect(() => {
        if (fileRejections.length > 0) {
            alert('Invalid file type. Please upload correct image type.')
        }
    }, [fileRejections])

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            await uploadImage(Array.from(files), id!)
            filesRefetch()
        } else {
            alert('Please select file(s) to upload.')
        }
    }

    const handleFilter = (arg: string) => {
        switch (arg) {
            case 'selected':
                if (files) {
                    setFilteredFiles(files.data.filter(file => file.isSelected))
                    setSelectedTab('selected')
                }
                break
            // case 'completed':
            //     if (files) {
            //         setFilteredFiles(files.data.filter(file => file.isSelected))
            //         setSelectedTab('completed')
            //     }
            //     break
            default:
                if (files) {
                    setFilteredFiles(files.data)
                    setSelectedTab('all')
                }
                break
        }
    }

    return (
        <>
            <Breadcrumb className="mb-3">
                <BreadcrumbList>
                    {/* <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator /> */}
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to="/events">Events</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{eventData.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <SubHeader title={eventData?.name} subTitle=''>
                <input type="file" hidden={true} ref={fileInputRef} onChange={handleFileInputChange} accept="image/*" multiple={true} />
                <Button variant="outline" onClick={handleButtonClick}>Add</Button>
            </SubHeader>
            <Nav handleFilter={handleFilter} selectedTab={selectedTab} filterNames={['selected']} />
            <Card className='mt-5 flex-1 p-5'>
                {isPending &&
                    <div className="grid md:grid-cols-6 gap-3 pt-5">
                        {
                            skeletonCount.map((e) =>
                                <div key={e} className="flex flex-col mt-5">
                                    <Skeleton className="h-[125px]  rounded-xl" />
                                </div>
                            )
                        }
                    </div>
                }

                {files?.data && files.data.length < 0 &&
                    <div className="flex items-center justify-center h-full flex-wrap dark:text-gray-400" {...getRootProps()}>
                        {
                            isDragActive ?
                                <div className="text-center">
                                    <i className="fa-solid fa-cloud-arrow-up text-5xl"></i>
                                    <p>Drop here to upload...</p>
                                </div>
                                :
                                <>
                                    <input {...getInputProps} hidden name="logo" type="file" accept="image/jpeg, image/png" />
                                    <div className="text-center">
                                        <i className="fa-solid fa-cloud-arrow-up text-5xl text-primary"></i>
                                        <h4 className="mt-2">Drag and Drop /</h4>
                                        <p>click to upload photos</p>
                                    </div>
                                </>
                        }
                    </div>
                }
                {
                    filteredFiles?.length > 0 &&
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 items-start">
                        {
                            filteredFiles.map(file =>
                                <div key={file._id} className="rounded-md overflow-hidden max-h-50 flex flex-col border-2">
                                    <div className="relative flex flex-1 overflow-hidden items-start">
                                        <div className="absolute bottom-0 bg-white rounded-tr w-6 h-6 text-center">
                                            {
                                                file.isSelected ?
                                                    <i className="fa-solid fa-heart text-red-500"></i>
                                                    :
                                                    <i className={`fa-regular fa-heart`}></i>
                                            }
                                        </div>
                                        <img src={file.path} className="object-contain mx-auto" alt="" />
                                    </div>
                                    {/* <div className="dark:bg-gray-900 bg-gray-200 p-1">
                                        <p className="text-xs">Size: {filesize(file.size)}</p>
                                    </div> */}
                                </div>
                            )
                        }
                    </div>
                }

            </Card>
        </>
    )
}

export default File