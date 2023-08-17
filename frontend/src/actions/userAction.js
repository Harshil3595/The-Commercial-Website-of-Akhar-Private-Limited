import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_SERVICE_REQUEST,
  LOAD_SERVICE_SUCCESS,
  LOAD_SERVICE_FAIL,
  CREATE_SERVICE_REQUEST,
  CREATE_SERVICE_SUCCESS,
  CREATE_SERVICE_FAIL,
  GET_INQUIRYS_SUCCESS,
  GET_INQUIRYS_FAIL,
  GET_INQUIRYS_REQUEST,
  ADMIN_INQUIRYS_REQUEST,
  ADMIN_INQUIRYS_SUCCESS,
  UPDATE_INQUIYT_REQUEST,
  UPDATE_INQUIYT_SUCCESS,
  UPDATE_INQUIYT_FAIL,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  GET_STATUS_REQUEST,
  GET_STATUS_SUCCESS,
  GET_STATUS_FAIL,
  CREATE_INQUIYT_REQUEST,
  CREATE_INQUIYT_SUCCESS,
  CREATE_INQUIYT_FAIL,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAIL,
  GET_INQUIYT_FOR_DISPLAY_REQUEST,
  GET_INQUIYT_FOR_DISPLAY_SUCCESS,
  GET_INQUIYT_FOR_DISPLAY_FAIL,
  SEND_EMAIL_STATUS_REQUEST,
  SEND_EMAIL_STATUS_SUCCESS,
  SEND_EMAIL_STATUS_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  GET_CLIENTS_REQUEST,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_FAIL,
  CREATE_CLIENT_REQUEST,
  CREATE_CLIENT_SUCCESS,
  CREATE_CLIENT_FAIL
} from "../constants/userConstans";

import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password },
      config
    );

    const token = data.token;

    localStorage.setItem("token", token);

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "http://localhost:5000/api/auth/password/forgot",
      { email },
      config
    );


    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message });
  }
};

export const resetPassword = (token,password,confirmPassword) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `http://localhost:5000/api/auth/password/reset/${token}`,
      { password ,confirmPassword},
      config
    );


    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");

    dispatch({ type: LOGOUT_SUCCESS });

  } catch (error) {
    console.error("Error while logging out:", error);
  }
};


export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post("http://localhost:5000/api/auth/register", userData, config);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("http://localhost:5000/api/auth/me", config);

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.message });
  }
};

export const getAllServices = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_SERVICE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.get("http://localhost:5000/api/auth/get-all-services", config);

    dispatch({ type: LOAD_SERVICE_SUCCESS, payload: data })

  }
  catch (error) {
    dispatch({ type: LOAD_SERVICE_FAIL, payload: error.message });
  }
}

export const getAllClients = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CLIENTS_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.get("http://localhost:5000/api/auth/all-clients", config);

    dispatch({ type: GET_CLIENTS_SUCCESS, payload: data.clients })

  }
  catch (error) {
    dispatch({ type: GET_CLIENTS_FAIL, payload: error.message });
  }
}

export const createService = (name, description, images) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SERVICE_REQUEST });

    const imageBlobs = images.map(dataURLtoBlob);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    imageBlobs.forEach((blob, index) => {
      formData.append("photos", blob, `photo${index}.png`);
    });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/auth/create-service",
      formData,
      config
    );

    dispatch({ type: CREATE_SERVICE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_SERVICE_FAIL, payload: error.message });
  }
};

// Function to convert Base64 to Blob
const dataURLtoBlob = (dataURL) => {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export const getAllInquirys = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_INQUIRYS_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    };

    const { data } = await axios.get("http://localhost:5000/api/inquiry/get-all-inquirys", config);

    dispatch({ type: ADMIN_INQUIRYS_SUCCESS, payload: data })

  }
  catch (error) {
    dispatch({ type: ADMIN_INQUIRYS_SUCCESS, payload: error.message });
  }
}

export const getMyInquirys = () => async (dispatch) => {
  try {
    dispatch({ type: GET_INQUIRYS_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("http://localhost:5000/api/inquiry/me", config);

    dispatch({ type: GET_INQUIRYS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_INQUIRYS_FAIL, payload: error.message });
  }
};

export const updateStatus = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_INQUIYT_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const requestData = { status: status };

    const { data } = await axios.put(
      `http://localhost:5000/api/auth/inquiries/${id}`,
      requestData,
      config
    );


    dispatch({ type: UPDATE_INQUIYT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_INQUIYT_FAIL, payload: error.message });
  }
};

export const createClient = (photos) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CLIENT_REQUEST });
    console.log(photos)
    const imageBlobs = photos.map(dataURLtoBlob);

    console.log("Photos",imageBlobs)
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };


    const { data } = await axios.post(
      `http://localhost:5000/api/auth/create-service`,
      {imageBlobs},
      config
    );

    console.log("responce is",data);


    dispatch({ type: CREATE_CLIENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_CLIENT_FAIL, payload: error.message });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_USERS_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };


    const { data } = await axios.get(
      `http://localhost:5000/api/auth/get-all-users`,
      config
    );


    dispatch({ type: GET_ALL_USERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_USERS_FAIL, payload: error.message });
  }
}

export const getStatus = () => async (dispatch) => {
  try {
    dispatch({ type: GET_STATUS_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };


    const { data } = await axios.get(
      `http://localhost:5000/api/auth/get-status`,
      config
    );

    console.log("Data is from api",data);

    dispatch({ type: GET_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_STATUS_FAIL, payload: error.message });
  }
}


export const createInquiry = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_INQUIYT_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/inquiry/create",
      formData,
      config
    );


    dispatch({ type: CREATE_INQUIYT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_INQUIYT_FAIL, payload: error.message });
  }
}

export const sendEmail = (email) => async (dispatch) => {
  try {
    dispatch({ type: SEND_EMAIL_REQUEST });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    };


    const { data } = await axios.post(
      "http://localhost:5000/api/auth/me/send-email",
      { email },
      config
    );


    dispatch({ type:SEND_EMAIL_SUCCESS , payload: data });
  } catch (error) {
    dispatch({ type: SEND_EMAIL_FAIL, payload: error.message });
  }
}

export const sendEmailWithStatus = (email, status) => async (dispatch) => {
  try {
    dispatch({ type: SEND_EMAIL_STATUS_REQUEST });

    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("data for send is",email,status)

    const { data } = await axios.post(
      'http://localhost:5000/api/auth/me/send-status-mail',
      { email, status },
      config
    );

    dispatch({ type: SEND_EMAIL_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SEND_EMAIL_STATUS_FAIL, payload: error.message });
  }
};


export const getInquiryForDisplay = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_INQUIYT_FOR_DISPLAY_REQUEST });
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    };

    const { data } = await axios.get(`http://localhost:5000/api/inquiry/admin/inquiry/${id}`, config);
    dispatch({ type: GET_INQUIYT_FOR_DISPLAY_SUCCESS, payload: data })

  }
  catch (error) {
    dispatch({ type: GET_INQUIYT_FOR_DISPLAY_FAIL, payload: error.message });
  }
}
