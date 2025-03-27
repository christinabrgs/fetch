import { useEffect, useState } from "react"
import { useDogContext } from "~/utilities/context/dogProvider"
import { Text, Divider } from "@mantine/core"
import MatchCard from './matchCard'
import DogCard from "~/components/dogCard"
import { fetchDogs, getMatch } from "~/utilities/apiFunctions/functions"
import type { Dog } from "~/utilities/dataTypes/dogs"
import { SimpleGrid, Flex, Loader, Button, Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Link } from "react-router"


export default function Match() {
    const [opened, { open, close }] = useDisclosure(false);
    const { savedDogs } = useDogContext()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [dogs, setDogs] = useState<Dog[]>()
    const [matched, setMatched] = useState<Dog>()

    console.log(savedDogs)
    useEffect(() => {
        const fetchDog = async () => {
            const response = await fetchDogs(savedDogs)
            setDogs(response ? response : [])
            setIsLoading(false)
        }
        fetchDog()
    }, [savedDogs])


    const findMatch = async (savedDogs: string[]) => {
        const match = await getMatch(savedDogs)
        if (match) {
            const data = await fetchDogs([match])
            if (data) {
                setMatched(data[0])
            }
        }
        console.log(match)
    }

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
                    <Flex direction='column' style={{ background: '', minHeight: '83vh', maxHeight: '100%' }}>

                        <Flex justify='space-between' align='center' style={{ width: '70%', margin: 'auto' }}>
                            <Flex
                                justify="flex-start"
                                align=""
                                direction="column"
                                style={styles.header}
                            >
                                <Text size='30' inline={true} className="header">YOUR FAVORITE DOGGIES</Text>
                                <Divider style={{ margin: 10 }} />
                            </Flex>
                            <Button color='yellow' variant='light' >
                                <Link to={'/dashboard'} style={{ textDecoration: 'none', color: '#59362a' }}>
                                    Go Back to Search
                                </Link>
                            </Button>
                        </Flex>

                        {dogs?.length == 0 ?
                            <SimpleGrid
                                cols={{ base: 1, sm: 1, md: 1, lg: 1 }}
                                pb={0}
                                pt={0}
                                style={{ background: '', width: '100%', margin: 'auto' }}
                            >
                                <Text size='20' inline={true} className="header" style={{ textAlign: 'center' }}>no dogs saved :(</Text>
                            </SimpleGrid>
                            :
                            dogs?.map(dog => (
                                <SimpleGrid
                                    cols={{ base: 1, sm: 2, md: 2, lg: 3 }}
                                    pb={0}
                                    pt={40}
                                    style={{ background: '', width: '70%', margin: 'auto' }}
                                >

                                    <div key={dog.id}
                                        style={{
                                            margin: 10,
                                            background: `rgba(242, 231, 226, 0.85)`,
                                            height: 300,
                                        }}>
                                        <DogCard {...dog} />
                                    </div>
                                </SimpleGrid>
                            ))}


                        <Modal opened={opened} onClose={close} withCloseButton={false}>
                            <Text size='30' inline={true} style={styles.title}>MEET YOUR NEW BESTIE</Text>
                            <div key={matched?.id}
                                style={{
                                    margin: 10,
                                    background: ``,
                                    height: '100%',
                                }}>
                                {matched && <MatchCard {...matched} />}
                                <Button style={{ width: '100%' }} size="lg" color='red' variant='light' onClick={() => {
                                    findMatch(savedDogs);
                                    open()
                                }}>
                                    Re-Match
                                </Button>
                            </div>
                        </Modal>
                        <Button size='xl' color='red' style={styles.button} onClick={() => {
                            findMatch(savedDogs);
                            open()
                        }}>
                            Find My Match
                        </Button>
                    </Flex >
                </>
            )
    )
}



const styles: Record<string, React.CSSProperties> = {
    header: {
        paddingBottom: 0,
        fontFamily: 'Roboto',
        color: '#58362a',
        paddingTop: 50
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        color: '#57372a',
        paddingTop: 10,
        paddingBottom: 10

    },
    button: {
        margin: 'auto',
        marginTop: 50,
        marginBottom: 50
    }
}