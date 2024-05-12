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
                                
                                <div className="registration-form">
                                    <h1 className="main-heading mb-3">Doctor Form</h1>
                                    <br />
                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <label htmlFor="name">FirstName</label>
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
                                        </div>
                                        <div>
                                            <label htmlFor="name">LastName</label>
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
                                        <div>
                                            <label htmlFor="phone">Phone</label>
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
                                        </div>
                                        <div>
                                            <label htmlFor="email">Email</label>
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
                                        <div>
                                            <label htmlFor="phone">Specialization</label>
                                            <input
                                                type="text"
                                                name="specialization"
                                                id="user-specialization"
                                                placeholder="specialization"
                                                autoComplete="off"
                                                required
                                                value={doctor.specialization}
                                                onChange={handleInput}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone">Experience</label>
                                            <input
                                                type="number"
                                                name="experience"
                                                id="user-experience"
                                                placeholder="experience"
                                                autoComplete="off"
                                                required
                                                value={doctor.experience}
                                                onChange={handleInput}
                                            />
                                        </div>
                                         <div>
                                                <label htmlFor="startTime" >From:</label>
                                                <input
                                                    type="time"
                                                    name="startTime"
                                                    id="user-startTime"
                                                    value={doctor.startTime}
                                                    onChange={handleInput}
                                                    required />
                                            </div>
                                            
                                        <div>
                                                <label for="endTime" >To:</label>
                                                <input
                                                    type="time"
                                                    name="endTime"
                                                    id="user-endTime"
                                                    value={doctor.endTime}
                                                    onChange={handleInput}
                                                    required
                                                />
                                            </div>
                                        <div>
                                            <label htmlFor="city">City</label>
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
                                        </div>
                                        <div>
                                            <label htmlFor="hospital">Hospital Name</label>
                                            <input
                                                type="text"
                                                name="hospital"
                                                id="user-hospital"
                                                placeholder="Hospital name"
                                                autoComplete="off"
                                                required
                                                value={doctor.hospital}
                                                onChange={handleInput}
                                            />
                                        </div>
                                        <br />
                                        <button type="submit" className="btn btn-submit">Apply</button>
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
