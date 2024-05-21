import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import  axios  from 'axios';

export const Substitutes = () => {

    const [substitutes, setSubstitutes] = useState([]);
    const [load, setLoad] = useState(false);
    const params = useParams();

    const getSubstitute = async() => {
        try {
            setLoad(false)
            const response = await axios.get(`http://localhost:5000/api/auth/${params.id}/getsubstitutes`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setSubstitutes(response.data.data);
            setLoad(true)
        } catch (error) {
            // next(error)
            setLoad(false)
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        getSubstitute()
    },[])
    return (<>
        <section className="admin-users-setion">
            {load && substitutes ?
                substitutes.length ?
                <>
                    <div className="container">
                        <h1>Substitute doctors</h1>
                    </div>
                    <div className="container admin-users">
                        <table>
                            <thead>
                                <tr>
                                    <th>Doctor</th>
                                    <th>Specialization</th>
                                    <th>Experience</th>
                                    <th>Timings</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {substitutes.map((curDoc, index) => {
                                    return <tr key={index}>
                                        <td>{curDoc.firstName} {curDoc.lastName}</td>
                                        <td>{curDoc.specialization}</td>
                                        <td>{curDoc.experience}</td>
                                        <td>{curDoc.startTime} - {curDoc.endTime}</td>
                                        <td>
                                            <Link to={`/${curDoc._id}/booking`} className="updateLink">Choose</Link>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
                : <p>No Substitute Doctors</p>:<p>Loading...</p>}
            </section>
    </>)
}