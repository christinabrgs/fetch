import { Flex, Text, Button, Image } from "@mantine/core"
import React, { useState } from "react"
import type { Dog } from "~/data/dogs"
import '~/app.css'
import { IconHeart, IconHeartFilled } from "@tabler/icons-react"



export default function DogCard({ img, name, age, zip_code, breed }: Dog) {
  const [isClicked, setIsClicked] = useState<boolean>(false);


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
        <Flex justify='space-between' align='flex-end' style={styles.description}>
          <Text style={styles.text}>{name} | {age}</Text>
          <Text style={[styles.text, {fontSize: 14}]}>{breed}</Text>
        </Flex>

        <Button 
        variant='white' 
        color='#58362a'
        onClick={() => setIsClicked(!isClicked)}
        >
          {isClicked? (<IconHeartFilled color='red' style={{ paddingRight: 5 }} />) : (<IconHeart color='red' style={{ paddingRight: 5 }} /> )} Match Me
        </Button>
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
    background: `rgba(242, 231, 226, 0.85)`,
    color: 'black,'

  },
  description: {
    paddingBottom: 15,
  },
  text: {
    fontFamily: 'Arvo',
    color: '#58362a',
    fontSize: 18
  },
  image: {
    width: '100%',
    height: 200,
  }
}
