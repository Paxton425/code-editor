import NavigationBar from './components/NavigationBar.jsx';
import CodeEditor from  './components/CodeEditor.jsx'
import InputContextProvider from './components/InputContext.jsx'

import { useState} from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'


const accents = {
  blue: {
    900: '#060d18ff',
    800: '#0e2038ff',
    700: '#1a365d',
    600: '#153e75',
    500: '#2a69ac',
    400: '#3682d3ff'
  },
  light: {
    900: '#c0c0c0ff',
    800: '#e9e9e9ff',
    700: '#a5a5a5ff',
    600: '#8d8d8dff',
    500: '#4d4d4dff',
    400: '#383838ff'
  }
}

// Create a function to generate themes based on a "mode"
const makeTheme = (accent) => extendTheme({
  colors: {
    brand: accent,
  },
});



function App() {
  const [accent, setAccent] = useState(accents.blue);
  const theme = makeTheme(accent);

  return (
    <ChakraProvider theme={theme}>
      <Box minH='150vh' bg={(accent == accents.blue)? 'brand.900':'brand.700'} color='brand.400' py={8}>
        <InputContextProvider>
          <NavigationBar setTheme={setAccent} accents={accents} />
          <CodeEditor isDarkTheme={(accent == accents.blue)} /> 
        </InputContextProvider>
      </Box>
    </ChakraProvider>
  )
}

export default App
