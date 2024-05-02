import { useAuth } from "../store/auth";

export const Service = () => {
    const { service } = useAuth();

    return (
            <>
                <section className="section-services">
                    <div className="container">
                    <h1 className="main-heading">Cities where Our Service is Available:</h1>
                    </div>
                    <div className="container grid grid-three-cols">
                       {service.map((curElem, index) => {

                           const { name, address, phone } = curElem;

                           return (
                               <><div className="card" key={index}>
                                   <div className="card-img">
                                       {/* <a href="/login"> */}
                                       <img src="./images/apollo.jpg" width="300" />
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
    );     
};