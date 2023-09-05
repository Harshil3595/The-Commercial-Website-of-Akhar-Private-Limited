import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Home.css';
import '../Services/ServiceCard.css'
import Loader from '../Loader/Loader';
import bg1 from '../images/bg1.jpg'
import bg2 from '../images/bg2.jpg'
import bg3 from '../images/bg3.jpg'
import { getAllClients, getAllServices } from '../../actions/userAction';


function Home() {

    const dispatch = useDispatch();
    const { services,loading } = useSelector(state => state.services);
    const { clients } = useSelector(state => state.clients);
    console.log("clinets is ",clients)
  
    useEffect(() => {
      dispatch(getAllServices());
      dispatch(getAllClients());
    }, [dispatch]);

  return (
    <>
     <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active"
                aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
            <div className="carousel-item active">
                <img src={bg1} className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                    <h5>Welcome to Akashar Privated Limited</h5>
                    <p>3D printing & Prototyping </p>
                </div>
            </div>
            <div className="carousel-item">
                <img src={bg2} className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                    <h5>Welcome to Akashar Privated Limited</h5>
                    <p>3D printing & Prototyping</p>
                </div>
            </div>
            <div className="carousel-item">
                <img src={bg3} className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                <h5>Welcome to Akashar Privated Limited</h5>
                    <p>3D printing & Prototyping</p>
                </div>
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
    <>
        {loading ? (
          <Loader />
        ) : (
          <div className="container my-4">
            <h1 style={{ fontFamily: 'Georgia', textAlign: 'center' }}>Services</h1>
            {services &&
              services.map((service, index) => (
                <div key={service._id}>
                  <div className="row featurette d-flex justify-content-center align-item-center my-4">
                    <div className={`col-md-5 order-md-${index % 2 === 0 ? 1 : 2}`}>
                      <img
                        className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto service-image"
                        src={service.uploadfile}
                        alt=""
                      />
                    </div>
                    <div className={`col-md-7 order-md-${index % 2 === 0 ? 2 : 1}`}>
                      <h2 className="featurette-heading">{service.name}</h2>
                      <p className="lead">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </>
      {/* <div className="container my-4">
                <h1 style={{ fontFamily: 'Georgia', textAlign: 'center' }}>Clients</h1>
                <div className="row justify-content-center">
                    {clients && clients.map((client, index) => (
                        <div className="col-md-3" key={index}>
                            <img
                                className="img-fluid"
                                src={client.uploadfile} 
                                alt={`Client ${index}`}
                            />
                        </div>
                    ))}
                </div>
            </div> */}
    </>
  )
}

export default Home
