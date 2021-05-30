import { UserActionType } from "./actions";

export type UserStore = {
  currentUser?: User;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export type UserAction = {
  type: UserActionType;
  state: UserStore;
};
