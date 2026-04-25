import { useState, useContext } from "react";
import { InputContext } from './InputContext.jsx'
import { Languages } from "./Languages.js";
import LanguageSelector from './LanguageSelector'
import { Box } from "@chakra-ui/react";

import AceEditor from "react-ace";
import ace from 'ace-builds';
function Input({languageId, AceTheme}){
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
        <Box
            className='code-input-box'
            w={'100%'} >
            <LanguageSelector 
                languageId={languageId} 
                onSelectLanguage={handleLanguageChange} />
            <AceEditor
                mode={(languageContext.get()).aceName}
                theme={AceTheme}
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
                    EnableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    showPrintMargin: false,
                    highlightActiveLine: true,
                    lineHeight: 24,
                }}/>
        </Box>
    );
}

export default Input;