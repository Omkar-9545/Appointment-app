import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(1);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(response.data);
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // delete the user on delete button
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/admin/users/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setLoad(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (load) {
      getAllUsers();
      setLoad(0);
    }
  }, [load]);

  return (
    <>
      <section className="admin-users-setion">
        <div className="container">
          <h1>Users Data</h1>
        </div>
        <div className="container admin-users">
          <table className="tab">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Doctor</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => {
                return (
                  <tr key={index}>
                    <td>{curUser.name}</td>
                    <td>{curUser.email}</td>
                    <td>{curUser.phone}</td>
                    <td>{curUser.isDoctor ? "Yes" : "No"}</td>
                    <td>
                      <Link to={`${curUser._id}/edit`} className="updateLink">
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          deleteUser(curUser._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
