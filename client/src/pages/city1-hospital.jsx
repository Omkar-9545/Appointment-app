import { useEffect } from "react";
import { useAuth } from "../store/auth";
import axios from "axios";
import { useState } from "react";
import { NavLink } from 'react-router-dom';

export const Kolhapur = () => {
    const [hospital1, setHospital1] = useState([]);
    const { isLoggedIn } = useAuth();

    const getHospital1 = async() => {
        try {
            const response = await axios.get("http://localhost:5000/api/hospital/kolhapur", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setHospital1(response.data.message)
        } catch (error) {
            console.log(`Kolhapur Data list frontend error ${error}`);
        }
    }

    useEffect(() => {
        getHospital1();        
    },[])

    if (isLoggedIn) {
        return (
            <>
                <section className="section-services">
                    <div className="container">
                        <h1 className="main-heading">Hospitals</h1>
                    </div>
                    <div className="container grid grid-three-cols">
                    {
                            hospital1.map((curElem, index) => {

                            const { name, address, phone } = curElem;
                                     
                            return (
                                <><div className="card" key={index}>
                                    <div className="card-img">
                                        <NavLink to={`/kolhapur/${curElem._id}/doctors`}>
                                        <img src="./images/apollo.jpg" width="300" />
                                        </NavLink>
                                    </div>
                                    <div className="card-details">
                                        <h2>{name}</h2>
                                        <p>Address: {address}</p>
                                        <p>Phone: {phone}</p>
                                    </div>
                                    <div className="card-details">
                                        {curElem.govtScheme.length ?
                                            <>
                                            <div className="dropdown">
                                            <label for="scheme">Government Schemes available :</label>
                                                    <select name="scheme" id="scheme1">
                                                    {curElem.govtScheme.map((curScheme,index) => {
                                                            return (<>
                                                                <option key={index}>{curScheme}</option>
                                                            </>)
                                                        })}
                                            </select>
                                            </div>
                                            </>
                                            : <p className="dropdown">Sorry! No government schemes available in the hospital!</p>}
                                    </div>
                                    <br/>
                                    <div className="card-details">
                                        {curElem.insurance.length ?
                                            <>
                                            <div className="dropdown">
                                            <label for="scheme">Insurance Scheme available :</label>
                                                    <select name="scheme" id="scheme1">
                                                    {curElem.insurance.map((curScheme,index) => {
                                                            return (<>
                                                                <option key={index}>{curScheme}</option>
                                                            </>)
                                                        })}
                                            </select>
                                            </div>
                                            </> :
                                            <p className="dropdown">No insurance schemes available in the hospital</p>
                                        }
                                    </div>
                                </div>
                                </>
                   
                            );
                        })}
                    </div>
                </section>
            </>
        )
    } 
};