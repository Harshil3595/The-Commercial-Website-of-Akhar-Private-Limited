import React, { useState } from "react";
import { useDispatch ,useSelector } from "react-redux";
import { createInquiry, sendEmail } from "../../actions/userAction";
import "./Contact.css";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CREATE_INQUIYT_RESET } from "../../constants/userConstans";
import { useNavigate } from "react-router-dom";

function Contact() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    NameOfPart: "",
    name: "",
    description: "",
  });
  const { isAuthenticated } = useSelector((state) => state.user);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createInquiry(formData));

    if (!isAuthenticated) {
      toast.error("Please login first for inquiry", {
        className: "custom-toast-fail",
      });
      return;
    }

    setFormData({
      NameOfPart: "",
      name: "",
      description: "",
    });
  };

  const {success}=useSelector((state)=>state.inquiry);
  const {user}=useSelector((state)=>state.user);
  const navigate=useNavigate();

  if(success){
    if(user.email){
      dispatch(sendEmail(user.email));
    }
    toast.success('Inquiry Book Succesfully', {
      className: 'custom-toast-success',
    });
    dispatch({type:CREATE_INQUIYT_RESET})
    navigate('/me/inquirys');  }

  return (
    <div className="contact-container">
      <div className="contact-form">
        <h2 className="h1-responsive font-weight-bold text-center my-4">
          Contact us
        </h2>
        <p className="text-center w-responsive mx-auto mb-5">
          Do you have any questions? Please do not hesitate to contact us
          directly. Our team will come back to you within a matter of hours to
          help you.
        </p>

        <form
          id="contact-form"
          name="contact-form"
          onSubmit={handleSubmit}
        >
          <div className="md-form mb-4">
            <input
              type="text"
              id="NameOfPart"
              name="NameOfPart"
              className="form-control"
              placeholder="Name of Part"
              value={formData.NameOfPart}
              onChange={handleChange}
              required
            />
          </div>

          <div className="md-form mb-4">
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="md-form mb-4">
            <textarea
              type="text"
              id="description"
              name="description"
              rows="2"
              className="form-control md-textarea"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="text-center text-md-left">
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
          <div className="status"></div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
