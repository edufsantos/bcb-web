import { User } from "@interfaces/models/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRootState } from "../store";

export interface IUserDataRedux {
  currentUser: User | undefined;
}

export const initialState: IUserDataRedux = {
  currentUser: undefined,
};

export const slice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    changeCurrentUser: (_, action: PayloadAction<User>) => {
      return { currentUser: action.payload };
    },
    changePlanId: (state, action: PayloadAction<string>) => {
      if (state.currentUser?.isCustomer) {
        return {
          currentUser: {
            ...state.currentUser,
            customerData: {
              ...state.currentUser.customerData,
              posPaidPlanId: action.payload,
            },
          },
        };
      }
      return state;
    },
    clearUserData() {
      return initialState;
    },
  },
});

export const { changeCurrentUser, clearUserData, changePlanId } = slice.actions;

export const selectionUserData = (state: IRootState): IUserDataRedux =>
  state.userData;

export default slice.reducer;
