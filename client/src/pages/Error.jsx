import { NavLink } from "react-router-dom"

export const Error = () => {
    return (
        <>
            <section className="error-page">
                <div className="content">
                    <h2 className="header">404</h2>
                    <h1>Sorry! Page not found</h1>
                    <p>
                        Oops! It seems like the page you're trying to access doesn't exist.
                        If you believe there's an issue, feel free to report it, and we'll 
                        look into it.
                    </p>
                    <div className="btns">
                        <NavLink to="/" className="err-btn">Return home</NavLink>
                        <NavLink to="/options" className="err-btn">Report Problem</NavLink>
                    </div>
                </div>
            </section>
        </>
    )
}