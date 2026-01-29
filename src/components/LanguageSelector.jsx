import { Box, Text, Select } from "@chakra-ui/react";
import { Languages } from "./Languages.js";

function LanguageSelector({ languageId, onSelectLanguage }) {
    return (
        <Box  m={{ base: 0, md: 2}} mb={{ base: 2, md: 0}}>
            <Text mb={2} fontSize='lg'>Language:</Text>
            <Select 
                value={languageId}
                onChange={(e) => onSelectLanguage(e.target.value)} 
                width='200px' 
                variant="filled"
                placeholder='Choose language'
            >
                {Languages.map((lang) => (
                    <option 
                        key={lang.id} 
                        value={lang.id}
                        style={(lang.id === languageId)?
                            { backgroundColor: '#d6d6d6', color: 'white' } : {}
                            }>
                            {lang.name}
                    </option>
                ))}
            </Select>
        </Box>
    );
}

export default LanguageSelector;

;