import { Text, Flex } from "@mantine/core"


export default function About() {


    return (
        <Flex justify='center' direction='column' align='center'
            style={{
                background: `#8d5a47`,
                width: '100%',
                margin: 'auto'
            }}>
            <Text style={styles.header}>
                Why Fetch?
            </Text>
            <Text style={styles.description}>
                Looking for a loyal friend to brighten your days? Our shelter is full of loving dogs eager for a second chance.
                Whether you're searching for a playful pup or a gentle senior, there's a perfect match waiting just for you.
                Adopt today and give a deserving dog the forever home they deserve! 🐶❤️
            </Text>
        </Flex>
    )
}


const styles: Record<string, React.CSSProperties> = {
    description: {
        fontSize: 16,
        fontFamily: 'Arvo',
        color: 'white',
        width: '55%',
        textAlign: 'center',
        padding: 100,
        paddingTop: 40
    },
    header: {
        fontFamily: 'Arvo',
        fontSize: 30,
        paddingTop: 100,
        color: 'white',
        textAlign: 'center'
    }
}