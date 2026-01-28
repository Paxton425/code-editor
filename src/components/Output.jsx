import { fetchOutput } from './api'
import { useState } from "react";
import { Button, Box, Text } from "@chakra-ui/react";
import { RunIcon } from '../assets/editor-icons';

function Output({languageId, sourceCode}) {
    //Defining constants
    const outputState = Object.freeze({ 
        NORMAL: 'Normal',
        LOADING: 'Loading',
        ERROR: 'Error',
        WARNNING: 'Warnning'
    });
    const [ isLoading, setIsLoading ] = useState(false);
    const [ outPut, setOutput ] = useState({state: outputState.NORMAL, content: ''});

    const loadingContent = {
        start: (loadingMessage = 'Please Stand By😉...')=>{
            setIsLoading(true);
            setOutput({state: outputState.LOADING, content: loadingMessage});
        },
        done: (outPutSate, outPutContent)=>{
            if(!outPutSate || !outPutContent)
                throw new Error('Loading stopped with incomplete output feedback arguments!')
            setIsLoading(false);
            setOutput({ state: outPutSate, content: outPutContent });
        }
    }

    const sortContent = (content)=>{
        const sortedContent =  content.split('\n')
        console.log('SC', sortedContent)
        return sortedContent;
    }

    const handleExecute = async ()=>{
        try{
            loadingContent.start();
            const outputObj = await fetchOutput(languageId, sourceCode);
            // Logic: Check for stdout first, then stderr, then compile_output
            console.log('Out P', outputObj);
            if (outputObj.stdout) 
                loadingContent.done(outputState.NORMAL, outputObj.stdout);
            else if (outputObj.stderr)
                loadingContent.done(outputState.ERROR, outputObj.stderr);
            else if (outputObj.compile_output) 
                loadingContent.done(outputState.ERROR, outputObj.compile_output);
            else
                loadingContent.done(outputState.ERROR, "No output");

        } catch(error){
            loadingContent.done(outputState.ERROR, 'Execution Error');
            console.log('Execution Error! ', error);
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
                bgGradient="linear(to-r, blue.400, blue.500, blue.700)"
                color="white"
                _hover={{
                    bgGradient: "linear(to-r, blue.500, blue.600, blue.700)",
                    boxShadow: "xl",
                }}
                _active={{
                    bgGradient: "linear(to-r, blue.600, blue.700, blue.800)",
                }}
                rightIcon={<RunIcon iconSize={6} />}
                m={2}>
                    Run
            </Button>
            
            <Box 
                p={4}
                height='80vh'
                width='100%'
                border={'1px solid'}
                borderColor={(outPut.state === outputState.NORMAL || outputState.WARNNING)?'#333': 'red.500'}
                backgroundColor={'#000'}>
                <Box 
                    color={(outPut.state === outputState.NORMAL)?'#13bd0dff':
                            (outPut.state === outputState.LOADING)?'#0077ffff':
                            'red.400'
                        }
                    w='100%' 
                    h='100vh'>
                    {sortContent(outPut.content).map((line, index)=>(<Text key={index}>{line}</Text>))}
                </Box>
            </Box>
        </Box>
    );
}

export default Output;