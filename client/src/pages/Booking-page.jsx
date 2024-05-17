import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

        const [appointment, setAppointment] = useState({
            userId: doctor.userId,
            doctorId: params.id,
            userInfo: user,
            date: date,
            startTime: "",
            endTime: "",
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
            
        }
    }

    const handle = (value) => {
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
                    <div className="doc-details">
                        <p><b>Dr.</b> {doctor.firstName} {doctor.lastName}</p>
                        <p><b>Specialization:</b> {doctor.specialization}</p>
                        <p><b>Timings:</b> {doctor.startTime} - {doctor.endTime}</p>
                    </div>
                    <div className="check-info">
                        <Calendar
                            id="appointment-date"
                            value={appointment.date}
                            onChange={handle}
                            editableDateInputs={true} />
                        <div>
                            <label htmlFor="startTime" >From: </label>
                                <input
                                type="time"
                                name="startTime"
                                id="user-startTime"
                                value={appointment.startTime}
                                onChange={handleInput}
                                required />
                        </div>
                        <div>
                            <label htmlFor="endTime" >To: </label>
                                <input
                                type="time"
                                name="endTime"
                                id="user-endTime"
                                value={appointment.endTime}
                                onChange={handleInput}
                                required />
                        </div>
                    </div>
                    <div className="book">
                        <button className="btn btn-primary">Check Availability</button>
                        <button className="btn btn-primary book" onClick={bookHandler}>Book Now</button>
                    </div>
                </div>
         </section>
        </>
    )
}