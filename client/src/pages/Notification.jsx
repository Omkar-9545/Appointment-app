import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from './../store/auth';

export const Notification = () => {
    const [Data, setData] = useState({
        read: [],
        unread: [],
    });

    const [load, setLoad] = useState(1);
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return <h1>Loading ...</h1>
    }
    const id = user._id

    const seeNotification = async() => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/get-notification/${id}`)
            setData(response.data.data)
        } catch (error) {
            console.log(`Notification getting frontend error ${error}`);
        }
    }

    const getNotification = async() => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/notification/${id}`)
            if(response.data.success){
                setLoad(1);
            }
        } catch (error) {
            console.log(`Notification getting frontend error ${error}`);
        }
    }

    const deleteNotification = async() => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/delete-notification/${id}`);
            if(response.data.success){
                setLoad(1);
            }
        } catch (error) {
            console.log(`Notfication deletion error ${error}`);
        }
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
                <button className="read-button" onClick={() => {
        deleteNotification();
        
            }}>
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