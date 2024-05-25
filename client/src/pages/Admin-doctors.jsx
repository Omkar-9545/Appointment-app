import { useEffect, useState } from "react";
import axios from "axios";

export const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [load, setLoad] = useState(1);

  const getAllDoc = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/doctors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log(response.data)
      setDoctors(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const approveDoc = async (id) => {
    try {
      const obj = { status: "approved" };
      const response = await fetch(
        `http://localhost:5000/api/admin/doctors/approve/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(obj),
        }
      );
      // console.log(response)
      if (response.ok) {
        setLoad(1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (load) {
      getAllDoc();
      setLoad(0);
    }
  }, [load]);

  return (
    <>
      <section className="admin-users-setion">
        <div className="container">
          <h1>All Doctors:</h1>
        </div>
        <div className="container admin-users">
          {doctors.length ? (
            <table className="tab">
              <thead>
                <tr className="doctor">
                  <th>Name</th>
                  <th>Status</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((curDoc, index) => {
                  return (
                    <tr key={index} className="doc-tr">
                      <td>
                        {curDoc.firstName} {curDoc.lastName}
                      </td>
                      <td>{curDoc.status}</td>
                      <td>{curDoc.phone}</td>
                      {curDoc.status === "pending" ? (
                        <>
                          <td>
                            <button
                              onClick={() => approveDoc(curDoc._id)}
                              className="updateLink"
                            >
                              Approve
                            </button>
                          </td>

                          <td>
                            <button
                              onClick={() => {
                                deleteUser(curDoc._id);
                              }}
                            >
                              Reject
                            </button>
                          </td>
                        </>
                      ) : (
                        <h2 className="txt">No actions</h2>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p>No Doctors Present!</p>
          )}
        </div>
      </section>
    </>
  );
};
