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
                cols={{ base: 1, sm: 2, md: 2, lg: 4 }}
                p={20}
            >
                <Flex
                    justify='center'
                    align='center'
                    direction='row'
                    style={styles.col}>
                    <Text style={styles.text}> AGE RANGE </Text>
                    <RangeSlider
                        color="#c9aa9e"
                        style={{ width: '60%' }}
                        label={value => `${value}`}
                        minRange={1} min={0} max={14}
                        defaultValue={[0, 20]}
                        onChange={(value) => {
                            handleFilterChange("ageMin", value[0])
                            handleFilterChange("ageMax", value[1])
                        }}
                    />
                </Flex>

                <Flex
                    justify='center'
                    align='center'
                    direction='row'
                    style={styles.col}>
                    <Text style={styles.text}> ZIPCODE </Text>

                    <MultiSelect
                        searchable clearable
                        label=""
                        placeholder="enter zipcode"
                        data={['10001', '90001', '60601']} //dummy data
                        onChange={(value) => handleFilterChange("zipCodes", value)}
                    />
                </Flex>

                <Flex
                    justify='center'
                    align='center'
                    direction='row'
                    style={styles.col}>
                    <Text style={styles.text}> SORT </Text>
                    <Select
                        label=""
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
                </Flex>

                <Flex
                    justify='center'
                    align='center'
                    style={styles.col}>
                    <Text style={styles.text}> BREED </Text>
                    <MultiSelect
                        searchable clearable
                        style={styles.MultiSelect}
                        placeholder="beagle"
                        data={breeds}
                        value={selectedFilters.breeds ?? []}
                        onChange={(value) => handleFilterChange("breeds", value)}
                    />
                    <Button
                        color="#58362a"
                        onClick={applyFilters}
                        size='sm'
                    >
                        <IconSearch color="#feead2" stroke={5} />
                    </Button>
                </Flex>
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
        width: "55%",
        margin: "auto",
    },
    col: {
        background: '#feead2',
        height: 100,
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