import { toast } from "react-toastify";
import axiosInstance from "../../utils/axios-connect";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
} from "./userActionType";

export const loginUser = (reqData, navigate) => async (dispatch) => {
  dispatch({ type: LOGIN_USER_REQUEST });

  try {
    const { email, password } = reqData;

    const { data } = await axiosInstance.get(`/users`);

    const user = data.find((user) => user.email === email);

    if (user && user.password === password) {
      dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
      console.log("Login successful:", user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/home");
      toast.success("Login successful");
    } else {
      dispatch({
        type: LOGIN_USER_FAILURE,
        payload: "Invalid email or password",
      });
      toast.error("Invalid email or password");
      console.log("Invalid email or password");
    }
  } catch (error) {
    dispatch({ type: LOGIN_USER_FAILURE, payload: error.message });
    toast.error("Invalid email or password");
    console.log("Error:", error.message);
  }
};

export const getUser = (userId) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  try {
    let { data } = await axiosInstance.get(`/users/${userId}`);

    dispatch({ type: GET_USER_SUCCESS, payload: data });
    console.log("get user success: ", data);
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error });
    console.log("error: ", error);
  }
};
