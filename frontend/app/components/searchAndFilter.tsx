import { MultiSelect, Select, Popover, ActionIcon, Stack, RangeSlider, Text, Button, SimpleGrid } from "@mantine/core"
import { IconSearch, IconFilter } from "@tabler/icons-react"
import { useState } from "react"
import type { DogSearchParams } from "~/utilities/dataTypes/dogs"
import { useDogContext } from "~/utilities/context/dogProvider"
import { Flex } from "@mantine/core"
import { useAuth } from "~/utilities/context/contextProvider"


export default function SearchAndFilter() {
    const { breeds, searchAndSetDogs } = useDogContext()
    const [opened, setOpened] = useState<boolean>(false)
    const [selectedFilters, setSelectedFilters] = useState<DogSearchParams>({})
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    const [sortField, setSortField] = useState<'breed' | 'name' | 'age'>('breed')
    const { isMobile } = useAuth()

    const handleFilterChange = (key: keyof DogSearchParams, value: any) => {
        setSelectedFilters(prev => ({ ...prev, [key]: value }))
        console.log(selectedFilters)
    }

    const applyFilters = async () => {
        const results = await searchAndSetDogs(selectedFilters)

        console.log(results)
    }

    return (

        <div style={styles.contain}>
            <SimpleGrid
                cols={{ base: 1, sm: 1, md: 1, lg: 1 }}
                p={50}
            >
                <Flex align='center' justify='center' direction={isMobile ? 'column' : 'row'}>
                    <Text style={styles.header}> search dogs </Text>

                    <MultiSelect
                        searchable clearable
                        style={isMobile ? styles.mobile : styles.MultiSelect}
                        placeholder="beagle, pitbull"
                        data={breeds}
                        value={selectedFilters.breeds ?? []}
                        onChange={(value) => handleFilterChange("breeds", value)}
                        leftSection={
                            <Popover width={200} position="bottom-start" withArrow shadow="md" opened={opened} onChange={setOpened}>
                                <Popover.Target>
                                    <ActionIcon variant="light" onClick={() => setOpened((o) => !o)}>
                                        <IconFilter color="#58362a" size={16} stroke={1.5} />
                                    </ActionIcon>
                                </Popover.Target>
                                <Popover.Dropdown>
                                    <Stack>
                                        <Text> Age Range </Text>
                                        <RangeSlider
                                            color='#c9aa9e'
                                            label={value => `${value}`}
                                            minRange={1} min={0} max={14}
                                            defaultValue={[0, 20]}
                                            onChange={(value) => {
                                                handleFilterChange("ageMin", value[0])
                                                handleFilterChange("ageMax", value[1])
                                            }}
                                        />
                                        <MultiSelect
                                            searchable clearable
                                            label="zipcode"
                                            placeholder="enter zipcode"
                                            data={['10001', '90001', '60601']} //dummy data
                                            onChange={(value) => handleFilterChange("zipCodes", value)}
                                        />
                                        <Select
                                            label="Sort by"
                                            data={[
                                                { value: "breed", label: "Breed" },
                                                { value: "name", label: "Name" },
                                                { value: "age", label: "Age" }
                                            ]}
                                            value={sortField}
                                            onChange={(value) => {
                                                setSortField(value as 'breed' | 'name' | 'age')
                                                handleFilterChange("sort", `${value}:${sortOrder}`)
                                            }}
                                        />

                                        <Select
                                            label="Order"
                                            data={[
                                                { value: "asc", label: "A → Z | Youngest → Oldest" },
                                                { value: "desc", label: "Z → A | Oldest → Youngest" },
                                            ]}
                                            value={sortOrder}
                                            onChange={(value) => {
                                                setSortOrder(value as "asc" | "desc")
                                                handleFilterChange("sort", `${sortField}:${value}`)
                                            }}
                                        />
                                        <Button
                                            onClick={applyFilters}
                                            color="#58362a"
                                        >
                                            <Text> APPLY </Text>
                                        </Button>

                                    </Stack>
                                </Popover.Dropdown>
                            </Popover>
                        }
                    />
                    <Button
                        onClick={applyFilters}
                        color="#58362a"
                        style={isMobile ? styles.mobile : {}}
                    >
                        <IconSearch color="#feead2" stroke={5} />

                    </Button>
                </Flex>
            </ SimpleGrid>
        </div>
    )
}


const styles: Record<string, React.CSSProperties> = {
    mobile: {
        width: '100%',
        marginTop: 8,
        marginBottom: 8,

    },
    contain: {
        width: '70%',
        background: '#feead2',
        marginBottom: 50
    },
    MultiSelect: {
        width: "79%",
        paddingRight: 5,
        margin: 'auto'
    },
    col: {
        background: 'white',
        height: 100,
        padding: 20
    },
    text: {
        color: '#58362a',
        paddingRight: 10,

    },
    header: {
        fontFamily: 'Avro',
        fontSize: 26,
        paddingTop: 0,
        color: '#58362a',
        textAlign: 'center'
    }
}