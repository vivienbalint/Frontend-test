type User =
  | {
      email: string;
      username: string;
    }
  | undefined;

type State = {
  isAuthenticated: boolean;
  user: User;
  token: string;
};

export const initialState: State = {
  isAuthenticated: false,
  user: undefined,
  token: "",
};

export type Action =
  | {
      type: "LOGIN";
      payload: any;
    }
  | { type: "LOGOUT" }
  | {
      type: "UPDATE_PROFILE";
      payload: any;
    };

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      sessionStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      sessionStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
      };
    case "UPDATE_PROFILE":
      sessionStorage.clear();
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      sessionStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    default:
      return state;
  }
};
