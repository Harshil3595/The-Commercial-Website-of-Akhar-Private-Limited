import React from 'react';
import './ServiceCard.css'

function ServiceCard({ name, description, uploadfile }) {
  return (
    <div className="row featurette d-flex justify-content-center align-item-center my-4">
      <div className="col-md-7">
        <h2 className="featurette-heading">{name}<span className="text-muted"></span></h2>
        <p className="lead">{description}</p>
      </div>
      <div className="col-md-5">
        <img
          className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto service-image"
          src={uploadfile}
          alt=""
        />
      </div>
    </div>
  );
}

export default ServiceCard;
