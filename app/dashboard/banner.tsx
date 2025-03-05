
import { Center, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import dog from '~/dogbanner.png'


export default function Banner() {
    const [width, setWidth] = useState<string>('50%')
    const [height, setHeight] = useState<string>('50%')

    const isMobile = useMediaQuery("(max-width: 1300px)")
    const isPhone = useMediaQuery("(max-width: 700px)")


    useEffect(() => {
        if (isMobile) {
            setHeight('80%')
            setWidth('80%')
        }
    }, [])

    return (
        isMobile ? (
            isPhone ? ( <Center style={{ background: 'white', height: '30vh' }}>
                <img
                    style={{ height: '100%' }}
                    src={dog}
                    width='88%'
                    alt="dog" />
            </Center>) : (
            <Center style={{ background: 'white', height: '50%' }}>
                <img
                    style={{ height: '100%' }}
                    src={dog}
                    width='80%'
                    alt="dog" />
            </Center>)
        )
            : (
                <Flex justify='center' align='end' style={{ background: 'white', height: '60vh' }}>
                    <img
                        style={{ height: '90%' }}
                        src={dog}
                        width='50%'
                        alt="dog" />
                </Flex>
            )
    )
}