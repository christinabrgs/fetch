
import { Flex } from "@mantine/core";
import SearchAndFilter from "./searchAndFilter";
import '~/app.css'
import About from "../dashboard/about";



export default function Filter() {

    return (
        <>
            <About />
            <Flex justify='center' direction='column' align='center'
                style={{
                    backgroundImage:
                    `linear-gradient(
                     to bottom,
                     #58362a 0%,
                     #58362a 50%, 
                     #fffaf5 50%, 
                     #fffaf5 100%)`,
                    width: '100%',
                    paddingBottom: 10
                }}>
                <SearchAndFilter />
            </Flex>
        </>
    )
}

// 8d5a47
const styles = {
    text: {
        fontFamily: 'Arvo',
        fontSize: 30,
        paddingTop: 30,
        color: 'white'
    }
}