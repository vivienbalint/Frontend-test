import React from "react";
import { mount, shallow } from "enzyme";
import Login from "../Components/Login";
import "../setupTests";

const dispatch = jest.fn();
React.useContext = (() => dispatch) as <T>(context: React.Context<T>) => T;

describe("Login", () => {
  const wrapper = mount(<Login />);

  it("should run without crashing", () => {
    shallow(<Login />);
  });

  it("should match the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should have an email field", () => {
    expect(wrapper.find('input[type="email"]').length).toEqual(1);
  });

  it("should have proper props for email field", () => {
    expect(wrapper.find('input[type="email"]').props()).toEqual({
      className: "form-control form-control-lg",
      id: undefined,
      readOnly: undefined,
      size: undefined,
      type: "email",
      placeholder: "Enter email address",
      value: expect.any(String),
      onChange: expect.any(Function),
    });
  });

  it("should have a password field", () => {
    expect(wrapper.find('input[type="password"]').length).toEqual(1);
  });

  it("should have proper props for password field", () => {
    expect(wrapper.find('input[type="password"]').props()).toEqual({
      className: "form-control form-control-lg",
      id: undefined,
      readOnly: undefined,
      size: undefined,
      type: "password",
      placeholder: "Password",
      value: expect.any(String),
      onChange: expect.any(Function),
      autoComplete: "true",
    });
  });

  it("should have a submit button", () => {
    expect(wrapper.find('button[type="submit"]').length).toEqual(1);
  });

  it("should have proper props for submit button", () => {
    expect(wrapper.find('button[type="submit"]').props()).toEqual({
      className: "btn btn-primary",
      disabled: false,
      type: "submit",
      children: "Login",
    });
  });
});
