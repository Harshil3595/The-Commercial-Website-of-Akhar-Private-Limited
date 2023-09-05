import React, { useState ,useEffect} from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import { register } from '../../actions/userAction';
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import 'react-toastify/dist/ReactToastify.css';
import '../Login/Login.css'
import { Link } from 'react-router-dom';
function Register() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = new FormData();
    userData.append('name', name);
    userData.append('email', email);
    userData.append('password', password);

    try {
      dispatch(register(userData));
    } catch (error) {
      console.log(error);
    }
  };

  const {error,isAuthenticated,loading}=useSelector((state)=>state.user);
  
  useEffect(()=>{
  //  if(error){
  //   toast.success("User already exit", {
  //     className: 'custom-toast-success',
  //   });
  //  }
  
     if(isAuthenticated){
      toast.success('User Register Succesfully!', {
        className: 'custom-toast-success',
      });
      if(loading){
        return <Loader/>
      }
      navigate('/')
    }

  },[dispatch,error,isAuthenticated,navigate,loading])


  return (
    <>
    <div class="container-fluid">
       <div class="row">
         <div class="col-sm-6 col-md-7 intro-section">
           <div class="intro-content-wrapper">
             <h1 class="intro-title">Welcome to Akshar !</h1>
           </div>
           <div class="intro-section-footer">
             <na class="footer-nav">
             <a href="#!">Facebook</a>
              <a href="#!">Twitter</a>
              <a href="mailto:akshar.info.yash@gmail.com?subject=Default%20Inquiry">Gmail</a>
             </na>
           </div>
         </div>
         <div class="col-sm-6 col-md-5 form-section">
           <div class="login-wrapper">
             <h2 class="login-title">Sign Up</h2>
             <form onSubmit={handleRegister}>
             <div class="form-group">
                 <label for="name" class="sr-only">Name</label>
                 <input
                type="text"
                name="name"
                id="name"
                class="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />               </div>
               <div class="form-group">
                 <label for="email" class="sr-only">Email</label>
                 <input
                type="email"
                name="email"
                id="email"
                class="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />               </div>
               <div class="form-group mb-3">
                 <label for="password" class="sr-only">Password</label>
                 <input
                type="password"
                name="password"
                id="password"
                class="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />               </div>
               <div class="d-flex justify-content-between align-items-center mb-5">
               <input
                type="submit"
                name="register"
                id="register"
                class="btn login-btn"
                value="Register"
              />               </div>
             </form>           
             <p class="login-wrapper-footer-text">Already user? <Link to="/login" class="text-reset">Login here</Link></p>
           </div>
         </div>
       </div>
     </div>
    </>
  )
}

export default Register
