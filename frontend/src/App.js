import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import HomeServices from './components/Services/HomeServices';
import Contact from './components/Contact/Contact';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import store from './store';
import { useEffect } from 'react';
import { loadUser } from './actions/userAction';
import Profile from './components/Login/Profile'; 
import Dashboard from './components/Admin/DashBoard';
import Services from './components/Admin/Services';
import InquirysList from './components/Admin/InquirysList';
import MyInquiry from './components/myInquiry/MyInquiry';
import UpdateStatus from './components/Admin/Updatestatus';
import UserList from './components/Admin/UserList';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Protected from './components/Route/ProtectedRoute';
import Loader from './components/Loader/Loader';
import Success from './components/success/Success';
import InquiryDetails from './components/Admin/InquiryDetails ';
import ForgotPassword from './components/Login/ForgotPassword';
import ResetPassword from './components/Login/ResetPassword';
import Clients from './components/Admin/Clients';


function App() {
  const { isAuthenticated, user,loading } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      <BrowserRouter>
        <Navbar  user={user}/>
        <ToastContainer className="custom-toast-container" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<HomeServices />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/success" element={<Success />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />



          <Route
            path="/admin/dashboard"
            element={<Protected   user={user} isSignedIn={isAuthenticated} isAdmin={user?.role === "admin"}><Dashboard /></Protected>}
          />
           <Route
            path="/admin/clients"
            element={<Protected   user={user} isSignedIn={isAuthenticated} isAdmin={user?.role === "admin"}><Clients /></Protected>}
          />
          <Route
            path="/admin/services"
            element={<Protected  user={user} isSignedIn={isAuthenticated} isAdmin={user?.role === "admin"}><Services /></Protected>}
          />
          <Route
            path="/admin/inquirys"
            element={<Protected  user={user}  isSignedIn={isAuthenticated} isAdmin={user?.role === "admin"}><InquirysList /></Protected>}
          />
          <Route
            path="/me/inquirys"
            element={<Protected  user={user} isSignedIn={isAuthenticated}><MyInquiry /></Protected>}
          />
          <Route
            path="/admin/updatestatus/:id"
            element={<Protected   user={user} isSignedIn={isAuthenticated} isAdmin={user?.role === "admin"}><UpdateStatus /></Protected>}
          />
          <Route
            path="/admin/users"
            element={<Protected  user={user} isSignedIn={isAuthenticated} isAdmin={user?.role === "admin"}><UserList /></Protected>}
          />
           <Route
            path="/admin/inquirydetails/:id"
            element={<Protected   user={user} isSignedIn={isAuthenticated} isAdmin={user?.role === "admin"}><InquiryDetails /></Protected>}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
