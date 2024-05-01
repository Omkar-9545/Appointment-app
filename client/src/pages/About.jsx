import { NavLink } from "react-router-dom"

export const About = () => {

    return (
        <>
            
            {/* section 1 */}
            <section className="section-hero">
                <div className="container grid grid-two-cols">
                    <div className="hero-content">
                        <h1 className="welcome-note">Why Choose Us?</h1>
                        <p></p>
                        <p>Your well-being starts here!!</p>
                        
                        <div className="btn btn-group">
                            <NavLink to="/services" className="btn  secondary-btn">Learn More </NavLink>
                        </div>
                    </div>
                    {/* hero images*/}
                    <div className="hero-image">
                        <img src="/images/homepage.jpg" alt="about page image" width="800" height="500"/>
                    </div>
                </div>
            </section>
            {/* section2 */}
            <section className="section-analytics">
                <div className="container grid grid-four-cols">
                    <div className="div1">
                        <h2>35+</h2>
                        <p>Companies Registered</p>
                    </div>
                    <div className="div1">
                        <h2>100+</h2>
                        <p>Projects Done</p>
                    </div>
                    <div className="div1">
                        <h2>200+</h2>
                        <p>Happy Clients</p>
                    </div>
                    <div className="div1">
                        <h2>18+</h2>
                        <p>Awards Received</p>
                    </div>
                </div>
            </section>        
        </>
    )
}