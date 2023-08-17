import React, { Fragment, useEffect } from "react";
import "./InquirysList.css";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "./SideBar";
import { getAllUsers } from "../../actions/userAction";
import Loader from '../Loader/Loader';

const UserList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const { usersList , loading} = useSelector((state) => state.users.users);

    return (
       <>
       {loading ? <Loader/> : ( <div className="dashboard">
            <SideBar />
            {loading ? <Loader/> : (
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL USERS</h1>
                    <div className="scrollableTableContainer">
                        <table className="table table-hover productListTable">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersList &&
                                    usersList.map((user, index) => (
                                        <tr key={user._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>)}
       </>
    );
};

export default UserList;
