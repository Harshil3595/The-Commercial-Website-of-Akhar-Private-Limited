import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../actions/userAction';
import Loader from '../Loader/Loader';

function ForgotPassword() {

    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const {loading}=useSelector((state)=>state.forgotPassword)


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
      };

  return (
    <>
    {loading ? <Loader/> : (<div className="container-fluid">
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
              <div className="d-flex justify-content-between align-items-center mb-5">
              <input
                  type="submit"
                  className="btn login-btn"
                  value="Send"
                />
              </div>
            </form>           
          </div>
        </div>
      </div>
    </div>)}
   </>
  )
}

export default ForgotPassword
