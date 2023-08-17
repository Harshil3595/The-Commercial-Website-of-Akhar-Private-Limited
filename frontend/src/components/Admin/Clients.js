import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SideBar from "./SideBar";
import './Services.css';
import { createClient } from "../../actions/userAction"; 

function Clients() {
  const dispatch = useDispatch();

  const [imagesPreview, setImagesPreview] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const createProductImagesChange = (e) => {
    const selectedFile = e.target.files[0];
    const imagePreview = URL.createObjectURL(selectedFile);

    setImagesPreview([imagePreview]);
    setSelectedImage(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedImage) {
      dispatch(createClient([selectedImage])); 
    }
  };

  return (
    <>
      <div className="dashboard">
        <SideBar />
        <div className="newServiceContainer">
          <form
            className="createServiceForm"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <h1>Add client</h1>

            <div id="createServiceFormFile">
              <input
                type="file"
                name="photos" // Use "photos" as the key name
                accept="image/*"
                onChange={createProductImagesChange}
              />
            </div>

            <div id="createServiceFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <button id="createServiceBtn" type="submit">
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Clients;
