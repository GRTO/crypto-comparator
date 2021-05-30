import { createContext, Dispatch } from "react";

import { UserAction, UserStore } from "./types";

export const UserContext =
  createContext<
    { state: UserStore; dispatch: Dispatch<UserAction> } | undefined
  >(undefined);
