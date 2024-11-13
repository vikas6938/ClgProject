import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { EventData } from "./types"

export interface User {
    _id: string
    name: string
    email: string
    role: string
    emailVerified: boolean
}

interface AuthState {
    user: null | User
    setUser: (user: User) => void
    logout: () => void
}

interface EventState {
    events: null | EventData[]
    setEvent: (events: EventData[] | null) => void
}

export const useAuthStore = create<AuthState>()(
    devtools((set) => ({
        user: null,
        setUser: (user) => set({ user }),
        logout: () => set({ user: null })
    }))
)

export const useEventStore = create<EventState>()(
    devtools((set) => ({
        events: null,
        setEvent: (events) => set({ events })
    }))
)