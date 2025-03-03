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
            <SimpleGrid
                cols={{ base: 1, sm: 1, md: 1, lg: 4 }}
                p={20}
            >
                {/* <div> */}
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
                                        >
                                            apply
                                        </Button>

                                    </Stack>
                                </Popover.Dropdown>
                            </Popover>
                        }
                    />
                    <Button
                        color="white"
                        onClick={applyFilters}
                    >
                        <IconSearch color="#8d5a47" stroke={5}/>
                    </Button>
                </Flex>
                {/* </div> */}
            </ SimpleGrid>
        </div>
    )
}


const styles = {
    contain: {
        width: '80%',
        background: '#8d5a47'
    },
    MultiSelect: {
        width: "60%",
        margin: "auto",
    },
    col: {
        background: '#8d5a47',
        height: 100,
    },
    text: {
        color: 'white',
        paddingRight: 10,

    }
}