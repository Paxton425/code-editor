import { createContext, useEffect, useState, useMemo, useCallback } from 'react';
import { Languages } from "./Languages.js";

export const InputContext = createContext(null);

function InvoiceContextProvder({ children }){
    const defaultInputData = {
        language: Languages[3],
        code: `//Type Some ${Languages[3].name} Code Here... \n\n${Languages[3].sample}`,
    }
    const [ inputData, setInputData ] = useState(defaultInputData);
    useEffect(()=>{
        console.log(inputData);
    },[inputData]);

    // Optimized setters with batched updates
    const updateIputData = useCallback((updates) => {
        setInputData(prev => ({ ...prev, ...updates }));
    }, []);

    const contextValue = useMemo(()=>({
        language: {
            get: ()=> inputData.language,
            set: (value)=>{
                updateIputData({ language: value });
            }
        },
        code: {
            get: ()=> inputData.code,
            set: (value)=>{
                updateIputData({ code: value });
            }
        }
    }), [inputData.language, inputData.code]);

    return(
        <InputContext.Provider value={contextValue}>
            {children}
        </InputContext.Provider>
    );
}

export default InvoiceContextProvder;