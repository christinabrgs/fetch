import { MultiSelect, Select, Popover, ActionIcon, Stack, RangeSlider, Text, Button, SimpleGrid } from "@mantine/core"
import { IconSearch, IconFilter } from "@tabler/icons-react"
import { useState, useEffect } from "react"
import type { DogSearchParams } from "~/data/dogs"
import { useDogContext } from "~/context/dogProvider"
import { searchDogs } from "~/dbFunctions/functions"
import { Flex } from "@mantine/core"


export default function SearchAndFilter() {
    const { breeds, searchAndSetDogs } = useDogContext()
    const [opened, setOpened] = useState<boolean>(false)
    const [selectedFilters, setSelectedFilters] = useState<DogSearchParams>({})
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

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
            <Text style={styles.header}> FILTER SEARCH </Text>
            <SimpleGrid
                cols={{ base: 1, sm: 1, md: 1, lg: 1 }}
                p={50}
            >
                 <MultiSelect
                        searchable clearable
                        style={styles.MultiSelect}
                        placeholder="beagle"
                        data={breeds}
                        value={selectedFilters.breeds ?? []}
                        onChange={(value) => handleFilterChange("breeds", value)}
                        leftSection={
                            <Popover width={200} position="bottom-start" withArrow shadow="md" opened={opened} onChange={setOpened}>
                                <Popover.Target>
                                    <ActionIcon variant="light" onClick={() => setOpened((o) => !o)}>
                                        <IconFilter size={16} stroke={1.5} />
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
                                                { value: "asc", label: "A → Z" },
                                                { value: "desc", label: "Z → A" }
                                            ]}
                                            value={sortOrder}
                                            onChange={(value) => {
                                                setSortOrder(value as "asc" | "desc")
                                                handleFilterChange("sort", `breed:${value as "asc" || "desc"}`)
                                            }}
                                        />
                                        <Button
                                            onClick={applyFilters}
                                            color="#58362a"
                                        >
                                            <IconSearch color="#feead2" stroke={5} />

                                        </Button>

                                    </Stack>
                                </Popover.Dropdown>
                            </Popover>
                        }
                    />
            </ SimpleGrid>
        </div>
    )
}


const styles: Record<string, React.CSSProperties> = {
    contain: {
        width: '70%',
        background: '#feead2',
        marginBottom: 50
    },
    MultiSelect: {
        width: "70%",
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
        fontFamily: 'Arvo',
        fontSize: 30,
        paddingTop: 40,
        color: '#58362a',
        textAlign: 'center'
    }
}