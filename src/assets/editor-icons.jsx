import { Image } from "@chakra-ui/react"
import playImage from './icon-images/icons8-play-48-white.png'

export const RunIcon = function({iconSize}){
    return ( 
        <Image
            boxSize={iconSize}
            src={playImage}
            />
    )

}