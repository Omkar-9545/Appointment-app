import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
const login_url = `http://localhost:5000/api/auth/login`;
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Login = () => {

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const { storeToken } = useAuth();
    
    const handleInput = (e) => {
        // console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };
    //handling form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(login_url, {
                method: "POST",
                headers: {
                   "Content-Type":"application/json"
                },
                body:JSON.stringify(user),
            });

            const res_data = await response.json();
            if (response.ok) {
                toast.success("Login Successful");
                //localStorage.setItem('logtoken',res_data.token)
                storeToken(res_data.token);
                setUser({ email: "", password: "" });
                navigate('/');
                // window.location.reload();
                
                                //  added because state variable token wasn't added as soon as we login 
                                //  also we added a reducer hook to dyanmically render the change of user 
                                // profile upon login
            } else {
                setUser({
                    email: "",
                    password: "",
                });
                toast.error(res_data.extraDetails ? res_data.extraDetails:res_data.message);

            }
        } catch (error) {
            // console.log(error.message);
            next(error);
        }
    }

    return (<>
        <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="reg-image">
                                <img src="/images/registrationpage.jpg" alt="doctor image on login form" width="600" height="530"/>
                            </div>
                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Login Form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="user-email"
                                            placeholder="email"
                                            autoComplete="off"
                                            required
                                            value={user.email}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            id="user-password"
                                            placeholder="password"
                                            autoComplete="off"
                                            required
                                            value={user.password}
                                            onChange={handleInput}
                                        />
                                </div>
                                <div className="reglink">
                                    <NavLink to="/register">Not a User? Register here</NavLink>
                                </div>
                                    <br />
                                    <button type="submit" className="btn btn-submit">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
    </>)
}