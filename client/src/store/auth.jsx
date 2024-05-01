import { createContext, useContext, useEffect, useReducer, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState("");
    const [services, setServices] = useState([]);
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
    
    const storeToken = (serverToken) => {
        setToken(serverToken)
        return localStorage.setItem("token", serverToken);
    }

    let isLoggedIn = !!token;

    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem('token');
    };

    const userAuthentication = async() => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                // console.log("user data:",data.userData);
                setUser(data.userData);
            }
        } catch (error) {
            console.log("error fecthing data")

        }
    }

    //get all the list of services hospital in my case
    const getServices = async() => {
        try {
            const response = await fetch("http://localhost:5000/api/data/services", {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                setServices(data.message);
            }
        } catch (error) {
            console.log(`Services frontend error ${error}`);
        }
        forceUpdate();
    }

    useEffect(() => {
        getServices();
        userAuthentication();
    }, [reducerValue]);

    return <AuthContext.Provider value={{storeToken ,LogoutUser,isLoggedIn,user,services}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const val = useContext(AuthContext);
    if (!val) {
        throw new Error("Auth context used in different context");
    }
    return val;
}

