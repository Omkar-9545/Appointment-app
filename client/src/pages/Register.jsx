import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from './../store/auth';
import { toast } from "react-toastify";

const reg_url = `http://localhost:5000/api/auth/register`;

export const Register = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone:"",
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
        // console.log(user);
        try {
        const response = await fetch(reg_url, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body:JSON.stringify(user),
        });
            const res_data = await response.json();
            // console.log("response from server", res_data);
            if (response.ok) {
                
                // console.log(`Response from server: ${res_data}`);
                // localStorage.setItem('regtoken',res_data.token);
                storeToken(res_data.token);
                setUser({ name: "", email: "", password: "", phone: ""});
                toast.success("Registered Successfully");
                navigate('/')
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails:res_data.message);
        }
        } catch (error) {
            next(error);
            // return response.status(400).send({ message: "Registration failed!" });
           
        }
    }

    return (
        <>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="reg-image">
                                <img src="/images/registrationpage.jpg" alt="doctor image on registration form" width="600" height="550"/>
                            </div>
                            <div className="registration-form">
                                <h1 className="main-heading mb-3">Registration Form</h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="user-name"
                                            placeholder="name"
                                            autoComplete="off"
                                            required
                                            value={user.name}
                                            onChange={handleInput}
                                        />
                                    </div>
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
                                    <div>
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            type="number"
                                            name="phone"
                                            id="user-phone"
                                            placeholder="phone"
                                            autoComplete="off"
                                            required
                                            value={user.phone}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-submit">Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
};