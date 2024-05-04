import { useAuth } from "../store/auth";

export const Sangli = () => {
    
   const { hospital3 } = useAuth();
   const { isLoggedIn } = useAuth();
    if (isLoggedIn) {
        return (
            <>
                <section className="section-services">
                    <div className="container">
                        <h1 className="main-heading">Hospitals</h1>
                    </div>
                    <div className="container grid grid-three-cols">
                        {hospital3.map((curElem, index) => {

                            const { name, address, phone } = curElem;

                            return (
                                <><div className="card" key={index}>
                                    <div className="card-img">
                                        {/* <a href="/login"> */}
                                        <img src="./images/multi.jpg" width="300" />
                                        {/* </a> */}
                                    </div>
                                    <div className="card-details">
                                        <h2>{name}</h2>
                                        <p>Address: {address}</p>
                                        <p>Phone: {phone}</p>
                                    </div>
                                </div>
                                </>
                   
                            );
                        })}
                    </div>
                </section>
            </>
        )
    }
};