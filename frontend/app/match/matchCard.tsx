import { Flex, Text, Button, Image } from "@mantine/core"
import React, { useState, useEffect } from "react"
import type { Dog } from "~/utilities/dataTypes/dogs"
import '~/app.css'
import { removeDog, saveDog } from "~/utilities/dbFunctions/functions"
import { useDogContext } from "~/utilities/context/dogProvider"

export default function matchCard({ img, name, age, zip_code, breed, id }: Dog) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const { savedDogs } = useDogContext()

  useEffect(() => {
    savedDogs.map(matchedID => {
      if (matchedID === id)
        setIsClicked(true)
    }
    )
  }, [])

  const toggleSave = async (id: string) => {
    if (isClicked) {
      await removeDog(id)
    } else {
      await saveDog(id)
    }
  }



  return (
    <Flex
      direction={"column"}
      justify={"space-evenly"}
      style={styles.flexContainer}
    >
      <Image
        fit='cover'
        src={img}
        alt="dog"
        style={styles.image}
      />

      <Flex
        direction='column'
        style={styles.card}
      >
        <Flex justify='space-between' align='flex-start' direction='column' style={styles.description}>
          <Flex align='baseline' justify='space-between' style={{ width: '100%' }}>
            <Text style={styles.text}> {name} </Text>
            <Text> {age}  year(s) old </Text>
          </Flex>
          <Text style={[styles.text, { fontSize: 14 }]}>{breed}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

const styles: Record<string, React.CSSProperties> = {
  flexContainer: {
    height: '100%',
    borderRadius: 0,

  },
  card: {
    padding: 10,
    width: '100%',
    background: ``,
    color: 'black,'

  },
  description: {
    paddingBottom: 15,
    width: '100%'
  },
  text: {
    fontFamily: 'Arvo',
    color: '#58362a',
    fontSize: 18
  },
  image: {
    width: '100%',
    height: 500,
  }
}
