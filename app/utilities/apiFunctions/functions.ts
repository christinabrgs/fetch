import type { User } from "../dataTypes/user"
import type { Dog, DogSearchParams, SearchResponse } from "~/utilities/dataTypes/dogs"

const baseURL = 'https://frontend-take-home-service.fetch.com'


const fetchUserData = async (name: string, email: string): Promise<User | null> => {
    try {
        const response = await fetch(`${baseURL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email }),
            credentials: "include"
        })

        if (!response.ok) {
            throw new Error("Login failure");
        }

        return { name, email }
    }
    catch (error) {
        console.log('login failed:', error)
        return null
    }
}


const logoutUser = async (): Promise<boolean> => {
    try {
        const response = await fetch(`${baseURL}/auth/logout`, {
            method: "POST",
            credentials: "include"
        })

        if (!response.ok) {
            throw new Error("Logout failure");
        }

        return true
    }
    catch (error) {
        console.log('logout failed:', error)
        return false
    }
}


const fetchDogBreeds = async (): Promise<string[] | null> => {

    try {
        const response = await fetch(`${baseURL}/dogs/breeds`, {
            method: 'GET',
            credentials: "include"
        })

        if (!response.ok) {
            throw new Error("fetch dog breeds failure");
        }

        return response.json()

    }
    catch (error) {
        console.error('failed to fetch dog breeds', error)
        return null
    }
}

const fetchDogs = async (dogIDs: string[]): Promise<Dog[] | null> => {
    try {
        const response = await fetch(`${baseURL}/dogs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(dogIDs),
        })

        if (!response.ok) {
            throw new Error('fetch dogs failure')
        }
        return response.json()
    }
    catch (error) {
        console.error('failed to fetch dogs', error)
        return null
    }
}

const searchDogs = async (filters: DogSearchParams = {}): Promise<SearchResponse | null> => {
    try {
        let url = 'dogs/search'

        if (filters.cursor) {
            url = `${filters.cursor}`
        }
        else {
            const params = new URLSearchParams({
                ...(filters.breeds && { breeds: filters.breeds.join(",") }),
                ...(filters.zipCodes && { zipCodes: filters.zipCodes.join(",") }),
                ...(filters.ageMin !== undefined && { ageMin: filters.ageMin.toString() }),
                ...(filters.ageMax !== undefined && { ageMax: filters.ageMax.toString() }),
                size: (filters.size ?? 30).toString(),
                from: (filters.from ?? 0).toString(),
                sort: filters.sort ?? "breed:asc",
            });

            url = `/dogs/search?${params.toString()}`
        }

        const response = await fetch(`${baseURL}${url}`, {
            method: "GET",
            credentials: "include"
        })

        if (!response.ok) {
            throw new Error('dog search failure')
        }

        return response.json()
    }
    catch (error) {
        console.error('failed to search dogs', error)
        return null
    }
}


const getMatch = async (dogIDs: string[]): Promise<string | null> => {
    try {
        const response = await fetch(`${baseURL}/dogs/match`, {
            method: "POST",
            headers: { "Content-Type": 'application/json' },
            credentials: 'include',
            body: JSON.stringify(dogIDs)
        })

        if (!response.ok) {
            throw new Error('dog search failure')
        }

        return response.json()

    }
    catch (error) {
        console.error('failed to find a match', error)
        return null
    }
}


export { fetchUserData, logoutUser, fetchDogBreeds, fetchDogs, searchDogs, getMatch }