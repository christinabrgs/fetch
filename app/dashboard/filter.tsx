
import { Center, Flex, Text } from "@mantine/core";
import SearchAndFilter from "./searchAndFilter";
import '~/app.css'

export default function Filter() {

    return (
        <Flex justify='center' direction='column' align='center'
        style={{
            backgroundImage:
                `linear-gradient(
            to bottom,
            #8d5a47 0%,
            #8d5a47 50%, 
            #8d5a47 50%, 
            #8d5a47 100%
          )`}}>
            <Text style={styles.text}> FILTER SEARCH </Text>
            <SearchAndFilter />
            </Flex>
    )
}


const styles = {
    text: {
        fontFamily: 'Arvo',
        fontSize: 30,
        paddingTop: 40,
        color: 'white'
    }
}