import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import axios from "axios";
import { NavLink } from "react-router-dom";

export const Sangli = () => {
    const [hospital3, setHospital3] = useState([]);
    const { isLoggedIn } = useAuth();
    
    const getHospital3 = async() => {
        try {
            const response = await axios.get("http://localhost:5000/api/hospital/sangli", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setHospital3(response.data.message)
        } catch (error) {
            console.log(`Gadhinglaj Data list frontend error ${error}`);
        }
    }

    useEffect(() => {
        getHospital3();
    }, []);

    if (isLoggedIn) {
        return (
            <>
                <section className="section-services">
                    <div className="container">
                        <h1 className="main-heading">Hospitals</h1>
                    </div>
                    <div className="container grid grid-three-cols">
                    {hospital3.map((curElem, index) => {

const { name, address, phone } = curElem;

return (
    <><div className="card" key={index}>
        <div className="card-img">
        <NavLink to={`/sangli/${curElem._id}/doctors`}>
            <img src="./images/multi.jpg" width="300" />
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