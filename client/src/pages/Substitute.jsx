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
                setLoad(false)
                alert(response.data.message);
            }
        } catch (error) {
            // next(error);
            console.log(error)
            toast.error("Some thing went wrong")
        }
    }

    useEffect(() => {
        getsameDoc();
    }, []);
    
    return (
        <>
            <section className="section-services">
                <div className="container">
                <h1>Choose any one of the following a substitute:</h1>
                </div>
                    <div className="grid grid-three-cols">
                    { 
                        load  && sameDoctor?
                        sameDoctor.length
                            ?
                            sameDoctor.map((curDoc,index) => {
                            const { firstName, lastName, startTime, endTime } = curDoc;
                            return (
                            <>
                            <div className="card" key={index}>
                                <p><b>Dr.</b> {firstName} {lastName}</p>
                                <p><b>Timings:</b> {startTime} - {endTime}</p>
                                <button>Add Substitute</button>
                            </div>
                            </>
                            )
                        }):"":<p>No doctors found of same specialization</p>}
                    </div>
               
            </section>
        </>
    )
}