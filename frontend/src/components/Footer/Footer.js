import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import {
  faHome,
  faEnvelope,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer
      className="text-white text-center text-lg-start custom-footer"
      style={{ backgroundColor: "#23242a" }}
    >
      <div className="container p-4">
        <div className="row mt-4">
          <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">About company</h5>
            <p>
              We provide better products faster with our rapid prototyping
              services.We also Accelerate your product development journey and
              deliver top-notch offerings to the market sooner with our
              efficient prototyping solutions.
            </p>
            <div className="mt-4">
              <a
                href="https://www.instagram.com/"
                className="btn btn-floating btn-warning btn-lg"
              >
                <FontAwesomeIcon icon={faInstagram} style={{ color: "#fff" }} />
              </a>
              <a
                href="https://www.linkedin.com/"
                className="btn btn-floating btn-warning btn-lg"
              >
                <FontAwesomeIcon icon={faLinkedin} style={{ color: "#fff" }} />
              </a>
              <a
                href="mailto:your_email@example.com"
                className="btn btn-floating btn-warning btn-lg"
              >
                <FontAwesomeIcon icon={faGoogle} style={{ color: "#fff" }} />
              </a>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <ul className="fa-ul" style={{ marginLeft: "1.65em" }}>
              <li className="mb-3">
                <span className="fa-li">
                  <FontAwesomeIcon icon={faHome} />{" "}
                </span>
                <span className="ms-2">Modasa, Gujarat,India</span>
              </li>
              <li className="mb-3">
                <a
                  href="mailto:akshar.info.yash@gmail.com?subject=Default%20Inquiry"
                  style={{
                    textDecoration: "none", 
                    color: "inherit",
                  }}
                >
                  <span className="fa-li">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <span className="ms-2">akshar.info.yash@gmail.com</span>
                </a>
              </li>

              <li className="mb-3">
                <span className="fa-li">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                <span className="ms-2">+91 9409348452</span>
              </li>
              <li className="mb-3">
                <span className="fa-li">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <span className="ms-2">Yashkumar Patel</span>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Opening hours</h5>
            <table className="table table-dark text-center">
              <tbody className="font-weight-normal">
                <tr>
                  <td>Mon - Sat</td>
                  <td>8am - 9pm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2020 Copyright:
        <a className="text-white" href="https://mdbootstrap.com/">
          Akshat.com
        </a>
      </div>
    </footer>
  );
}

export default Footer;
