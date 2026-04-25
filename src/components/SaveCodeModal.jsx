import { useRef, useContext } from 'react';
import { InputContext } from './InputContext';
import {
  Button, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'

function SaveCodeModal({ isOpen, onOpen, onClose }) {

  const inputContext = useContext(InputContext);
  const languageContext = inputContext.language;
  const codeContext = inputContext.code;

  const fileNameRef = useRef(null);

  const handleSaveCode = () => {
    const fileName = fileNameRef.current.value;

    if (!fileName) {
      alert("Please enter file name first!");
      return
    }
    // 1. Create a Blob with the source code text
    const blob = new Blob([codeContext.get()], { type: "text/plain" });
    // 2. Create a temporary URL for the blob
    const url = window.URL.createObjectURL(blob);
    // 3. Create a hidden anchor element
    const link = document.createElement("a");
    // 4. Set the filename (e.g., "main.py" or "script.js")
    link.download = `${fileName}${(languageContext.get()).extension}`;
    link.href = url;
    // 5. Append to body, click it, and then remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 6. Clean up the URL to save memory
    window.URL.revokeObjectURL(url);

    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Save {languageContext.get().extension} File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>File name</FormLabel>
              <Input ref={fileNameRef} placeholder='File name (Without an extension like ".java")' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button   
              onClick={handleSaveCode}
              colorScheme='blue' 
              mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SaveCodeModal;