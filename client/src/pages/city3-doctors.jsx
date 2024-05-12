import { useEffect } from "react";
import { useAuth } from "../store/auth";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
// import { NavLink } from 'react-router-dom';

export const SangliDoc = () => {
    const [doctors, setDoctors] = useState([]);
    const { isLoggedIn } = useAuth();
    const params = useParams();

    const getallDoc3 = async() => {
        try {
            const response = await axios.get(`http://localhost:5000/api/hospital/sangli/${params.id}/doctors`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setDoctors(response.data.data.doctors)
        } catch (error) {
            console.log(`Sangli Doctors list frontend error ${error}`);
        }
    }

    useEffect(() => {
        getallDoc3();        
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
                                {/* <NavLink to={`/kolhapur/${curElem._id}/doctors`}> */}
                                {/* </NavLink> */}
                            <div className="card-details">
                                <h2>Dr. {firstName} {lastName}</h2>
                                <p>Specialization: {specialization}</p>
                                <p>Experience: {experience} yrs</p>
                                <p>Time : {startTime}am to {endTime}pm</p>
                            </div>
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