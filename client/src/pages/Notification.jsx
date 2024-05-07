import { useEffect, useState } from "react";
import axios from "axios";

export const Notification = () => {
    const [Data, setData] = useState({
        read: [],
        unread: [],
    });


    const seeNotification = async() => {
        try {
            const response = await axios.get("http://localhost:5000/api/admin/get-notification")
            setData(response.data.data)
        } catch (error) {
            console.log(`Notification getting frontend error ${error}`);
        }
    }
    useEffect(() => {
        seeNotification();        
    },[])
   
    return (
        <>
            <h1>Notifications:</h1>
            <p>Read Messages:</p>
            <p>{ Data.read.length ?
                (Data.read.map((ele,idx) => {
                    const { data, message, type } = ele;
                    return (
                    <>
                            <p>{message}</p>
                    </>
                    );
                })):"No Read messages"
            }
            </p>
            <br />
            <p>Unread Messages:</p>
            <p>{ Data.unread.length ?
                (Data.unread.map((ele,idx) => {
                    const { data, message, type } = ele;
                    return (
                    <>
                            <p>{message}</p>
                    </>
                    );
                })):"No Read messages"
            }
            </p>
        </>
    )
};