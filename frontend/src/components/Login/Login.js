import React, { useEffect, useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { login } from '../../actions/userAction'; 
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

import './Login.css';

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const {error,loading,isAuthenticated}=useSelector((state)=>state.user);


  useEffect(()=>{
    if(isAuthenticated){
      if(loading){
        return <Loader/>
      }
      toast.success('Login successful!', {
        className: 'custom-toast-success',
      });
      navigate('/')
    }
  },[dispatch,error,isAuthenticated,navigate,loading])

  return (
   <>
   <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6 col-md-7 intro-section">
          <div className="intro-content-wrapper">
            <h1 className="intro-title">Welcome to Akshar !</h1>
          </div>
          <div className="intro-section-footer">
            <na className="footer-nav">
              <a href="#!">Facebook</a>
              <a href="#!">Twitter</a>
              <a href="mailto:akshar.info.yash@gmail.com?subject=Default%20Inquiry">Gmail</a>
            </na>
          </div>
        </div>
        <div className="col-sm-6 col-md-5 form-section">
          <div className="login-wrapper">
            <h2 className="login-title">Sign in</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />              </div>
              <div className="form-group mb-3">
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center mb-5">
              <input
                  type="submit"
                  className="btn login-btn"
                  value="Login"
                />
                <Link to="/password/forgot" className="forgot-password-link">Forgot Password?</Link>
              </div>
            </form>           
            <p className="login-wrapper-footer-text">Need an account? <Link to="/register" className="text-reset">Signup here</Link></p>
          </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default Login
