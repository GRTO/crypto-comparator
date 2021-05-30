import { FC, useReducer, Reducer } from "react";
import { UserAction, UserStore } from "./types";
import { UserContext } from "./UserContext";
import { UserReducer } from "./UserReducer";

export const UserProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<UserStore, UserAction>>(
    UserReducer,
    {}
  );

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
