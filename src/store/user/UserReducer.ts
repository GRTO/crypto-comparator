import { Reducer } from "react";
import { UserActionType } from "./actions";
import { UserAction, UserStore } from "./types";

export const UserReducer: Reducer<UserStore, UserAction> = (state, action) => {
  switch (action.type) {
    case UserActionType.ADD_USER:
    case UserActionType.RESET_USER:
      return { ...state, ...action.state };
    default:
      return state;
  }
};
