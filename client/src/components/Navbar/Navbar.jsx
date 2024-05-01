import {NavLink} from 'react-router-dom'
import "./Navbar.css"
import { useAuth } from '../../store/auth';

export const Navbar = () => {

    // const token = localStorage.getItem("token");
    // let isLoggedIn = !!token;
    const { isLoggedIn } = useAuth();
    const { user } = useAuth();
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
                                {isLoggedIn
                                    ?
                                    <>
                                        <ul>
                                            <li><NavLink to="/profile">{user.name}</NavLink></li>
                                            <li ><NavLink to="/services">Hospitals</NavLink> </li>
                                            <li><NavLink to="/logout">Logout</NavLink></li>
                                        </ul>
                                    </>
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