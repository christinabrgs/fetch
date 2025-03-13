import { Button, Text, Center, Flex, SimpleGrid, Divider } from "@mantine/core";
import DogCard from "./dogCard";
import { useEffect, useState } from "react";
import { useAuth } from "~/utilities/context/contextProvider";
import { useDogContext } from "~/utilities/context/dogProvider";
import Banner from "./banner";
import Filter from "./filter";
import { Loader } from '@mantine/core';
import '~/app.css'
import { useNavigate } from "react-router";

function useFetch<T>(request: Promise<Response>, opts?: {redirectOn?: Record<number, string>}): {data: T | null, loading: boolean, error?: Error} {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const navigate = useNavigate()

  useEffect(() => {
    async function handle() {
      try {
        const resolved = await request;
        if (!resolved.ok && opts?.redirectOn && resolved.status in opts.redirectOn) {
          navigate(opts.redirectOn[resolved.status])
        } else if (!resolved.ok) {
          setError(new Error(await resolved.text()))
        }
        setData(await resolved.json());
      } catch(err) {
        if (err instanceof Error) {
          setError(err)
        } else {
          setError(new Error(`Unexpected Error: ${err}`))
        }
      }
      setLoading(false);
    }
    handle()// Redirect heree()
  }, []);

  return {data, loading, error}
}

export default function Dashboard() {

  const { user } = useAuth()
  const { dogs, searchAndSetDogs, totalResults, nextQuery, prevQuery, goToNextPage, goToPreviousPage } = useDogContext()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  // useFetch(fetch("hello.com"), {redirectOn: {401: "/login"}})

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
                {totalResults} <span style={{ color: "#58362a" }}>in need of a home</span>
              </Text>
              <Divider />
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