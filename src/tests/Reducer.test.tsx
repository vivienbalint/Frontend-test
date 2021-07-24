import "../setupTests";
import { reducer, Action } from "../auth/auth.reducer";

it("return new state for login type", () => {
  const initialState = {
    isAuthenticated: false,
    user: {
      username: "",
      email: "",
    },
    token: "",
  };
  const loginAction: Action = {
    type: "LOGIN",
    payload: {
      isAuthenticated: true,
      user: {
        username: "someUsername",
        email: "someEmail",
      },
      token: "someToken",
    },
  };
  const loggedInState = reducer(initialState, loginAction);
  expect(loggedInState).toEqual({
    isAuthenticated: true,
    user: {
      username: "someUsername",
      email: "someEmail",
    },
    token: "someToken",
  });
});
