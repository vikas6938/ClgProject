export type Register = {
    name: string
    email: string
    password: string
    confirmPassword: string
}
export type Credentials = {
    email: string
    password: string
}

export type CustomerData = {
    name: string
    mobile: string
    id?: string
}

export interface ICustomerData extends CustomerData {
    _id: string
    userId: string
}

export type EventData = {
    _id: string
    name: string
    userId: string
    customerId: ICustomerData
    isCompleted: boolean
    accessCode: string
}

export type PostEvent = {
    name: string
    customerId: string
    id?: string
}
export type UpdateEvent = {
    id?: string
    name?: string
    customerId?: string
    isCompleted?: boolean
}

export type FolderDetails = {
    _id: string
    name: string
    userId: string
    customerId: string
    eventId: string
}

export type FolderData = {
    name: string
    customerId: string
    eventId: string
}
export type FileData = {
    _id: string
    name: string
    eventId: string
    originalname: string
    mimetype: string
    path: string
    size: number
    isSelected: boolean
}

export type FileDetails = {
    data: FileData[]
}

export type FilterEventTypes = {
    ALL: 'ALL'
    PENDING: 'PENDING'
    COMPLETED: 'COMPLETED'
}
