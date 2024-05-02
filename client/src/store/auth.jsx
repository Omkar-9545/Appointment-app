import { createContext, useContext, useEffect,useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState("");
    const [service, setService] = useState([]);
    // const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
    const [hospital1, setHospital1] = useState([]);
    
    const storeToken = (serverToken) => {
        setToken(serverToken)
        return localStorage.setItem("token", serverToken);
    }

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
            setUser(data.userData);
                // console.log("user data:",data.userData);
                
            }
        } catch (error) {
            console.log("error fecthing data")

        }
    }
    let isLoggedIn = !!token;

    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem('token');
    };

    //get all the list of services hospital in my case


    const getService = async() => {
        try {
            const response = await fetch("http://localhost:5000/api/services", {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                setService(data.message);
            }
        } catch (error) {
            console.log(`City Data list frontend error ${error}`);
        }
    }

    const getHospital1 = async() => {
        try {
            const response = await fetch("http://localhost:5000/api/hospital/kolhapur", {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                setHospital1(data.message);
            }
        } catch (error) {
            console.log(`Kolhapur Data list frontend error ${error}`);
        }
    }


    useEffect(() => {
        userAuthentication();
        getService();
        getHospital1();
    }, []);


    return <AuthContext.Provider value={{storeToken ,LogoutUser,isLoggedIn,user,hospital1,service}}>
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

