import React, { createContext, useContext, useReducer } from "react";
import { browserReducer } from "../reduces/browser-reducer";


const initialValue = {
    name: "",
    time: "",
    message: "",
    task: null
}

//Create context
const BrowserContext = createContext(initialValue);

//Context provider component
const BrowserProvider = ({children}) => {

    const [state, browserDispatch] = useReducer(browserReducer, initialValue);

    return (
        <BrowserContext.Provider value={{...state, browserDispatch}}>
            {children}
        </BrowserContext.Provider>
    )
}

const useBrowser = () => useContext(BrowserContext);

export { BrowserProvider, useBrowser };
