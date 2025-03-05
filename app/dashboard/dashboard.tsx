import { Button, Text, Center, Flex, SimpleGrid } from "@mantine/core";
import DogCard from "./dogCard";
import { useEffect, useState } from "react";
import { useAuth } from "~/context/contextProvider";
import { useDogContext } from "~/context/dogProvider";
import Banner from "./banner";
import Filter from "./filter";
import { Loader } from '@mantine/core';
import '~/app.css'


export default function Dashboard() {

  const { user } = useAuth()
  const { dogs, searchAndSetDogs, totalResults, nextQuery, prevQuery, goToNextPage, goToPreviousPage } = useDogContext()
  const [isLoading, setIsLoading] = useState<boolean>(true)


  useEffect(() => {
    const fetchDogs = async () => {
      await searchAndSetDogs({})
      setIsLoading(false)
    }

    fetchDogs()
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
          <Banner />
          <Filter />
          <div style={{background: '#fffaf5'}}>

          <Flex justify='flex-start' style={{width: '70%', margin: 'auto', background: '#fffaf5'}}>
            <Flex
              justify="flex-start"
              align=""
              direction="column"
              style={styles.header}
            >
              <Text size='30' inline={true} className="header">MEET YOUR NEW BEST FRIEND!</Text>
              <Text style={styles.count}>
                {totalResults} <span style={{ color: "#58362a" }}>in need of a forever home</span>
              </Text>
            </Flex>
          </Flex>

          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 2, lg: 3 }}
            pb={0}
            pt={40}
            style={{ background: '#fffaf5', width: '70%', margin: 'auto' }}
          >
            {dogs?.map((dog) => (
              <div
                key={dog.id}
                style={{
                  margin: 10,
                  background: `rgba(242, 231, 226, 0.85)`,
                  height: 300,


                }}
              >
                <DogCard {...dog} />
              </div>
            ))}
          </SimpleGrid>

          <Flex
            justify='center'
            align='center'
            style={styles.paginate}
          >
            <Button variant='gradient' color="brown" onClick={goToPreviousPage} disabled={!prevQuery}>
              Previous
            </Button>
            <Text style={styles.count}>{totalResults} RESULTS </Text>

            <Button color='red' onClick={goToNextPage} disabled={!nextQuery}>
              Next
            </Button>
          </Flex>
        </div>
        </>
      )
  );
}


const styles = {
  paginate: {
    padding: 60,
    fontFamily: 'Roboto',
    color: '#58362a'  
  },
  header: {
    paddingBottom: 0,
    fontFamily: 'Roboto',
    color: '#58362a'  
  },
  count: {
    padding: 10
  }
}