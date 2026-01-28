import LanguageSelector from './LanguageSelector'
import { Languages } from "./Languages.js";
import Output from './Output';

import { useState, useContext } from 'react';
import { InputContext } from './InputContext.jsx'
import { Box, HStack, Flex } from '@chakra-ui/react'
import AceEditor from "react-ace";
import ace from 'ace-builds';

// This tells Ace where to find its internal mode and theme files
ace.config.set("basePath", "https://cdn.jsdelivr.net/npm/ace-builds@1.32.2/src-noconflict/");
ace.config.set("modePath", "https://cdn.jsdelivr.net/npm/ace-builds@1.32.2/src-noconflict/");
ace.config.set("themePath", "https://cdn.jsdelivr.net/npm/ace-builds@1.32.2/src-noconflict/");

function CodeEditor({ isDarkTheme }) {
    const inputContext = useContext(InputContext);
    const languageContext = inputContext.language;
    const codeContext = inputContext.code;

    const handleCodeChange = (newValue)=> {
        codeContext.set(newValue);
    }
    const handleLanguageChange = (newLangId) => {
        try{
            let newLanguage = Languages.find((language) => language.id == newLangId);
            console.log('Current language: ', newLanguage, 'id: ', newLangId)
            if(newLanguage){
                languageContext.set(newLanguage);
                codeContext.set(newLanguage.sample);
            }
        } catch(error){
            console.log('Error while setting language: '+error);
        }
    }

    return(
        <Box m={8}>
            <HStack spacing={4}>
                <Box w='50%'>
                    <LanguageSelector 
                        languageId={(languageContext.get()).id} 
                        onSelectLanguage={handleLanguageChange} />
                    <AceEditor
                        mode={(languageContext.get()).aceName}
                        theme={isDarkTheme? 'monokai':'tomorrow'}
                        name='ace-editor-instance'
                        value={codeContext.get()}
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
                    <Output languageId={languageContext.get().id} sourceCode={codeContext.get()} />
                </Box>
            </HStack>
        </Box>
    )
}

export default CodeEditor;