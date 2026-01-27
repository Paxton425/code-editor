import CodeEditor from  './components/CodeEditor.jsx'

import { useState } from 'react';
import { render } from "react-dom";
import { Box } from '@chakra-ui/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Box minH='100vh' bg='#0f0a19' color='gray.500' py={8}>
        <CodeEditor />
      </Box>
    </>
  )
}

export default App
