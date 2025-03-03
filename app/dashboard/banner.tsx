
import { Center, Image } from "@mantine/core";
import { useEffect } from "react";
import { useDogContext } from "~/context/dogProvider";
import dog from '~/dogbanner.png'


export default function Banner() {

    return (
        <Center style={{background: 'white'}}>
            <img
                style={{height: 500}}
                src={dog}
                alt="dog" />
        </Center>
    )
}