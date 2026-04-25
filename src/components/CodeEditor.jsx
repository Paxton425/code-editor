import './CodeEditor.css'
import { Languages } from "./Languages.js";
import Input from  './Input';
import Output from './Output';

import { useState, useContext } from 'react';
import { InputContext } from './InputContext.jsx'
import { Box, HStack, Flex } from '@chakra-ui/react'

// This tells Ace where to find its internal mode and theme files
ace.config.set("basePath", "https://cdn.jsdelivr.net/npm/ace-builds@1.32.2/src-noconflict/");
ace.config.set("modePath", "https://cdn.jsdelivr.net/npm/ace-builds@1.32.2/src-noconflict/");
ace.config.set("themePath", "https://cdn.jsdelivr.net/npm/ace-builds@1.32.2/src-noconflict/");

function CodeEditor({ isDarkTheme }) {
    const inputContext = useContext(InputContext);
    const languageContext = inputContext.language;
    const codeContext = inputContext.code;

    return(
        <Box m={8}>
            <Flex 
                direction={{ base: 'column', md: 'row' }} // Column on mobile, Row on desktop
                minH="100vh"
                width='100%'
                gap={4}
                m={{ base: 2, md: 8 }} // Smaller margins on mobile
                >
                <Box className='code-input-box'
                    w={{ base: '100%', md:'50%' }}
                    >
                    <Input languageId={languageContext.get().id} AceTheme={isDarkTheme? 'monokai':'tomorrow'} />
                </Box>
                <Box className='output-box' w={'50%'}>
                    <Output languageId={languageContext.get().id} sourceCode={codeContext.get()} />
                </Box>
            </Flex>
        </Box>
    )
}

export default CodeEditor;