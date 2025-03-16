import { useEffect, useState } from "react"
import { useAuth } from "~/utilities/context/contextProvider"
import { useDogContext } from "~/utilities/context/dogProvider"
import { Text } from "@mantine/core"
import DogCard from "~/dashboard/dogCard"
import { fetchDogs } from "~/utilities/apiFunctions/functions"
import type { Dog } from "~/utilities/dataTypes/dogs"
import { SimpleGrid, Flex, Loader } from "@mantine/core"



export default function Match() {

    const { user } = useAuth()
    const { savedDogs } = useDogContext()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [dogs, setDogs] = useState<Dog[]>()

    useEffect(() => {
        const fetchDog = async () => {
            const response = await fetchDogs(savedDogs)
            if (response) {
                setDogs(response)
            }
            setIsLoading(false)
        }

        fetchDog()
    }, [user])


    return (
        isLoading ? (
            <Flex
                justify='center'
                align='center'
                style={{
                    height: '100vh',
                }}
            >
                <Loader color="orange" size="xl" />
            </Flex>
        )
            : (
                <>
                    <Text> Christina </Text>
                    <SimpleGrid
                        cols={{ base: 1, sm: 2, md: 2, lg: 3 }}
                        pb={0}
                        pt={40}
                        style={{ background: '#fffaf5', width: '70%', margin: 'auto' }}
                    >
                        {dogs?.map(dog => (
                            <div>
                                <DogCard key={dog.id} {...dog} />
                            </div>

                        ))}
                    </SimpleGrid>
                </>
            )
    )
}