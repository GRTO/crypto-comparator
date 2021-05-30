import { useContext } from "react";
import { UserActionType } from "../store/user/actions";
import { User } from "../store/user/types";
import { UserContext } from "../store/user/UserContext";

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error(
      "UserContext should not be used outside useUser custom hook"
    );
  }

  const { state, dispatch } = context;

  const addUser = (currentUser: User) => {
    dispatch({
      type: UserActionType.ADD_USER,
      state: { ...state, currentUser },
    });
  };

  return {
    addUser,
    user: state.currentUser,
  };
};
