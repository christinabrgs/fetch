import { Flex, Text, Button, Image } from "@mantine/core"
import type { Dog } from "~/data/dogs"

export default function DogCard ({ img, name, age, zip_code, breed }: Dog) {
  return (
    <Flex
      direction={"column"}
      justify={"space-evenly"}
      style={styles.flexContainer}
    >
      <Image 
      height={250}
      fit="cover"
      src={img} 
      alt="dog" />
      <div>
        <Text>{name} Age {age}</Text>
        <Text>{zip_code}</Text>
        <Text>{breed}</Text>
      </div>
      <div>
        <Text>Lorem ipsum dolor sit amet, consectetur..</Text>
      </div>
      <Button>Save for Consideration</Button>
    </Flex>
  )
}

const styles = {
  flexContainer: {
    height: "100%",
    backgroundColor: '##dbaf37'

  },
}
