
import { Center, Flex, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import dog from '~/dogarm.png'
import '~/app.css'
import { IconDog } from "@tabler/icons-react";


export default function Banner() {
    const [width, setWidth] = useState<string>('50%')
    const [height, setHeight] = useState<string>('50%')

    const isMobile = useMediaQuery("(max-width: 813px)")


    useEffect(() => {
        if (isMobile) {
            setHeight('80%')
            setWidth('80%')
        }
    }, [])

    return (
        isMobile ?
            (<Flex justify='center' align='center' style={{ backgroundImage: `url(${dog})`, height: '70vh', backgroundPosition: 'center' }}>
                <Flex
                    justify='center'
                    align='center'
                    direction='column'
                    style={{
                        background: `rgba(0, 0, 0, 0.3)`,
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <Text style={{ fontFamily: 'Sour Gummy', fontWeight: '800', color: 'white', fontSize: 28 }}>
                        Let's Find Your Forever Friend
                    </Text>
                    <Text style={{ fontFamily: 'Roboto', fontWeight: '400', color: 'white', fontSize: 18 }}>
                        We help connect good humans to good dogs.
                    </Text>
                </Flex>
            </Flex>)
            :
            (
                <Flex justify='center' align='center' style={{ backgroundImage: `url(${dog})`, height: '80vh', backgroundPosition: 'center' }}>
                    <Flex
                        justify='center'
                        align='center'
                        direction='column'
                        style={{
                            background: `rgba(0, 0, 0, 0.3)`,
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <Text style={{ fontFamily: 'Sour Gummy', fontWeight: '800', color: 'white', fontSize: 50 }}>
                            Let's Find You a Forever Friend
                        </Text>
                        <Text style={{ fontFamily: 'Roboto', fontWeight: '400', color: 'white', fontSize: 25 }}>
                            We help connect good humans to good dogs.
                        </Text>
                    </Flex>
                </Flex>
            )
    )
}