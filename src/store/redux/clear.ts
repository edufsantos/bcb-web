/* eslint-disable react-hooks/rules-of-hooks */
import LOCAL_STORAGE_KEYS from "@constants/localStorage";
import { useDispatch } from "react-redux";
import { clearUserData } from "./reducers/userDataReducer";

export const clearRedux = () => {
  const dispatch = useDispatch();
  localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  dispatch(clearUserData);
};
