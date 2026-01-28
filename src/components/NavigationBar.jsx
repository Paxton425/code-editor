import { useContext, useRef } from "react";
import { InputContext } from "./InputContext";
import { HStack, Button, Text, useDisclosure } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider } from '@chakra-ui/react'
import { HamburgerIcon} from '@chakra-ui/icons'

import { YingYangIcon, SaveIcon, ImportIcon } from '../assets/editor-icons';
import { Languages } from "./Languages";
import SaveCodeModal from "./SaveCodeModal";

function NavigationBar({ setTheme, accents}){

    const inputContext = useContext(InputContext);
    const languageContext = inputContext.language;
    const codeContext = inputContext.code;

    const importedFileInpEl = useRef(null);
    const acceptableFileFormats = Languages.map(language=> language.extension);
    const isAcceptableFile = (file)=> {
        if(!file.name.includes('.'))
            return false
        const newFileExtension = file.name.split('.').pop().toLowerCase(); //extract file extension from name
        return Languages.some((language)=>{
            return language.extension.trim() === ('.'+newFileExtension).trim();
        });
    }
    const handleThemeChange = ()=>{
        setTheme(prevAccent => (prevAccent === accents.blue)? accents.light: accents.blue);
    }

    //Code saving
    const { isOpen, onOpen, onClose } = useDisclosure();
    const triggerFileChooser = () => {
        // Open the file selection dialog when the import button is clicked
        importedFileInpEl.current.click();
    };
    const handleImportCode = (event)=>{
        console.log('Triggerd')
        const file = event.target.files[0];
        console.log(event.target.files);
        if(file){
            if (!file.type.startsWith("text")) {
                alert("Unsupported file type😬. Please select a readable/text file.", "error");
                return;
            }

            if(!isAcceptableFile(file)){
                alert("Unsupported file type😬. Please select one of our Supported file Types.", "error");
                return;
            }

            const reader = new FileReader();
            reader.onload = async(e) =>{
                const content = e.target.result;
                codeContext.set(content);
            }
            reader.onerror = ()=> {
                showMessage(`Oops Som went wrong ${error}`, 'error');
            }
            reader.readAsText(file);
        }
    }
    return (
        <HStack 
            mx={8}  
            px={8} 
            h={50} 
            bgGradient="linear(to-r, #e4e4e4ff, #d6d6d6, #7c7c7cff)"
            borderRadius={4} >
            <Text fontSize='xl' fontWeight='bold'>LOGO</Text>
            <Menu>
                <MenuButton as={Button} 
                    backgroundColor={"transparent"} 
                    leftIcon={<HamburgerIcon boxSize={8} />} 
                    className="menu">
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={handleThemeChange}><YingYangIcon iconSize={8} mr={2} />Change Theme</MenuItem>
                    <MenuItem onClick={onOpen}><SaveIcon iconSize={8} mr={2} />Save Code</MenuItem>
                    <MenuItem onClick={triggerFileChooser}><ImportIcon iconSize={8} mr={2} />Import Code</MenuItem>
                </MenuList>
            </Menu>
            <SaveCodeModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
            <input
                type="file"
                ref={importedFileInpEl}
                accept={(acceptableFileFormats).toString()}
                onChange={handleImportCode}
                style={{ display: 'none' }} // Hides the default input
            />
        </HStack>
    );
}

export default NavigationBar;
