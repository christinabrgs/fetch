import { createContext, useContext, useState, useEffect, type PropsWithChildren } from "react"
import type { User } from "../dataTypes/user"
import type { AuthContext } from "~/utilities/dataTypes/context"
import { fetchUserData, logoutUser } from "~/utilities/apiFunctions/functions"
import { useMediaQuery } from "@mantine/hooks"
import { useNavigate } from "react-router"


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
            localStorage.setItem("user", JSON.stringify(userData))
        }

    }

    // logout user
    const logout = async () => {
        await logoutUser()
        localStorage.removeItem("user")
        setUser(null)

    }


    function useFetch<T>(request: Promise<Response>, opts?: { redirectOn?: Record<number, string> }): { data: T | null, loading: boolean, error?: Error } {
        const [data, setData] = useState<T | null>(null)
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<Error>();
        const navigate = useNavigate()

        useEffect(() => {
            async function handle() {
                try {
                    const resolved = await request;
                    if (!resolved.ok && opts?.redirectOn && resolved.status in opts.redirectOn) {
                        navigate(opts.redirectOn[resolved.status])
                    } else if (!resolved.ok) {
                        setError(new Error(await resolved.text()))
                    }
                    setData(await resolved.json());
                } catch (err) {
                    if (err instanceof Error) {
                        setError(err)
                    } else {
                        setError(new Error(`Unexpected Error: ${err}`))
                    }
                }
                setLoading(false);
            }
            handle()// Redirect heree()
        }, []);
        

        return { data, loading, error }
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