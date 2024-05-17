import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../store/auth";

export const ApplyDoctor = () => {

    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const { user } = useAuth();

    const id = user._id;
    // console.log(userId)
    const [doctor, setDoctor] = useState({
        firstName: "",
        lastName:"",
        phone: "",
        email: "",
        status: "pending",
        specialization: "",
        experience: "",
        startTime: "",
        endTime: "",
        city: "",
        hospital:"",
    });

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
     
        setDoctor({
            ...doctor,
            [name]: value,
        });
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
        const response = await fetch(`http://localhost:5000/api/hospital/apply-doctor/${id}`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body:JSON.stringify(doctor),
        });
            const res_data = await response.json();
            if (res_data.success) {
                setDoctor({ firstName: "", lastName: "", phone: "", email: "", specialization: "", experience: "", startTime: "", endTime: "", city: "", hospital: "" });
                toast.success("Application Successful");
                navigate('/')
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        }
        } catch (error) {
            // next(error);
            return response.status(400).send({ message: "Application for the account failed!" ,error});
           
        }
    }
     

    if (isLoggedIn) {
        return (
            <>
                <section>
                    <main>
                        <div className="section-registration">
                            <div className="container grid grid-two-cols">
                                
                                <div>
                                    <h1 className="main-heading mb-3">Doctor Form</h1>
                                    <br />
                                    <form onSubmit={handleSubmit}>
                                        <p>Personal Details:</p>
                                        <div className="container">
                                            <label htmlFor="name" className="ml1">FirstName</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                id="user-name"
                                                placeholder="name"
                                                autoComplete="off"
                                                required
                                                value={doctor.firstName}
                                                onChange={handleInput}
                                            />
                                        
                                            <label htmlFor="name" className="ml2">LastName</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                id="user-name"
                                                placeholder="name"
                                                autoComplete="off"
                                                required
                                                value={doctor.lastName}
                                                onChange={handleInput}
                                            />
                                        </div>
                                        <div className="container">
                                            <label htmlFor="phone" className="ml1">Phone</label>
                                            <input
                                                type="number"
                                                name="phone"
                                                id="user-phone"
                                                placeholder="phone"
                                                autoComplete="off"
                                                required
                                                value={doctor.phone}
                                                onChange={handleInput}
                                              
                                            />
                                        
                                            <label htmlFor="email" className="ml">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="user-email"
                                                placeholder="email"
                                                autoComplete="off"
                                                required
                                                value={doctor.email}
                                                onChange={handleInput}
                                            />
                                        </div>
                                        <p>Professional Details:</p>
                                        <div className="container">
                                            <label htmlFor="phone" className="ml1">Specialization </label>
                                            <input
                                                type="text"
                                                name="specialization"
                                                id="user-specialization"
                                                placeholder="specialization"
                                                autoComplete="off"
                                                required
                                                value={doctor.specialization}
                                                onChange={handleInput}
                                                className="ml1"
                                            />
                                        
                                            <label htmlFor="phone" className="ml2">Experience </label>
                                            <input
                                                type="number"
                                                name="experience"
                                                id="user-experience"
                                                placeholder="experience"
                                                autoComplete="off"
                                                required
                                                value={doctor.experience}
                                                onChange={handleInput}
                                                className="ml1"
                                            />
                                        </div>
                                        <p>Timings:</p>
                                         <div>
                                                <label htmlFor="startTime" className="ml1">From:</label>
                                                <input
                                                    type="time"
                                                    name="startTime"
                                                    id="user-startTime"
                                                    value={doctor.startTime}
                                                    onChange={handleInput}
                                                required
                                              
                                            />
                                            
                                                <label for="endTime" className="ml2">To:</label>
                                                <input
                                                    type="time"
                                                    name="endTime"
                                                    id="user-endTime"
                                                    value={doctor.endTime}
                                                    onChange={handleInput}
                                                required
                                              
                                                />
                                        </div>
                                        <br />
                                        <br/>
                                        <p>WorkPlace Details:</p>
                                        <div className="container">
                                            <label htmlFor="city" className="ml1">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                id="user-city"
                                                placeholder="city"
                                                autoComplete="off"
                                                required
                                                value={doctor.city}
                                                onChange={handleInput}
                                            />
                                        
                                            <label htmlFor="hospital" className="ml2">Hospital Name</label>
                                            <input
                                                type="text"
                                                name="hospital"
                                                id="user-hospital"
                                                placeholder="Hospital name"
                                                autoComplete="off"
                                                required
                                                value={doctor.hospital}
                                                onChange={handleInput}
                                                className="mr"
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-submit stt">Apply</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </main>
                </section>
            </>
        )
    }
};
