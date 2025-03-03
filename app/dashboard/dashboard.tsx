import { Button, SimpleGrid } from "@mantine/core";
import DogCard from "./dogCard";
import { useEffect } from "react";
import { useAuth } from "~/context/contextProvider";
import { useDogContext } from "~/context/dogProvider";
import Banner from "./banner";
import Filter from "./filter";




export default function Dashboard() {

  const { user } = useAuth()
  const { dogs, searchAndSetDogs, totalResults, nextQuery, prevQuery, goToNextPage, goToPreviousPage } = useDogContext()

  useEffect(() => {
    const fetchDogs = async () => {
      await searchAndSetDogs({})
    }

    fetchDogs()
  }, [user])


  return (
    <>
      <Banner />
      <Filter />
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
        p={40}
        style={{background: 'white'}}
      >
        {dogs?.map((dog) => (
          <div
            key={dog.id}
            style={{
              padding: 10,
              // boxShadow: "0px 5px 15px #000000",
              background: 'white',
              height: 600,

            }}
          >
            <DogCard {...dog} />
          </div>
        ))}
      </SimpleGrid>

      <div>
        <Button onClick={goToPreviousPage} disabled={!prevQuery}>
          Previous
        </Button>
        <span>Showing {dogs?.length} of {totalResults} results</span>
        <Button onClick={goToNextPage} disabled={!nextQuery}>
          Next
        </Button>
      </div>
    </>
  );
}
