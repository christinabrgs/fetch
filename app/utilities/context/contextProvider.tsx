import { createContext, useContext, useState, useEffect, type PropsWithChildren } from "react"
import type { User } from "../dataTypes/user"
import type { AuthContext } from "~/utilities/dataTypes/context"
import { fetchUserData, logoutUser } from "~/utilities/apiFunctions/functions"
import { useMediaQuery } from "@mantine/hooks"



const AuthContext = createContext<AuthContext | null>(null)

export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean | null>(null)


    const isMobile = useMediaQuery("(max-width: 1199px)")

    // grab logged in user
    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }, [])


    // login user
    const login = async (name: string, email: string) => {
        const userData = await fetchUserData(name, email)
        console.log('user', name, email)
        if (userData) {
            setUser(userData)
            // localStorage.setItem("user", JSON.stringify(userData))
        }

    }

    // logout user
    const logout = async () => {
        await logoutUser()
        setUser(null)

    }    



    return <AuthContext.Provider value={{ user, login, logout, isMobile }}> {!loading && children} </AuthContext.Provider>

}



export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an Authproivder')
    }

    return context

}