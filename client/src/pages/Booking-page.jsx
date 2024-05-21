import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import { Calendar } from 'react-date-range';
import { useAuth } from './../store/auth';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';

export const Booking = () => {
    const [load, setLoad] = useState(true);
    const params = useParams();
    const { user } = useAuth();
    const [doctor, setDoctor] = useState({});
    const [date, setDate] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [isAvailable, setIsAvailable] = useState(false);

        const [appointment, setAppointment] = useState({
            userId: doctor.userId,
            doctorId: params.id,
            userInfo: user,
            date: date,
            time: "",
            status: "pending"
        });
    
    
    const getDocInfo = async () => {
        try {
            setLoad(true);
            const response = await axios.get(`http://localhost:5000/api/hospital/${params.id}/booking`, {
                headers: {
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            setLoad(false)
            setDoctor(response.data.data)
        } catch (error) {
            // next(error)
            toast.error(error)
        }
    }

    const handle = (value) => {
        setLoaded(false)
        setIsAvailable(false)
        let ans = value.toString()
        ans = ans.split(" ")
        let month = ans[1].toLowerCase()
        let monthNo = 0;        
        if (month == 'jan') monthNo = 1;
        else if (month == 'feb') monthNo = 2;
        else if (month == 'mar') monthNo = 3;
        else if (month == 'apr') monthNo = 4;
        else if (month == 'may') monthNo = 5;
        else if (month == 'jun') monthNo = 6;
        else if (month == 'jul') monthNo = 7;
        else if (month == 'aug') monthNo = 8;
        else if (month == 'sep') monthNo = 9;
        else if (month == 'oct') monthNo = 10;
        else if (month == 'nov') monthNo = 11;
        else if (month == 'dec') monthNo = 12;
        let tmp = `${ans[2]}/${monthNo}/${ans[3]}`
        setDate(tmp)
    }

    const handleInput = (e) => {
        setLoaded(false)
        setIsAvailable(false)
        const name = e.target.name;
        const value = e.target.value;
        setAppointment({
            ...appointment,
            [name]: value,
        });
    }
    appointment.date = date
    appointment.userId = doctor.userId
    appointment.userInfo = user

    const availabilityHandler = async() => {
        try {
            setLoaded(false)
            const response = await fetch(`http://localhost:5000/api/hospital/available`, {
                method:"POST",
                headers: {
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                },
                body:JSON.stringify(appointment)
            })
            const res_data = await response.json()
            if (res_data.success) {
                toast.success(res_data.message)
                setLoaded(true)
                setIsAvailable(true)
            } else {
                setLoaded(true)
                setIsAvailable(false)
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            next(error)
            // toast.error("error while checking for availability")
        }
    }

    const bookHandler = async() => {
        try {
            const response = await fetch(`http://localhost:5000/api/auth/book-appointment`, {
                method:"POST",
                headers: {
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(appointment)
            })
            if (response.ok) {
                toast.success("Booking Appointment Successful")
                setAppointment({
                    userId: "",
                    doctorId: "",
                    userInfo: "",
                    date: "",
                    time: "",
                    status: "pending"})
            }
        } catch (error) {
            toast.error('Error while booking')
        }
    }

    useEffect(() => {
        if (load) {
            getDocInfo();
        }
    }, [load]);

    return (
        <>
            <section>
                <div className="container">
                    {!load ? 
                    <div className="doc-details">
                        <p><b>Dr.</b> {doctor.firstName} {doctor.lastName}</p>
                        <p><b>Specialization:</b> {doctor.specialization}</p>
                        <p><b>Timings:</b> {doctor.startTime} - {doctor.endTime}</p>
                    </div>
                    :<p>Loading doc details...</p>}
                    <div className="check-info">
                        <Calendar
                            id="appointment-date"
                            value={appointment.date}
                            onChange={handle}
                            editableDateInputs={true} />
                        <div className='stt'>
                            <label htmlFor="startTime" >Time: </label>
                                <input
                                type="time"
                                name="time"
                                id="user-time"
                                value={appointment.time}
                                onChange={handleInput}
                                required />
                        </div>
                    </div>
                    <div className="book">
                    <button className="btn btn-primary" onClick={availabilityHandler}>Check Availability</button>
                        {isAvailable
                            ?
                            <button className="btn btn-primary book" onClick={bookHandler}>Book Now</button>
                            :
                            ""
                        }
                        {!isAvailable && loaded ? <Link to={`/${params.id}/substitutes`} className="updateLink">Substitute Doctors</Link> : ""}
                    </div>
                </div>
         </section>
        </>
    )
}