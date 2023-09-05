import React, { useEffect } from "react";
import Sidebar from "./SideBar";
import "./DashBoard.css";
import { Link } from "react-router-dom";
import { getStatus } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../Loader/Loader';

const Dashboard = () => {
  const { status ,loading} = useSelector((state) => state.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatus());
  }, [dispatch]);

  const inquiryCount = status?.inquiryCount;
  const serviceCount = status?.serviceCount;
  const userCount = status?.userCount;
  console.log("Data is from dash",inquiryCount,serviceCount,userCount);

  return (
    <>
    {loading ? <Loader/> : (<div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <h1>DashBoard</h1>

        <div className="dashboardSummary">
          <div>
            <p>
              Summary <br />
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/inquirys">
              <p>Inquiries</p>
              <p className="my-3">{inquiryCount}</p>
            </Link>
            <Link to="/">
              <p>Services</p>
              <p className="my-3">{serviceCount}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p className="my-3">{userCount}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>)}
    </>
  );
};

export default Dashboard;
