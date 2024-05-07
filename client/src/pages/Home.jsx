import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Home = () => {
    const { user } = useAuth();
    const { isLoggedIn } = useAuth();
    return (
        <>
            {/* <p className="welcome-note"> Welcome  { ? :"to our website"}</p> */}
             {/* section 1 */}
            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    <div className="hero-content">
                        <h1>{isLoggedIn ?`Welcome ${user.name}`:"Welcome to the Doctor Appointment System"}</h1>
                        <p>
                            Here convenience meets care! Say goodbye to long waits
                            and endless phone calls- here,booking your next appointment
                            is as easy as few clicks. Join us on a journey where your health takes center stage,
                            and
                            scheduling your medical needs becomes a breeze.</p>
                        <p>Your well-being starts here!!</p>
                        
                        <div className="btn btn-group">
                            <NavLink to="/about"
                             className=" btn secondary-btn">About us
                            </NavLink>
                            <NavLink to="/services"
                                className="btn  secondary-btn">Learn More
                            </NavLink>
                        </div>
                    </div>
                    {/* hero images*/}
                    <div className="hero-image">
                        <img src="/images/homepage.jpg" alt="Home page image" width="800" height="500"/>
                    </div>
                </div>
            </section>
            {/* section2 */}
            <section className="section-analytics">
                <div className="container grid grid-four-cols">
                    <div className="div1">
                        <h2>50+</h2>
                        <p>Registered Doctors</p>
                    </div>
                    <div className="div1">
                        <h2>10,000+</h2>
                        <p>Registered users</p>
                    </div>
                    <div className="div1">
                        <h2>500+</h2>
                        <p>Well Developers</p>
                    </div>
                    <div className="div1">
                        <h2>24/7</h2>
                        <p>Available Doctors</p>
                    </div>
                </div>
            </section>

            {/* section 3 */}

            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    {/* hero images*/}
                    <div className="hero-image himg">
                        <img src="/images/homepage.jpg" alt="Home page image" width="800" height="600"/>
                    </div>
                    <div className="hero-content">
                        <h1 className="welcome-note">Level up your events:</h1>
                        <p>
                            Feeling Sick? Discover top-notch heathcare professionals right in your neighborhood and effortlessly
                            book appointments with just a tap. Our sleek and intuitive platforms puts your health first,
                            making scheduling appointments a breeze. Your health,your convenience, all at your fingertips.
                        </p>
                        
                    </div>
                </div>
            </section>

        </>
    )
};