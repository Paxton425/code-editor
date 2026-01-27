import LanguageSelector from './LanguageSelector'
import { Languages } from "./Languages.js";
import Output from './Output';

import { useState } from 'react';
import { Box, HStack, Flex } from '@chakra-ui/react'
import AceEditor from "react-ace";
import ace from 'ace-builds';

// This tells Ace where to find its internal mode and theme files
ace.config.set("basePath", "https://cdn.jsdelivr.net/npm/ace-builds@1.32.2/src-noconflict/");
ace.config.set("modePath", "https://cdn.jsdelivr.net/npm/ace-builds@1.32.2/src-noconflict/");
ace.config.set("themePath", "https://cdn.jsdelivr.net/npm/ace-builds@1.32.2/src-noconflict/");

function CodeEditor() {

    const defaultLang = Languages[2];
    const [ code, setCode ]  = useState(`//Type Some ${defaultLang.name} Code Here... \n\n${defaultLang.sample}`);
    const handleCodeChange = (newValue)=> {
        setCode(newValue);
    }

    const [ language, setLanguage ] = useState(defaultLang);
    const handleLanguageChange = (newLangId) => {
        try{
            let newLanguage = Languages.find((language) => language.id == newLangId);
            console.log('Current language: ', newLanguage, 'id: ', newLangId)
            if(newLanguage){
                setLanguage(newLanguage);
                setCode(newLanguage.sample);
            }
        } catch(error){
            console.log('Error while setting language: '+error);
        }
    }

    return(
        <Box m={16}>
            <HStack spacing={4}>
                <Box w='50%'>
                    <LanguageSelector 
                        languageId={language.id} 
                        onSelectLanguage={handleLanguageChange} />
                    <AceEditor
                        mode={language.aceName}
                        theme='textmate'
                        name='ace-editor-instance'
                        value={code}
                        onChange={handleCodeChange}
                        fontSize={16}
                        fontFamily='consolata'
                        height='80vh'
                        width='100%'
                        editorProps={{ $blockScrolling: true }} 
                        setOptions={{
                            useWorker: false, // Disabling workers prevents the 404 mode-python.js error
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            showPrintMargin: false,
                            highlightActiveLine: true,
                            lineHeight: 24,
                        }}/>
                </Box>
                <Box w={'50%'}>
                    <Output languageId={language.id} sourceCode={code} />
                </Box>
            </HStack>
        </Box>
    )
}

export default CodeEditor;