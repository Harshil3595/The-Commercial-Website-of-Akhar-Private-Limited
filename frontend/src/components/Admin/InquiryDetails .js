import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInquiryForDisplay } from "../../actions/userAction";
import { useParams } from "react-router-dom";

function InquiryDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { inquiry } = useSelector((state) => state.inquiry);
  useEffect(() => {
    if (id) {
      dispatch(getInquiryForDisplay(id));
    }
  }, [dispatch, id]);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "30px",
  };

  const tableStyle = {
    width: "70%",
    textAlign: "left",
  };

  const tableHeadStyle = {
    background: "#f2f2f2",
    fontWeight: "bold",
  };

  const labelStyle = {
    fontWeight: "bold",
  };

  const tableCellContentStyle = {
    wordWrap: "break-word",
    maxWidth: "400px", // Adjust this value as needed
  };

  return (
    <div style={containerStyle}>
      <h2>Inquiry Details</h2>
      {inquiry ? (
        <table className="table" style={tableStyle}>
          <tbody>
            <tr>
              <td style={tableHeadStyle}>Name:</td>
              <td>
                <div style={tableCellContentStyle}>{inquiry[0]?.name}</div>
              </td>
            </tr>
            <tr>
              <td style={tableHeadStyle}>Email:</td>
              <td>
                <div style={tableCellContentStyle}>{inquiry[0]?.email}</div>
              </td>
            </tr>
            <tr>
              <td style={tableHeadStyle}>Name of Part:</td>
              <td>
                <div style={tableCellContentStyle}>{inquiry[0]?.NameOfPart}</div>
              </td>
            </tr>
            <tr>
              <td style={tableHeadStyle}>Description:</td>
              <td>
                <div style={tableCellContentStyle}>{inquiry[0]?.description}</div>
              </td>
            </tr>
            <tr>
              <td style={tableHeadStyle}>Status:</td>
              <td>
                <div style={tableCellContentStyle}>{inquiry[0]?.status}</div>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default InquiryDetails;
