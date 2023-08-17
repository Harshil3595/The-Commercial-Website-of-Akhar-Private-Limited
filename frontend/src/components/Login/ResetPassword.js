import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../actions/userAction';
import { useNavigate, useParams } from 'react-router-dom';

function ResetPassword() {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {token}=useParams();

  const {loading,success}=useSelector((state)=>state.forgotPassword)


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(token,password,confirmPassword));
  };

  useEffect(()=>{
    if(!loading){
      if(success){
        navigate('/login');
      }
    }
  },[success,navigate,loading])

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
              <a href="#!">Gmail</a>
            </na>
          </div>
        </div>
        <div className="col-sm-6 col-md-5 form-section">
          <div className="login-wrapper">
            <h2 className="login-title">Reset Password</h2>
            <form onSubmit={handleSubmit} >
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
              <div className="form-group">
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  type="text"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="form-control"
                  placeholder="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />              </div>
              <div className="d-flex justify-content-between align-items-center mb-5">
              <input
                  type="submit"
                  className="btn login-btn"
                  value="Submit"
                />
              </div>
            </form>           
          </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default ResetPassword
