import { useEffect } from "react";
import { useAuth } from "../store/auth";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { useState } from "react";
// import { NavLink } from 'react-router-dom';

export const KolhapurDoc = () => {
    const [doctors, setDoctors] = useState([]);
    const { isLoggedIn } = useAuth();
    const params = useParams();

    const getallDoc1 = async() => {
        try {
            const response = await axios.get(`http://localhost:5000/api/hospital/kolhapur/${params.id}/doctors`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setDoctors(response.data.data.doctors)
        } catch (error) {
            console.log(`Kolhapur Doctors list frontend error ${error}`);
        }
    }

    useEffect(() => {
        getallDoc1();        
    },[])

    if (isLoggedIn) {
        return (
            <>
                <section className="section-services">
                    <div className="container">
                        <h1 className="main-heading">Doctors:</h1>
                    </div>
                    <div className="container grid grid-three-cols">
                    {doctors.length ?
                            doctors.map((curElem, index) => {

                                const { firstName, lastName, specialization, experience, startTime, endTime } = curElem;
                                     
                            return (
                                <><div className="card" key={index}>
                                        
                                    <div className="card-details">
                                        <h2><b>Dr.</b> {firstName} {lastName}</h2>
                                        <p><b>Specialization:</b> {specialization}</p>
                                        <p><b>Experience:</b> {experience} yrs</p>
                                        <p><b>Time:</b> {startTime} to {endTime}</p>
                                        </div>
                                        <NavLink to={`/${curElem._id}/booking`}>Book Now</NavLink>
                                </div>
                                </>
                   
                            );
                        }) :<h1>No Doctors Present</h1>}
                    </div>
                </section>
            </>
        )
    } 
};