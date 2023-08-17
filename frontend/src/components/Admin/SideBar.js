import React from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/admin/dashboard">
        <p>
          Dashboard
        </p>
      </Link>
      <Link to="/admin/services">
        <p>
          Services
        </p>
      </Link>
      <Link to="/admin/users">
        <p>Users
        </p>
      </Link>
      <Link to="/admin/inquirys">
        <p>
          Inquairys
        </p>
      </Link>
      <Link to="/admin/clients">
        <p>
          Clients 
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;