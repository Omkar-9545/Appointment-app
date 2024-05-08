import axios from "axios";
import { useEffect, useState } from "react";

export const AdminUsers = () => {

    const [users, setUsers] = useState([]);

    const getAllUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/admin/users", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            // console.log(response.data.data);
            setUsers(response.data.data);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getAllUsers();
    }, [])
    
    return (
        <>
            <section className="admin-users-setion">
                <div className="container">
                    <h1>Users Data</h1>
                </div>
                <div className="container admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((curUser,index) => {
                                return <tr key={index}>
                                    <td>{curUser.name}</td>
                                    <td>{curUser.email}</td>
                                    <td>{curUser.phone}</td>
                                    <td>Edit</td>
                                    <td>Delete</td>
                                </tr>
                             })}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}