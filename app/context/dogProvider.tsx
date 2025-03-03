import React, { createContext, useContext, useState, type PropsWithChildren } from "react"
import type { DogContextType } from "~/data/context"
import { fetchDogBreeds, fetchDogs, searchDogs } from "~/dbFunctions/functions"
import { useEffect } from "react"
import type { DogSearchParams, Dog } from "~/data/dogs"
import { useAuth } from "./contextProvider"

export const DogContext = createContext<DogContextType | null>(null)

export const DogProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [breeds, setBreeds] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [dogs, setDogs] = useState<Dog[] | null>([])
    const { user } = useAuth()
    const [nextQuery, setNextQuery] = useState<DogSearchParams | null>(null)
    const [prevQuery, setPrevQuery] = useState<DogSearchParams | null>(null)
    const [totalResults, setTotalResults] = useState<number>(0)

    useEffect(() => {
        if (user) {
            const fetchDogs = async () => {
                try {
                    const request = await fetchDogBreeds()

                    if (request) {
                        setBreeds(request)
                    }
                }
                catch (error) {
                    console.error('Error fetching dog breeds', error)
                }
                finally {
                    setLoading(false)
                }
            }

            fetchDogs()
        }
    }, [user])


    const searchAndSetDogs = async (filters: DogSearchParams = {}) => {
        const result = await searchDogs(filters ? filters : {})
        if (result) {
            const dogData = await fetchDogs(result.resultIds)
            setDogs(dogData)
            setTotalResults(result.total)
            setNextQuery(result.next ? { ...filters, cursor: result.next } : null)
            setPrevQuery(result.prev ? { ...filters, cursor: result.prev } : null)
            setTotalResults(result.total)
            console.log(dogData, result)
        }
    }

    const goToNextPage = async () => {

        if (nextQuery) {
            await searchAndSetDogs(nextQuery)
        }
    }

    const goToPreviousPage = async () => {
        if (prevQuery) {
            await searchAndSetDogs(prevQuery)
        }
    }




    return (
        <DogContext.Provider
            value={{
                breeds,
                loading,
                dogs,
                searchAndSetDogs,
                goToNextPage,
                goToPreviousPage,
                nextQuery,
                prevQuery,
                totalResults
            }}>
            {children}
        </DogContext.Provider>
    )
}


export const useDogContext = (): DogContextType => {
    const context = useContext(DogContext);
    if (!context) {
        throw new Error("useDogContext must be used within a DogProvider");
    }
    return context;
};