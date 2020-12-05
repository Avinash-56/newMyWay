import { Fade } from "react-bootstrap";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  UPDATE_SIGNUP,
  UPDATE_LOGIN,
  REGISTER_SUCCESS,
} from "../actions/types";

const initialState = {
  user: null,
  login: false,
  signup: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: payload,
      };

    case UPDATE_LOGIN:
      return {
        ...state,
        login: !state.login,
      };
    case UPDATE_SIGNUP:
      return {
        ...state,
        login: !state.login,
      };

    default:
      return state;
  }
}
