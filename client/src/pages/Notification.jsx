import { useEffect, useState } from "react";
import axios from "axios";

export const Notification = () => {
    const [Data, setData] = useState({
        read: [],
        unread: [],
    });
    const [load, setLoad] = useState(1);

    const seeNotification = async() => {
        try {
            const response = await axios.get("http://localhost:5000/api/admin/get-notification")
            setData(response.data.data)
        } catch (error) {
            console.log(`Notification getting frontend error ${error}`);
        }
    }

    const getNotification = async() => {
        try {
            await axios.get("http://localhost:5000/api/admin/notification")
        } catch (error) {
            console.log(`Notification getting frontend error ${error}`);
        }
        // window.location.reload()
    }

    useEffect(() => {
        if (load) {
            seeNotification();
            setLoad(0);
        }
    },[load])
   
    return (
        <>
            <div className="notification-div">
                <h1>Notifications:</h1>
            </div>
            <div className="grid-two-cols">
            <div className="read-message">
                <div className="read-title">
                    <p>Read Messages:</p>
                </div>
                
            <p>{ Data.read.length ?
                (Data.read.map((ele,idx) => {
                    const { data, message, type } = ele;
                    return (
                    <>
                            <p>{`${idx+1} : ${message}`}</p>
                    </>
                    );
                })):"No Read messages"
            }
                </p>
            </div>
            <button className="read-button">
                    Delete all read
            </button>
            <br />
            <div className="unread-message">
                <div className="read-title">
                    <p>Unread Messages:</p>
                </div>
            <p>{ Data.unread.length ?
                (Data.unread.map((ele,idx) => {
                    const { data, message, type } = ele;
                    return (
                    <>
                            <p>{`${idx+1}- ${message}`}</p>
                    </>
                    );
                })):"No Read messages"
            }
                </p>
            </div>
                <button className="unread-button" onClick={() => {
                    getNotification();
                    setLoad(1);
                }}>Mark all read</button>
                </div>
        </>
    )
};