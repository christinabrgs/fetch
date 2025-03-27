import { Text, Flex, Image } from "@mantine/core"
import Dog from '~/doglarge.png'
import '~/app.css'
import { IconBoneFilled } from "@tabler/icons-react"
import { useAuth } from "~/utilities/context/contextProvider"

export default function About() {

    const { isMobile } = useAuth()

    return (
        <Flex justify='center'
            style={{
                background: `#58362a`,
                width: '100%',
                padding: 60
            }}>
            <Flex justify='center' direction={isMobile ? 'column' : 'row'} align='center'
                style={
                    isMobile ?
                        { width: '100%' } :
                        {
                            background: `rgba(255, 250, 246, 0)`,
                            width: '75%',
                            paddingTop: 50,
                            paddingBottom: 50
                        }}
            >

                <Flex align='end' direction='column'
                    style={
                        isMobile ?
                            { width: '100%' } :
                            {
                                width: '60%'
                            }}>

                    <Text style={styles.header}>
                        Why Fetch? <IconBoneFilled color="white" />
                    </Text>
                    <Text style={styles.description}>
                        Looking for a loyal friend to brighten your days? Our shelter is full of loving dogs eager for a second chance.
                        Whether you're searching for a playful pup or a gentle senior, there's a perfect match waiting just for you.
                        Adopt today and give a deserving dog the forever home they deserve!
                    </Text>

                    <Flex align='center' direction='row' style={{ height: 120, width: '100%' }}>
                        <Flex align='start' direction='column' style={{ height: 100, width: '50%' }}>
                            <Text style={styles.sub}>
                                10
                            </Text>
                            <Text style={styles.points}>
                                Years of finding loving homes for dogs.
                            </Text>
                        </Flex>
                        <Flex align='start' direction='column' style={{ height: 100, width: '50%' }}>
                            <Text style={styles.sub}>
                                9000
                            </Text>
                            <Text style={styles.points}>
                                And counting placed with their perfect families
                            </Text>
                        </Flex>
                    </Flex>

                </Flex>

                <Flex justify='center' align='center' style={isMobile? {width: '100%', paddingTop: 60} : { width: '30%' }}>
                    <img
                        height={400}
                        src={Dog}
                    />
                </Flex>
            </Flex>
        </Flex>
    )
}


const styles: Record<string, React.CSSProperties> = {
    description: {
        fontSize: 16,
        fontFamily: 'Roboto',
        color: 'white',
        width: '100%',
        textAlign: 'left',
        paddingTop: 20,
        paddingBottom: 20
    },
    points: {
        fontSize: 16,
        fontFamily: 'Roboto',
        color: 'white',
        width: '90%',
        textAlign: 'left',
    },
    header: {
        fontFamily: 'Arvo',
        fontSize: 30,
        color: '#FFD8BA',
        textAlign: 'left',
        width: '100%',
        fontWeight: 700

    },
    sub: {
        fontFamily: 'Arvo',
        fontSize: 26,
        color: 'white',
        textAlign: 'left',
        width: '100%',
        fontWeight: 700

    }
}