import { Image } from "@chakra-ui/react"
import playImage from './icon-images/icons8-play-48-white.png'

export const RunIcon = function({iconSize}){
    return ( 
        <Image
            boxSize={iconSize}
            src={playImage}
            />
    );
}

export const YingYangIcon = ({iconSize, mr=0, ml=0})=>{
    return <Image mr={mr} ml={ml} boxSize={iconSize} src="https://img.icons8.com/puffy-filled/32/yin-yang.png" alt="yin-yang"/>
}

export const SaveIcon = ({iconSize, mr=0, ml=0})=>{
    return <Image mr={mr} ml={ml} boxSize={iconSize} src="https://img.icons8.com/ios-glyphs/30/save--v1.png" alt="save--v1"/>
}

export const ImportIcon = ({iconSize, mr=0, ml=0})=>{
    return <Image mr={mr} ml={ml} boxSize={iconSize} src="https://img.icons8.com/forma-light-filled/24/import.png" alt="import"/>
}