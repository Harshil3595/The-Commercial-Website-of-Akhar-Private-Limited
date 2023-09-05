import React, { useEffect, useState } from 'react';
import { useParams ,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendEmailWithStatus, updateStatus } from '../../actions/userAction';
import Success from '../success/Success'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UPDATE_INQUIYT_RESET } from '../../constants/userConstans';

const UpdateStatus = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedStatus, setSelectedStatus] = useState('pending');
  const navigate = useNavigate(); 


  const { success, loading ,updatedData} = useSelector((state) => state.updatedData);
  const {user}=useSelector((state)=>state.user);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateStatus(id, selectedStatus));
  };

  useEffect(() => {
    if (success) {
      toast.success('Status Updated successfully', {
        className: 'custom-toast-success',
      });
      dispatch(sendEmailWithStatus(user.email,updatedData.status));
      dispatch({ type: UPDATE_INQUIYT_RESET });
      navigate('/admin/inquirys'); 
    }
  }, [success, dispatch, navigate]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Update Inquiry Status</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="status">Select Status:</label>
                  <select
                    id="status"
                    className="form-control"
                    value={selectedStatus}
                    onChange={handleStatusChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="viewed">Viewed</option>
                    <option value="done">Done</option>
                  </select>
                </div>
                <div className="text-center my-4">
                  <button type="submit" className="btn btn-primary">
                    Update Status
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatus;
