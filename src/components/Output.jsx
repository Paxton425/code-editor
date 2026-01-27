import { fetchOutput } from './api'
import { useState } from "react";
import { Button, Box, Text } from "@chakra-ui/react";
import { output } from 'framer-motion/client';
import { RunIcon } from '../assets/editor-icons';

function Output({languageId, sourceCode}) {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ outPutSate, setOutputState ] = useState({state: 'normal', output: ''});

    const handleExecute = async ()=>{
        try{
            setIsLoading(true);
            const outputObj = await fetchOutput(languageId, sourceCode);
            // Logic: Check for stdout first, then stderr, then compile_output
            if (outputObj.stdout) {
                setOutputState({ state: 'normal', output: outputObj.stdout });
            } else if (outputObj.stderr) {
                setOutputState({ state: 'error', output: outputObj.stderr });
            } else if (outputObj.compile_output) {
                setOutputState({ state: 'error', output: outputObj.compile_output });
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
                variant='solid'
                colorScheme='blue' 
                rightIcon={<RunIcon iconSize={6} />}
                m={2}>
                    Run
            </Button>
            
            <Box 
                p={4}
                height='80vh'
                width='100%'
                border={'1px solid'}
                borderColor={(outPutSate.state === 'normal')?'#333': 'red.500'}
                backgroundColor={'#000'}>
                <Text 
                    color={(outPutSate.state === 'normal')?'#c7c7c7ff': 'red.400'}
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