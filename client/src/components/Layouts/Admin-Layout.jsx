import { NavLink, Outlet } from "react-router-dom"

export const AdminLayout = () => {
    return <>
        <header>
            <div className="container">
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/admin/users">Users</NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/doctors">Doctors</NavLink>
                        </li>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/services">Hospitals</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        <Outlet/>
    </>
}