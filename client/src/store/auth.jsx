import { createContext, useContext, useEffect,useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState("");
    const [service, setService] = useState([]);
    const [hospital1, setHospital1] = useState([]);
    const [hospital2, setHospital2] = useState([]);
    const [hospital3, setHospital3] = useState([]);
    const [notification, setNotification] = useState([]);
    const [seenNotification, setseenNotification] = useState([]);
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
            setUser("");
            const data = await response.json();
            setNotification(data.notification);
            if (response.ok) {
                setUser(data.userData);
            } else {
                // toast.error(data.message);
            }
        } catch (error) {
           toast.error("Error fetching data from server")
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

    const getHospital1 = async() => {
        try {
            const response = await fetch("http://localhost:5000/api/hospital/kolhapur", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setHospital1(data.message);
            }
        } catch (error) {
            console.log(`Kolhapur Data list frontend error ${error}`);
        }
    }

    const getHospital2 = async() => {
        try {
            const response = await fetch("http://localhost:5000/api/hospital/gadhinglaj", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                setHospital2(data.message);
            }
        } catch (error) {
            console.log(`Gadhinglaj Data list frontend error ${error}`);
        }
    }

    const getHospital3 = async() => {
        try {
            const response = await fetch("http://localhost:5000/api/hospital/sangli", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                setHospital3(data.message);
            }
        } catch (error) {
            console.log(`Gadhinglaj Data list frontend error ${error}`);
        }
    }
    const getNotification = async() => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/notification", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // console.log(response)
            if (response.ok) {
                const data = await response.json();
                // console.log(data)
                if (data.data.notification) {
                    setNotification(data.data.notification);
                }
                if (data.data.seenNotification) {
                    setseenNotification(data.data.seenNotification)
                }
            }
        } catch (error) {
            console.log(`Gadhinglaj Data list frontend error ${error}`);
        }
    
    }

    useEffect(() => {
        userAuthentication();
        getService();
        // getNotification();
    }, []);

    if (token && (window.location.pathname == "/kolhapur")) {
        useEffect(() => {
            getHospital1();
        }, []);
    }

    if (token && (window.location.pathname == "/gadhinglaj")) {
        useEffect(() => {
            getHospital2();
        }, []);
    }

    if (token && (window.location.pathname == "/sangli")) {
        useEffect(() => {
            getHospital3();
        }, []);
    }
    


    return <AuthContext.Provider value={{storeToken ,LogoutUser,isLoggedIn,user,hospital1,service,hospital2,hospital3,notification,seenNotification}}>
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

