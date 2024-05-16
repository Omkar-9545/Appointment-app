import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

export const Booking = () => {

    const params = useParams()
    const [doctor, setDoctor] = useState({})
    
    const getDocInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/hospital/${params.id}/booking`, {
                headers: {
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            setDoctor(response.data.data)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDocInfo();
    },[])

    return (
        <>
            <section>
                <div className="container">
                    <div className="doc-details">
                        <p><b>Name:</b> {doctor.firstName} {doctor.lastName}</p>
                        <p><b>Specialization:</b> {doctor.specialization}</p>
                        <p><b>Timings:</b> {doctor.startTime} - {doctor.endTime}</p>
                    </div>
                    <div className="check-info">
                        {/* datepicker */}
                        {/* timepicker */}
                    </div>
                    <div className="book">
                        <button className="btn btn-primary">Check Availability</button>
                        <button className="btn btn-primary book">Book Now</button>
                    </div>
                </div>
         </section>
        </>
    )
}