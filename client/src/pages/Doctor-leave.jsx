import { useState } from "react";
import { Calendar } from "react-date-range";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const DoctorLeave = () => {

    const [date, setDate] = useState("");
    const [leave, setLeave] = useState({
        date: "",
        days: "",
    });

    const params = useParams()

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
        let name = e.target.name;
        let value = e.target.value;
     
        setLeave({
            ...leave,
            [name]: value,
        });
    }

    leave.date = date;

    const handleSubmit = async() => {
        try {
            const response = await fetch(`http://localhost:5000/api/hospital/${params.id}/leaves`, {
                method:"POST",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(leave)
            })
            const res_data = await response.json()
            if (res_data.success) {
                toast.success(res_data.message);
                setLeave({ date: "", days: "" });
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message)
            }
        } catch (error) {
            toast.error(error)
        }
    }

    return <>
        <section>
            <div className="gird grid-two-cols"></div>
            <div className="container">
                <div>
                    <label><b>Enter start date:</b></label>
                    <br/>
            <Calendar
                    id="appointment-date"
                    value={date}
                    onChange={handle}
                    editableDateInputs={true}
                    />
            </div>
            
            <div>
            <label htmlFor="days"><b>Number of days:</b></label>
                <input
                    type="number"
                    name="days"
                    id="doctor-days"
                    placeholder="Days"
                    autoComplete="off"
                    required
                    value={leave.days}
                        onChange={handleInput}
                        className="ml2"
                />
                </div>
                <div>
                    <button onClick={handleSubmit}>Apply</button>
                </div>
            </div>
        </section>
    </>
}