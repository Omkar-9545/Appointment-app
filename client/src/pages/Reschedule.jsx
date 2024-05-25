import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";

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
    appdates: [],
    time: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDate({ [name]: value });
  };

  const sortTable = (choice) => {
    let i,
      flag = 0,
      tmp = 0;
    let x = moment(choice, "DD-MM-YYYY").toISOString();
    let arr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let ans = [];
    const day = moment(x || new Date()).format("ddd");
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
      checkAvailability(`${startTime}`);
      arr.push(app1);
    }
    setTime(arr);
  };

  const createDatesArray = () => {
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
  };

  appointment.doctorId = "664353dab1b24b4a63f4c210";

  const checkAvailability = async (y) => {
    try {
      appointment.appdates = dates;
      appointment.time = y;

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
      console.log(res_data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    sortTable();
    getAlltime();
    createDatesArray();
    checkAvailability("07:00 AM");
  }, []);

  return (
    <>
      <section className="date-picker">
        <div className="date-container">
          <form>
            <label for="date" id="date-label">
              Date:
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
                sortTable(moment(date.date).format("DD-MM-YYYY"));
                createDatesArray();
              }}
            />
          </form>
        </div>
      </section>
      <section className="event-calendar">
        <div className="cal-container">
          <table id="calendar">
            <tr>
              <th>Time</th>
              {days ? (
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
  );
};
