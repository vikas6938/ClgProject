import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { access, postSelected } from "@/http/api"
import { FileData } from "@/types"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"

export type AccessCode = { accessCode: string }

const accessUser = async (credentials: AccessCode) => {
    const { data } = await access(credentials)
    return data
}

const PhotoSelection = () => {
    const [files, setFiles] = useState<null | [] | FileData[]>(null)
    const { mutate, isPending, isError } = useMutation({
        mutationKey: ['login'],
        mutationFn: accessUser,
        onSuccess: async (data) => {
            setFiles(data.data)
        }
    })
    const [inputError, setInputError] = useState('')

    const form = useForm<AccessCode>()

    const onSubmit = (values: AccessCode) => {
        if (values.accessCode === '') {
            setInputError('Enter your credentials')
        } else {
            setInputError('')
            mutate(values)
        }
    }

    const handleSelection = async (value: boolean, id: string, index: number) => {
        const { data } = await postSelected(value, id)
        if (files) {
            const oldFile = [...files]
            oldFile[index] = data.data
            setFiles([...oldFile])
        }
    }

    return (
        <div >
            {
                !files &&
                <div className="flex flex-col justify-center min-h-screen items-center">
                    <Card className="md:w-1/3">
                        <CardHeader>
                            <CardTitle className="text-center mb-2 text-xl">Photo selection</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-2">
                                    <div className="grid lg:grid-cols-1 gap-3">
                                        <FormField
                                            control={form.control}
                                            name="accessCode"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Access code</FormLabel>
                                                    <FormControl>
                                                        <Input type="text" placeholder="Enter your code" {...field} />
                                                    </FormControl>
                                                    <FormMessage >{inputError || (isError ? 'Invalid Code' : '')}</FormMessage>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="">
                                        <Button type="submit" className="text-white w-full" disabled={isPending}>
                                            {
                                                isPending ? <div className="spinner-border h-5 w-5 mr-2 border-t-4 border-b-4 border-gray-100 rounded-full animate-spin"></div> : ''
                                            }
                                            Get Photos</Button>
                                    </div>
                                </form>
                            </Form>
                            <div className="mt-5 border p-1 rounded bg-gray-100 dark:bg-secondary">
                                <h2 className="text-gray-500 dark:text-gray-300">Test Code: <span className="text-gray-500 dark:text-gray-200">553694</span></h2>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            }


            {
                files && files.length > 0 ?
                    <Card className="p-3 m-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 items-start">
                            {
                                files.map((file, index) =>
                                    <div key={file._id} className="rounded-md overflow-hidden max-h-50 flex flex-col border-2">
                                        <div className="relative flex flex-1 overflow-hidden items-start">
                                            <button onClick={() => handleSelection(!file.isSelected, file._id, index)} className="absolute bottom-0 bg-white rounded-tr w-6 h-6 text-center">
                                                {
                                                    file.isSelected ?
                                                        <i className="fa-solid fa-heart text-red-500"></i>
                                                        :
                                                        <i className={`fa-regular fa-heart`}></i>
                                                }
                                            </button>
                                            <img src={file.path} className="object-contain mx-auto" alt="" />
                                        </div>
                                        {/* <div className="dark:bg-gray-900 bg-gray-200 p-1">
                                        <p className="text-xs">Size: {filesize(file.size)}</p>
                                    </div> */}
                                    </div>
                                )
                            }
                        </div>
                    </Card>
                    :
                    <div className="flex flex-col justify-center min-h-screen items-center">
                        No image available!
                    </div>
            }
        </div>
    )
}

export default PhotoSelection


