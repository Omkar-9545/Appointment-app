import {NavLink, useNavigate} from 'react-router-dom'
import "./Navbar.css"
import { useAuth } from '../../store/auth';

export const Navbar = () => {

    // const token = localStorage.getItem("token");
    // let isLoggedIn = !!token;
    const { isLoggedIn, user, isLoading } = useAuth();
    const navigate = useNavigate()
    return (
        <>
            <header>
                <div className="container">
                    <div className="logo-brand">
                        
                    </div>
                    <nav>
                        <ul>
                            <li >
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li>
                            { isLoggedIn && !isLoading && user.isAdmin ? <NavLink to="/admin">Admin menu</NavLink>:""}
                            </li>
                            <li>
                                {isLoggedIn && !isLoading && !user.isAdmin && user.isDoctor ?
                                    // trying out dropdown menu
                                    <>
                                    <div className="dropdown1">
                                        <select name="menu" id="menu1">
                                                <option selected hidden>Doctor Menu</option>      
                                            </select>
                                            <div className="dropdown-options">
                                                <NavLink to={`/${user._id}/doc/profile`} className="link">Doctor Profile</NavLink> 
                                                <NavLink to={`/${user._id}/appointments`} className="link"> Appointments</NavLink>
                                                <NavLink to={`/${user._id}/leaves`} className="link">Apply Leaves</NavLink>
                                                <NavLink to={`/${user._id}/substitute-doctors`} className="link">Add Substitute Doctor</NavLink>
                                        </div>
                                        </div>         
                             </> : "" }
                            </li>
                            {isLoggedIn && !isLoading && !user.isAdmin && !user.isDoctor ?
                                <li><NavLink to="/services">Hospitals</NavLink></li>
                                : ""
                            }
                            
                            <li>
                                {isLoggedIn && !isLoading 
                                    ?
                                    
                                        <ul>
                                            <li><NavLink to="/profile">User Profile</NavLink></li>
                                            <li><NavLink to="/logout">Logout</NavLink></li>
                                            <li>
                                                <a href="/notification" class="notification">
                                                    <span><i class="fa fa-bell"></i></span>
                                                    <span class="badge">{user.notification.length}</span>
                                                </a>
                                            </li>
                                        </ul>
                                    :
                                    <>
                                    <ul>
                                        <li ><NavLink to="/about">About</NavLink></li>
                                        <li ><NavLink to="/register">SignUp</NavLink></li>
                                        <li ><NavLink to="/login">Login</NavLink></li>
                                    </ul>
                                    </>
                                }
                            </li>
                           
                            
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}