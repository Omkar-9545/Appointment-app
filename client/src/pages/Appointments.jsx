import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./../store/auth";
import { useEffect, useState } from "react";
import moment from "moment";

export const Appointment = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <h2>Loading....</h2>;
  }
  const [appointments, setAppointments] = useState([]);

  const getAppointment = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/hospital/${user._id}/appointments`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      // console.log(error)
      toast.error("Error while getting Appointments");
    }
  };
  useEffect(() => {
    getAppointment();
  }, []);

  const updateStatus = async (sts, id) => {
    try {
      const obj = { status: sts, appointmentsId: id };
      const response = await fetch(
        `http://localhost:5000/api/hospital/update-status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(obj),
        }
      );
      if (response.ok) {
        getAppointment();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="admin-users-section">
        {appointments.length ? (
          <>
            <div className="container">
              <h1>Appointments</h1>
            </div>
            <div className="container admin-users-app">
              <table className="tab">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((curUser, index) => {
                    return (
                      <tr key={index}>
                        <td>{curUser.userInfo.name}</td>
                        <td>{curUser.userInfo.phone}</td>
                        <td>
                          {moment(curUser.date).format("DD-MM-YYYY")}{" "}
                          {moment(curUser.time).format("HH:mm")}
                        </td>
                        <td>{curUser.status}</td>
                        {curUser.status === "pending" ? (
                          <>
                            <td>
                              <button
                                className="updateLink"
                                onClick={() => {
                                  updateStatus("approved", curUser._id);
                                }}
                              >
                                Approve
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => {
                                  updateStatus("rejected", curUser._id);
                                }}
                              >
                                Reject
                              </button>
                            </td>
                          </>
                        ) : (
                          <h2 className="txt">No Actions</h2>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p>No appointments present</p>
        )}
      </section>
    </>
  );
};
