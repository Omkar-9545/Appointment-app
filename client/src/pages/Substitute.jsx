import { useEffect, useState } from "react"
import  axios  from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

export const Substitute = () => {

    const [sameDoctor, setSameDoctor] = useState();
    const params = useParams();
    const [load,setLoad] = useState(false)


    const getsameDoc = async() => {
        try {
            setLoad(false)
            const response = await axios.get(`http://localhost:5000/api/auth/${params.id}/get-same-doc`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.success) {
                setSameDoctor(response.data.data);
                setLoad(true)
            } else {
                toast.error(response.data.message);
                setLoad(false)
            }
        } catch (error) {
            next(error);
        }
    }

    useEffect(() => {
        getsameDoc();
    }, []);
    
    return (
        <>
            <section className="user-section">
                    <p>Choose any one of the following a substitute:</p>
                    <div className="container">
                        {sameDoctor.length && load
                            ?
                            sameDoctor.map((curDoc) => {
                            const { firstName, lastName, startTime, endTime } = curDoc;
                            return (
                            <>
                            <p><b>Dr.</b> {firstName} {lastName}</p>
                                    <p><b>Timings:</b> {startTime} - {endTime}</p>
                                </>
                            )
                        }):<p>No same doctors found</p>}
                    </div>
                
            </section>
        </>
    )
}