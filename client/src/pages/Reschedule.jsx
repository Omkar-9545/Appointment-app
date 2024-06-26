import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Reschedule = () => {
  // const [isAvailable, setisAvailable] = useState(true);
  const [days, setDays] = useState([]);
  const [date, setDate] = useState({
    date: "",
  });
  const [time, setTime] = useState([]);
  const [dates, setDates] = useState([]);
  const [appointment, setAppointment] = useState({
    doctorId: "",
    appdate: "",
    apptime: [],
  });
  const [load, setLoad] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [isAvailable1, setIsavailable1] = useState([]);
  const [isAvailable2, setIsavailable2] = useState([]);
  const [isAvailable3, setIsavailable3] = useState([]);
  const [isAvailable4, setIsavailable4] = useState([]);
  const [isAvailable5, setIsavailable5] = useState([]);
  const [isAvailable6, setIsavailable6] = useState([]);
  const [isAvailable7, setIsavailable7] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSubmit(false);
    setDate({ [name]: value });
  };

  const sortTable = (choice) => {
    let i,
      flag = 0,
      tmp = 0;
    let x = moment(choice, "DD-MM-YYYY").toISOString();
    let arr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let ans = [];
    const day = moment(x).format("ddd");
    for (i = 0; i < 7; i++) {
      if (arr[i] === day) {
        flag = 1;
        tmp = i;
      }
      if (flag && i < 7) ans.push(arr[i]);
    }
    for (i = 0; i < tmp; i++) {
      ans.push(arr[i]);
    }
    setDays(ans);
  };

  const getAlltime = () => {
    let arr = [];
    let startTime = "07:00 AM";
    arr.push(startTime);
    for (let i = 0; i < 32; i++) {
      const app1 = moment(startTime, "HH:mm A")
        .add(0.5, "hour")
        .format("hh:mm A");
      startTime = app1;
      arr.push(app1);
    }
    setTime(arr);
  };

  const createDatesArray = () => {
    setLoad(false);
    let arr = [];
    arr.push(
      moment(date.date || new Date(), "YYYY-MM-DD").format("DD-MM-YYYY")
    );
    for (let i = 1; i < 7; i++) {
      arr.push(
        moment(date.date || new Date(), "YYYY-MM-DD")
          .add(i, "days")
          .format("DD-MM-YYYY")
      );
    }
    setDates(arr);
    setLoad(true);
  };

  appointment.doctorId = "66434528a34e8f13c2814ca4";

  const checkAvailability1 = async () => {
    try {
      appointment.appdate = dates[0];
      appointment.apptime = time;
      const response = await fetch(
        `http://localhost:5000/api/hospital/available`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(appointment),
        }
      );
      const res_data = await response.json();
      if (res_data.suc) {
        setIsavailable1(res_data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkAvailability2 = async () => {
    try {
      appointment.appdate = dates[1];
      appointment.apptime = time;
      const response = await fetch(
        `http://localhost:5000/api/hospital/available`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(appointment),
        }
      );
      const res_data = await response.json();
      setIsavailable2(res_data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkAvailability3 = async () => {
    try {
      appointment.appdate = dates[2];
      appointment.apptime = time;
      const response = await fetch(
        `http://localhost:5000/api/hospital/available`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(appointment),
        }
      );
      const res_data = await response.json();
      setIsavailable3(res_data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkAvailability4 = async () => {
    try {
      appointment.appdate = dates[3];
      appointment.apptime = time;
      const response = await fetch(
        `http://localhost:5000/api/hospital/available`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(appointment),
        }
      );
      const res_data = await response.json();
      setIsavailable4(res_data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkAvailability5 = async () => {
    try {
      appointment.appdate = dates[4];
      appointment.apptime = time;
      const response = await fetch(
        `http://localhost:5000/api/hospital/available`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(appointment),
        }
      );
      const res_data = await response.json();
      setIsavailable5(res_data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkAvailability6 = async () => {
    try {
      appointment.appdate = dates[5];
      appointment.apptime = time;
      const response = await fetch(
        `http://localhost:5000/api/hospital/available`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(appointment),
        }
      );
      const res_data = await response.json();
      setIsavailable6(res_data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkAvailability7 = async () => {
    try {
      appointment.appdate = dates[6];
      appointment.apptime = time;
      const response = await fetch(
        `http://localhost:5000/api/hospital/available`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(appointment),
        }
      );
      const res_data = await response.json();
      setIsavailable7(res_data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAlltime();
    sortTable();
  }, []);
  useEffect(() => {
    if (load) {
      createDatesArray();
      setLoad(false);
    }
  }, [load]);

  useEffect(() => {
    if (load) {
      checkAvailability1();
      checkAvailability2();
      checkAvailability3();
      checkAvailability4();
      checkAvailability5();
      checkAvailability6();
      checkAvailability7();
    }
  }, [load]);

  return (
    <>
      {!submit ? (
        <>
          <section className="date-picker">
            <div className="date-container">
              <form className="date-form">
                <label for="date" id="date-label">
                  Choose your Appointment Date:
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  placeholder="Date"
                  value={date.date}
                  onChange={handleChange}
                />
                <input
                  type="submit"
                  id="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!date.date.length) {
                      toast.error("Please fill date field");
                      return;
                    }
                    sortTable(moment(date.date).format("DD-MM-YYYY"));
                    createDatesArray();
                    setSubmit(true);
                  }}
                />
              </form>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="event-calendar">
            <div className="cal-container">
              <table id="calendar">
                <tr>
                  <th>Time</th>
                  {days.length ? (
                    days.map((curDay, index) => {
                      return <th key={index}>{curDay}</th>;
                    })
                  ) : (
                    <>Loading...</>
                  )}
                </tr>
                <tbody id="calendar-body">
                  {time.length ? (
                    time.map((curTime, index) => {
                      return (
                        <tr key={index}>
                          <td key={index}>{`${curTime}`}</td>
                          <td
                            onClick={() => {
                              console.log("isavail1", isAvailable1);
                              console.log("isavail2", isAvailable2);
                              console.log("isavail3", isAvailable3);
                              console.log("isavail4", isAvailable4);
                              console.log("isavail5", isAvailable5);
                              console.log("isavail6", isAvailable6);
                              console.log("isavail7", isAvailable7);
                            }}
                          >
                            Available
                          </td>
                          <td
                            onClick={() => {
                              console.log(`${curTime}`);
                            }}
                          >
                            Available
                          </td>
                          <td
                            onClick={() => {
                              console.log(`Time now is ${curTime}`);
                            }}
                          >
                            Available
                          </td>
                          <td
                            onClick={() => {
                              console.log(`Time now is ${curTime}`);
                            }}
                          >
                            Available
                          </td>
                          <td
                            onClick={() => {
                              console.log(`Time now is ${curTime}`);
                            }}
                          >
                            Available
                          </td>
                          <td
                            onClick={() => {
                              console.log(`Time now is ${curTime}`);
                            }}
                          >
                            Available
                          </td>
                          <td
                            onClick={() => {
                              console.log(`Time now is ${curTime}`);
                            }}
                          >
                            Available
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <p>Loading....</p>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </>
  );
};
