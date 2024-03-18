import {
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
} from "./userActionType";

const initialState = {
  user: null,
  isLoading: false,
  success: null,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { ...state, isLoading: true, success: null };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        success: "Logged in successfully",
        error: null,
      };

    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        success: null,
        error: action.payload,
      };

    case "LOGOUT":
      return initialState;

    default:
      return state;
  }
};
