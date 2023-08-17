import React from "react";
import { Link } from 'react-router-dom';
import './Navbar.css'
import { useDispatch, useSelector } from "react-redux";
import {  logout } from "../../actions/userAction";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar({ user }) {

  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logout successful!');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Akshar
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {isAuthenticated && user && user.role === "admin" ? (
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/admin/dashboard">
                    DashBoard
                  </Link>
                </li>
              ) : null}
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/contact">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/me/inquirys">
                 My Inquirys
                </Link>
              </li>
            </ul>
            {!isAuthenticated ? (
              <form className="d-flex" role="search">
               <Link className="btn btn-outline-primary ms-2" to='/login'>Login</Link>
                <Link className="btn btn-outline-success  ms-2" to='/register'>Sign Up</Link>
              </form>
            ) : (
              <button className="btn btn-outline-success ms-2" onClick={handleLogout} style={{ border: '1px solid white' }}>
                <FontAwesomeIcon icon={faSignOutAlt} color="white" />
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
