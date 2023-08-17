import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_SERVICE_REQUEST,
  LOAD_SERVICE_SUCCESS,
  LOAD_SERVICE_FAIL,
  CLEAR_ERROR,
  CREATE_SERVICE_REQUEST,
  CREATE_SERVICE_FAIL,
  CREATE_SERVICE_SUCCESS,
  GET_INQUIRYS_REQUEST,
  ADMIN_INQUIRYS_REQUEST,
  GET_INQUIRYS_SUCCESS,
  ADMIN_INQUIRYS_SUCCESS,
  ADMIN_INQUIRYS_FAIL,
  GET_INQUIRYS_FAIL,
  CREATE_INQUIYT_REQUEST,
  CREATE_INQUIYT_SUCCESS,
  CREATE_INQUIYT_FAIL,
  UPDATE_INQUIYT_REQUEST,
  UPDATE_INQUIYT_SUCCESS,
  UPDATE_INQUIYT_FAIL,
  UPDATE_INQUIYT_RESET,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  GET_STATUS_REQUEST,
  GET_STATUS_SUCCESS,
  GET_STATUS_FAIL,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAIL,
  CREATE_INQUIYT_RESET,
  GET_INQUIYT_FOR_DISPLAY_REQUEST,
  GET_INQUIYT_FOR_DISPLAY_SUCCESS,
  GET_INQUIYT_FOR_DISPLAY_FAIL,
  SEND_EMAIL_STATUS_REQUEST,
  SEND_EMAIL_STATUS_SUCCESS,
  SEND_EMAIL_STATUS_FAIL,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_FAIL,
  GET_CLIENTS_REQUEST,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_FAIL,
  CREATE_CLIENT_REQUEST,
  CREATE_CLIENT_SUCCESS,
  CREATE_CLIENT_FAIL,
} from "../constants/userConstans";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };

    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const serviceReducer = (state = { services: [] }, action) => {
  switch (action.type) {
    case LOAD_SERVICE_REQUEST:
      return {
        loading: true,
        service: [],
      };
    case LOAD_SERVICE_SUCCESS:
      return {
        loading: false,
        services: action.payload.services,
      };
    case LOAD_SERVICE_FAIL:
      return {
        loading: false,
        error: action.payload.error,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newServiceReducer = (state = { service: {} }, action) => {
  switch (action.type) {
    case CREATE_SERVICE_REQUEST:
      return {
        ...state,
        loading: false,
        isCreated: false,
      };
    case CREATE_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        isCreated: true,
        success: action.payload.success,
        service: action.payload.service,
      };
    case CREATE_SERVICE_FAIL:
      return {
        loading: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const inquiryReducer = (state = { inquirys: [] }, action) => {
  switch (action.type) {
    case GET_INQUIRYS_REQUEST:
    case ADMIN_INQUIRYS_REQUEST:
      return {
        loading: true,
        inquirys: [],
      };
    case GET_INQUIRYS_SUCCESS:
    case ADMIN_INQUIRYS_SUCCESS:
      return {
        loading: false,
        inquirys: action.payload.inquirys,
      };
    case GET_INQUIRYS_FAIL:
    case ADMIN_INQUIRYS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newInquiryReducer = (state = { inquiry: {} }, action) => {
  switch (action.type) {
    case CREATE_INQUIYT_REQUEST:
    case GET_INQUIYT_FOR_DISPLAY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_INQUIYT_SUCCESS:
    case GET_INQUIYT_FOR_DISPLAY_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        inquiry: action.payload.inquiry,
      };
    case CREATE_INQUIYT_FAIL:
    case GET_INQUIYT_FOR_DISPLAY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_INQUIYT_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const updatetinquiryReducer = (state = { updatedData: {} }, action) => {
  switch (action.type) {
    case UPDATE_INQUIYT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_INQUIYT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        updatedData: action.payload,
      };
    case UPDATE_INQUIYT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_INQUIYT_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const usersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST:
      return {
        loading: true,
        users: [],
      };

    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case GET_ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        users: null,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getStatusReducer = (state = { status: {} }, action) => {
  switch (action.type) {
    case GET_STATUS_REQUEST:
      return {
        loading: true,
      };

    case GET_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        status: action.payload,
      };
    case GET_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const sendEmailReducer = (state = { email: {} }, action) => {
  switch (action.type) {
    case SEND_EMAIL_REQUEST:
    case SEND_EMAIL_STATUS_REQUEST:
      return {
        loading: true,
      };

    case SEND_EMAIL_SUCCESS:
    case SEND_EMAIL_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        email: action.payload,
      };
    case SEND_EMAIL_FAIL:
    case SEND_EMAIL_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success:false
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
      };

    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const clientReducer = (state = { clients: [] },action) =>{
  switch (action.type) {
    case GET_CLIENTS_REQUEST:
      return {
        loading: true,
        clients: [],
      };

    case GET_CLIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        clients: action.payload,
      };
    case GET_CLIENTS_FAIL:
      return {
        ...state,
        loading: false,
        clients: null,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}


export const createClientReducer = (state = {},action) =>{
  switch (action.type) {
    case CREATE_CLIENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        client: action.payload,
      };
    case CREATE_CLIENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

