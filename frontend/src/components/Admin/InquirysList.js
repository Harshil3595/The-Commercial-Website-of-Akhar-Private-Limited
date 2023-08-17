// InquirysList.js

import React, { useEffect } from 'react';
import './InquirysList.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
import { getAllInquirys } from '../../actions/userAction';
import Loader from '../Loader/Loader';

const InquirysList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllInquirys());
  }, [dispatch]);

  const { inquirys, loading } = useSelector((state) => state.inquirys);

  const getStatusButtonColor = (status) => {
    switch (status) {
      case 'pending':
        return 'primary';
      case 'viewed':
        return 'secondary';
      case 'done':
        return 'success';
      default:
        return 'primary';
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <>
      <div className="dashboard">
        <SideBar />
        {loading ? (
          <Loader />
        ) : (
          <div className="productListContainer">
            <h1 id="productListHeading">ALL INQUIRYS</h1>
            <div className="scrollableTableContainer">
              <table className="table table-hover productListTable">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">NameOfPart</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {inquirys &&
                    inquirys.map((inquiry, index) => (
                      <tr key={index}>
                        <td>
                          <Link to={`/admin/inquirydetails/${inquiry._id}`} className="custom-link">
                            {index + 1}
                          </Link>
                        </td>
                        <td style={{ maxWidth: '100px', overflow: 'hidden' }}>
                          {truncateText(inquiry.name, 10)}
                        </td>
                        <td style={{ maxWidth: '200px', overflow: 'hidden' }}>
                          {truncateText(inquiry.email, 30)}
                        </td>
                        <td style={{ maxWidth: '150px', overflow: 'hidden' }}>
                          {truncateText(inquiry.NameOfPart, 30)}
                        </td>
                        <td style={{ maxWidth: '250px', overflow: 'hidden' }}>
                          {truncateText(inquiry.description, 30)}
                        </td>
                        <td>
                          <Link to={`/admin/inquirydetails/${inquiry._id}`}>
                            <button
                              className={`btn btn-${getStatusButtonColor(
                                inquiry.status
                              )}`}
                              style={{
                                minWidth: '100px',
                                height: '40px',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {inquiry.status}
                            </button>
                          </Link>
                        </td>
                        <td>
                          <Link to={`/admin/updatestatus/${inquiry._id}`}>
                            <button
                              className="btn btn-primary"
                              style={{
                                minWidth: '100px',
                                height: '40px',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              Edit
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InquirysList;
