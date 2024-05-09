import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {toast} from "react-toastify"

export const AdminUpdate = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        phone:"",
        isDoctor:false
    })

    const params = useParams();
    const navigate = useNavigate()
    // console.log("user params update page", params);

    const getUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/users/${params.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            // console.log(response.data)
            setData(response.data.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserData();
    },[])

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/update/${data._id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                toast.success("Updated Successfully")
                navigate('/admin/users')
            } else {
                toast.error("Updation Failed")
            }
        } catch (error) {
            console.log(error)
        }    
    }


    return <>
        <section className="section-contact">
            <div className="container">
            <h1 className="main-heading">Update User Data</h1>
            </div>

            <div className="grid grid-two-cols container">
                <section className="section-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                autoComplete="off"
                                value={data.name}
                                onChange={handleInput}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                autoComplete="off"
                                value={data.email}
                                onChange={handleInput}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                id="phone"
                                autoComplete="off"
                                value={data.phone}
                                onChange={handleInput}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="isDoctor">Is a Doctor</label>
                            <input
                                type="text"
                                name="isDoctor"
                                id="isDoctor"
                                autoComplete="off"
                                value={data.isDoctor}
                                onChange={handleInput}
                                required
                            />
                        </div>
                        <div>
                            <button type="submit">Update</button>
                        </div>
                    </form>
                </section>
            </div>
        </section>
    </>
}