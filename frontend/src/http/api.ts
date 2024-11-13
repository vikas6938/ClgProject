import { Credentials, CustomerData, FolderData, PostEvent, Register, UpdateEvent } from "@/types";
import { api } from "./client";
import { AccessCode } from "@/pages/photoSelection";

export const register = (data: Register) => api.post('/auth/register', data)
export const login = (credentials: Credentials) => api.post('/auth/login', credentials)
export const self = () => api.get('/auth/self')
export const logout = () => api.post('/auth/logout')

export const createCustomer = (data: CustomerData) => api.post('/customer/register', data)
export const getCustomer = () => api.get('/customer')
export const updateCustomerRequest = (data: CustomerData) => api.put('/customer/update', data)
export const deleteCustomer = (id: string) => api.delete('/customer', { data: { id } })

export const getEvents = () => api.get('/event')
export const getEvent = (id: string) => api.get(`/event/${id}`)
export const createEvent = (data: PostEvent) => api.post('/event/register', data)
export const updateEventRequest = (data: UpdateEvent) => api.put(`/event/update/${data.id}`, data)
export const deleteEvent = (id: string) => api.delete('/event', { data: { id } })

export const getFolders = (id: string) => api.get(`/folder/${id}`)
export const createFolder = (data: FolderData) => api.post('/folder/register', data)

export const getFiles = (id: string) => api.get(`/file/${id}`)
export const createFile = (id: string, data: FormData) => api.post(`/file/register/${id}`, data, {
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    withCredentials: true
})

export const access = (credentials: AccessCode) => api.post('/client', credentials)
export const postSelected = (value: boolean, id: string) => api.get(`/file/select/${id}?selected=${value}`)