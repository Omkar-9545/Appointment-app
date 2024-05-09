import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const AdminDoctors = () => {

    const [doctors, setDoctors] = useState([]);
    const [load, setLoad] = useState(1);

    const getAllDoc = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/admin/doctors", {
            headers: {
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
            })
            setDoctors(response.data.data);
        } catch (error) {
            console.log(error)
        }
    }


    const deleteUser = async(id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/admin/users/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                setLoad(1);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (load) {
            getAllDoc();
            setLoad(0);
        }
    },[load])

    return <>
            
            <section className="admin-users-setion">
                <div className="container">
                    <h1>All Doctors</h1>
                </div>
                <div className="container admin-users">
                    <table>
                        <thead>
                            <tr className="doctor">
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Edit</th>
                                <th>Delete</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map((curDoc,index) => {
                                return <tr key={index}>
                                    <td>{curDoc.name}</td>
                                    <td>{curDoc.email}</td>
                                    <td>{curDoc.phone}</td>
                                    <td>
                                        <Link to={`${curDoc._id}/edit`} className="updateLink">Edit</Link>
                                    </td>
                                    <td>
                                        <button onClick={() => {
                                            deleteUser(curDoc._id);
                                        }}>Delete</button>
                                    </td>
                                </tr>
                             })}
                        </tbody>
                    </table>
                </div>
            </section>
    </>
}