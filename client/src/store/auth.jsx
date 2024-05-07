import { createContext, useContext, useEffect,useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState("");
    const [service, setService] = useState([]);
    
    const storeToken = (serverToken) => {
        setToken(serverToken)
        return localStorage.setItem("token", serverToken);
    }

    const userAuthentication = async() => {
        try {
            const response = await axios.get("http://localhost:5000/api/auth/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(response.data.userData);
        } catch (error) {
            if (token) {
                toast.error("Error fetching data from server")
            }
        }
    }
    let isLoggedIn = !!token;

    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem('token');
    };

    //get all the list of services (hospital) in my case


    const getService = async() => {
        try {
            const response = await fetch("http://localhost:5000/api/data/services", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const res_data = await response.json()
            if (response.ok) {
                setService(res_data.message);
            }
        } catch (error) {
            next(error);
        }
    }
    
    useEffect(() => {
        if (token) {
            userAuthentication();
            getService();
        }
    }, [token]);
    
    return <AuthContext.Provider value={{storeToken ,LogoutUser,isLoggedIn,user,service}}>
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

