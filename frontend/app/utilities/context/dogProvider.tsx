import React, { createContext, useContext, useState, type PropsWithChildren } from "react"
import type { DogContextType } from "~/utilities/dataTypes/context"
import { fetchDogBreeds, fetchDogs, searchDogs } from "~/utilities/apiFunctions/functions"
import { useEffect } from "react"
import type { DogSearchParams, Dog } from "~/utilities/dataTypes/dogs"
import { useAuth } from "./contextProvider"
import { fetchSaved } from "../dbFunctions/functions"

export const DogContext = createContext<DogContextType | null>(null)

export const DogProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [breeds, setBreeds] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [dogs, setDogs] = useState<Dog[] | null>([])
    const { user } = useAuth()
    const [nextQuery, setNextQuery] = useState<DogSearchParams | null>(null)
    const [prevQuery, setPrevQuery] = useState<DogSearchParams | null>(null)
    const [totalResults, setTotalResults] = useState<number>(0)
    const [savedDogs, setSavedDogs] = useState<string[]>([])
    const [pageCount, setPageCount] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(0)

    useEffect(() => {
        if (user) {
            const fetchDogs = async () => {
                try {
                    const request = await fetchDogBreeds()
                    const dogs = await fetchSaved()

                    if (request && dogs) {
                        setBreeds(request)
                        setSavedDogs(dogs)

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
            setTotalPages(Math.ceil(result.total / 30))
            console.log(dogData, result)
        }
    }

    const goToNextPage = async () => {

        if (nextQuery) {
            await searchAndSetDogs(nextQuery)
            setPageCount(prev => prev + 1)
        }
    }

    const goToPreviousPage = async () => {
        if (prevQuery) {
            await searchAndSetDogs(prevQuery)
            setPageCount(prev => Math.max(prev - 1, 1))
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
                totalResults,
                savedDogs,
                totalPages,
                pageCount,
                setSavedDogs
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