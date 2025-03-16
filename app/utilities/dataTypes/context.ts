import type { User } from "./user"
import type { Dog, DogSearchParams } from "./dogs"


export interface AuthContext {
    user: User | null,
    login: (name: string, email: string) => Promise<void>,
    logout: () => Promise<void>,
    isMobile: boolean | undefined
}

export interface DogContextType {
    breeds: string[],
    loading: boolean,
    dogs: Dog[] | null,
    searchAndSetDogs: (filters: DogSearchParams) => Promise<void>,
    goToNextPage: () => Promise<void>,
    goToPreviousPage: () => Promise<void>,
    nextQuery: DogSearchParams | null,
    prevQuery: DogSearchParams| null,
    totalResults: number,
    savedDogs: string[]
}