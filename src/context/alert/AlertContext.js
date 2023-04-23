import { createContext, useReducer } from "react";
import alertReducer from './AlertReducer';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const initialSate = null;

    const [state, dispatch] = useReducer(alertReducer, initialSate);

    // set alert 
    const setAlert = (msg, type) => dispatch({
        type: 'SET_ALERT',
        payload: {msg, type},
    })

    // remove alert 
    setTimeout(() => {
        dispatch({
            type: 'REMOVE_ALERT',
        })
    }, 5000)

        return <AlertContext.Provider value={{
            alert: state,
            setAlert,
    }}>
        {children}
    </AlertContext.Provider>
};

export default AlertContext
