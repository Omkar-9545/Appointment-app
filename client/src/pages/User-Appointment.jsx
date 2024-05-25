import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

export const UserAppointment = () => {
  const params = useParams();
  const [appointments, setAppointments] = useState([]);

  const userAppointments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/auth/${params.id}/getappointments`,
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
      next(error);
    }
  };

  useEffect(() => {
    userAppointments();
  }, []);

  return (
    <>
      <section className="admin-users-setion">
        {appointments.length ? (
          <>
            <div className="container">
              <h1>Appointments</h1>
            </div>
            <div className="container admin-users">
              <table className="tab">
                <thead>
                  <tr>
                    <th>Doctor</th>
                    <th>Specialization</th>
                    <th>Date </th>
                    <th>Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((curAppointment, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {curAppointment.docInfo.firstName}{" "}
                          {curAppointment.docInfo.lastName}
                        </td>
                        <td>{curAppointment.docInfo.specialization}</td>
                        <td>
                          {moment(curAppointment.date).format("DD-MM-YYYY")}
                        </td>
                        <td> {moment(curAppointment.time).format("HH:mm")}</td>
                        <td>
                          <Link
                            className="updateLink"
                            to={`/${curAppointment.doctorId}/reschedule`}
                          >
                            Reschedule
                          </Link>
                        </td>
                        <td>
                          <button>Cancel</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="not-found-text">No appointments available!</p>
        )}
      </section>
    </>
  );
};
