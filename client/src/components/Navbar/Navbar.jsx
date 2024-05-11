import {NavLink} from 'react-router-dom'
import "./Navbar.css"
import { useAuth } from '../../store/auth';

export const Navbar = () => {

    // const token = localStorage.getItem("token");
    // let isLoggedIn = !!token;
    const { isLoggedIn, user, isLoading } = useAuth();

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
                                {isLoggedIn && !isLoading
                                    ?
                                    
                                        <ul>
                                            <li><NavLink to="/profile">{user.name}</NavLink></li>
                                            <li ><NavLink to="/services">Hospitals</NavLink> </li>
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