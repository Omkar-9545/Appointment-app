import { useAuth } from "../store/auth";

export const Notification = () => {
    const { notfication } = useAuth();
    const { seenNotification } = useAuth();
    console.log(notfication)
    return (
        <>
            <h1>Notifications:</h1>
            <p>Read Messages: {seenNotification.length ?"": "No Read Messages"}</p>
            <p>Unread Messages: {notfication ?"":"No Unread messages"}</p>
            <p></p>
        </>
    )
};