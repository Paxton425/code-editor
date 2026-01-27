import { fetchOutput } from './api'
import { useState } from "react";
import { Button, Box, Text } from "@chakra-ui/react";
import { output } from 'framer-motion/client';

function Output({languageId, sourceCode}) {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ outPutSate, setOutputState ] = useState({state: 'normal', output: ''});

    const handleExecute = async ()=>{
        try{
            setIsLoading(true);
            const outputObj = await fetchOutput(languageId, sourceCode);
            // Logic: Check for stdout first, then stderr, then compile_output
            if (outputObj.stdout) {
                setOutputState({ state: 'normal', output: result.stdout });
            } else if (outputObj.stderr) {
                setOutputState({ state: 'error', output: result.stderr });
            } else if (outputObj.compile_output) {
                setOutputState({ state: 'error', output: result.compile_output });
            } else {
                setOutputState({ state: 'error', output: "No output" });
            }   
        } catch(error){
            setOutputState({state: 'error', output: 'Execution Error'})
            console.log('Execution Error! ', error)
        } finally {
            setIsLoading(false);
        }
    }

    return( 
        <Box w='100%'>
            <Text mb={2} fontSize='lg'>Output:</Text>
            <Button 
                onClick={handleExecute}
                isLoading = {isLoading}
                isDisabled = {isLoading}
                variant='outline'
                colorScheme='teal' 
                mx={2} mb={3}>
                    Execute
            </Button>
            <Box 
                p={2}
                height='80vh'
                width='100%'
                border={'1px solid'}
                borderColor={(outPutSate.state === 'normal')?'#333': 'red.500'}>
                <Text 
                    color={(outPutSate.state === 'normal')?'#333': 'red.400'}
                    w='100%' 
                    h='100vh'>
                    {
                        (isLoading)?  'Please Wait...' : outPutSate.output
                    }
                </Text>
            </Box>
        </Box>
    );
}

export default Output;