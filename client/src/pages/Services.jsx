import { useAuth } from "../store/auth";
import { NavLink } from "react-router-dom";
export const Service = () => {
    const { service } = useAuth();

 
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
                                        <a href="/kolhapur">Know more</a>
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
                                        <a href="/gadhinglaj">Know more</a>
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
                                        <a href="/sangli">Know more</a>
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
                <div className="apply-doc">
                    <NavLink className="link-doc" to="/apply-doctor">Apply Doctor</NavLink>
                </div>
            </section>
    </>
)    
};