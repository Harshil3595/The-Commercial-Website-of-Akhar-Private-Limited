// Services.js
import React, { useState } from "react";
import "./Services.css";
import { useDispatch } from "react-redux";
import SideBar from "./SideBar";
import { createService } from "../../actions/userAction";

const Services = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const createProductImagesChange = (e) => {
    const selectedFiles = e.target.files;
    const filesArray = Array.from(selectedFiles);
    const imagePreviews = [];

    filesArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        imagePreviews.push(reader.result);
      };
      reader.readAsDataURL(file);
    });

    setImagesPreview(imagePreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createService(name, description, imagesPreview));
  };
  return (
    <>
      <div className="dashboard">
        <SideBar />
        <div className="newServiceContainer">
          <form className="createServiceForm" encType="multipart/form-data" onSubmit={handleSubmit}>
            <h1>Create Services</h1>

            <div>
              <input
                type="text"
                placeholder="Service name"
                name="name"
                required
                value={name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <textarea
                placeholder="Service Description"
                name="description"
                value={description}
                cols="30"
                rows="1"
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div id="createServiceFormFile">
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createServiceFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <button id="createServiceBtn" type="submit">
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Services;
