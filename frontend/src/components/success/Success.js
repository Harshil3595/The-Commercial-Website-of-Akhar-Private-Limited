import React from "react";
import './Success.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const Success = ({ message, btnMessage ,path }) => {
  return (
    <div className="orderSuccess container">
      <FontAwesomeIcon icon={faCheckCircle} className="text-success fs-1" />

      <p className="h4 my-4">{message}</p>
      <Link to={path} className="btn btn-dark btn-lg">
        {btnMessage}
      </Link>
    </div>
  );
};

export default Success;
