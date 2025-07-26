import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()

export default function UserContextProvider({ children }) {
    const [token, settoken] = useState(localStorage.getItem("userToken"))

    useEffect(() => {
        if (localStorage.getItem("userToken") != null) {
            settoken(localStorage.getItem("userToken"))
        }

    }, [])

    return (<UserContext.Provider value={{ token , settoken }}>
        {children}
    </UserContext.Provider>
    )
}