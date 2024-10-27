'use client'

import { createClient } from "@/utils/supabase/client";
import { user as PrismaUser } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UserContextProps {
    user: PrismaUser,
    refreshUser: () => Promise<void>,
}

const defaultUser: PrismaUser = {
    id: "-1",
    created_at: new Date(),
    username: "",
    email: "",
    avatar_url: "",
}

const UserContext = createContext<UserContextProps>({
    user: defaultUser,
    refreshUser: async () => {
        console.warn('UserContext not initialized')
    }
})

export const UserContextProvider = ({ 
    children, 
    initialData = {} 
}: {
    children: React.ReactNode
    initialData?: {
        user?: PrismaUser
    }
}) => {
    const router = useRouter()
    const supabase = createClient()
    const [user, setUser] = useState<PrismaUser>(initialData.user || defaultUser)

    const fetchPrismaUser = async (supabaseUserId: string | null) => {
        if (!supabaseUserId) return defaultUser
    
        try {
            const { data } = await axios.get(`/api/actions/getUser`, {
                params: { supabaseUserId }
            })
            return data
        } catch (error) {
            console.error('Error fetching Prisma user:', error)
            return defaultUser
        }
    }
    
    const fetchUser = async () => {
        const { data: { user: supabaseUser } } = await supabase.auth.getUser()
        const prismaUser = await fetchPrismaUser(supabaseUser?.id ?? null)
        setUser(prismaUser)
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const refreshUser = async () => { fetchUser() }

    return (
        <UserContext.Provider value={{
            user,
            refreshUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext)
    
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserContextProvider')
    }
    
    return context
}
