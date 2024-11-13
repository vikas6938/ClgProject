import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { login, self } from "@/http/api"
import { useAuthStore } from "@/store"
import { Credentials } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

const loginUser = async (credentials: Credentials) => {
    const { data } = await login(credentials)
    return data
}

const getSelf = async () => {
    const { data } = await self()
    return data
}

const Login = () => {
    const { setUser } = useAuthStore()

    const { refetch } = useQuery({
        queryKey: ['self'],
        queryFn: getSelf,
        enabled: false
    })

    const { mutate, isPending, isError } = useMutation({
        mutationKey: ['login'],
        mutationFn: loginUser,
        onSuccess: async () => {
            const selfDataPromise = await refetch()
            setUser(selfDataPromise.data)
        }
    })
    const [inputError, setInputError] = useState('')

    const form = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (values: Credentials) => {
        if (values.email === '' || values.password === '') {
            setInputError('Enter your credentials')
        } else {
            setInputError('')
            mutate(values)
        }
    }

    return (
        <div className="flex flex-col justify-center min-h-screen items-center">
            <Card className="md:w-1/3">
                <CardHeader>
                    <CardTitle className="text-center mb-2 text-xl">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-2">
                            <div className="grid lg:grid-cols-1 gap-3">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="Enter your email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="Enter your password" {...field} />
                                            </FormControl>
                                            <FormMessage >{inputError || (isError ? 'Invalid Credentials' : '')}</FormMessage>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="md:text-end">
                                <Link to="/auth/signup" className="text-xs md:text-sm hover:underline">Don't have an account? Sign up</Link>
                            </div>
                            <div className="md:text-start text-center">
                                <Button type="submit" className="text-white" disabled={isPending}>
                                    {
                                        isPending ? <div className="spinner-border h-5 w-5 mr-2 border-t-4 border-b-4 border-gray-100 rounded-full animate-spin"></div> : ''
                                    }
                                    Login</Button>
                            </div>
                        </form>
                    </Form>
                    <div className="mt-5 border p-1 rounded bg-gray-100 dark:bg-secondary">
                        <h2 className="text-gray-500 dark:text-gray-300">Test User:</h2>
                        <h3 className="text-sm">Email id: <span className="text-gray-500 dark:text-gray-200">testuser@gmail.com</span></h3>
                        <h3 className="text-sm">Password: <span className="text-gray-500 dark:text-gray-200">12345678</span></h3>
                    </div>
                </CardContent>
            </Card>

        </div>
    )
}

export default Login


