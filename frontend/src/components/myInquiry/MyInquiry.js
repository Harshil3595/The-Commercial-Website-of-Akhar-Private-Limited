import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMyInquirys } from '../../actions/userAction';
import './MyInquiry.css'
import Success from '../success/Success';

function MyInquiry() {
  const dispatch = useDispatch();
  const { inquirys } = useSelector((state) => state.inquirys);

  useEffect(() => {
    dispatch(getMyInquirys());
  }, [dispatch]);

  const getStatusClassName = (status) => {
    switch (status) {
      case "pending":
        return "status-pending";
      case "viewed":
        return "status-processing";
      case "done":
        return "status-done";
      default:
        return "status-pending";
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
    <div className='myinquirys'>
      <h1 className='text-center my-4'>My Inquiry</h1>
      {inquirys.length === 0 ? (<Success message={"You don't have any past Inquirys"} btnMessage={"Book Inquirys"} path="/contact" />) : (<table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">NameOfPart</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {inquirys && inquirys.map((inquiry, index) => (
            <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{truncateText(inquiry.name, 10)}</td>
            <td>{truncateText(inquiry.NameOfPart, 20)}</td>
            <td>{truncateText(inquiry.description, 30)}</td>
            <td>
              <span className={`status ${getStatusClassName(inquiry.status)}`}>
                {inquiry.status}
              </span>
            </td>
          </tr>
          ))}
        </tbody>
      </table>)}
      
    </div>
    </>
  );
}

export default MyInquiry;
