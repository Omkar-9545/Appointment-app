import { useAuth } from "../store/auth";
import { NavLink } from "react-router-dom";

export const Service = () => {
    const { service } = useAuth();
    const { isLoggedIn, isLoading, user } = useAuth();
    if (isLoggedIn) {
        return (
            <>
                <section className="section-services">
                    <div className="container">
                        <h1 className="main-heading">Cities where our service is extended:</h1>
                    </div>
                    <div className="container grid grid-three-cols">
                        {service.map((curElem, index) => {

                            const { name, phone } = curElem;
                            if (name.toLowerCase() == "kolhapur") {
                                return (
                                    <><div className="card" key={index}>
                                        <div className="card-img">
                                            <NavLink to="/kolhapur" >Know more</NavLink>
                                        </div>
                                        <div className="card-details">
                                            <h2>{name}</h2>
                                            <p>Phone: {phone}</p>
                                        </div>
                                    </div>
                                    </>
                
                                );
                            }
                            else if (name.toLowerCase() == "gadhinglaj") {
                                return (
                                    <><div className="card" key={index}>
                                        <div className="card-img">
                                            <NavLink to="/gadhinglaj">Know more</NavLink>
                                        </div>
                                        <div className="card-details">
                                            <h2>{name}</h2>
                                            <p>Phone: {phone}</p>
                                        </div>
                                    </div>
                                    </>
                
                                );
                            }
                            else if (name.toLowerCase() == "sangli") {
                                return (
                                    <><div className="card" key={index}>
                                        <div className="card-img">
                                            <NavLink to="/sangli">Know more</NavLink>
                                        </div>
                                        <div className="card-details">
                                            <h2>{name}</h2>
                                            <p>Phone: {phone}</p>
                                        </div>
                                    </div>
                                    </>
                
                                );
                            }
                        })}
                    </div>
                    {!user.isDoctor && !isLoading ?<div className="apply-doc">
                        <p>Are you a doctor? Get your account and start serving here :</p>
                        <NavLink className="link-doc" to="/apply-doctor">click here</NavLink>
                    </div> :""}
                </section>
            </>
        )
    }
    
};