import React from "react";
import { shallow } from "enzyme";
import Header from "../Components/Header";
import "../setupTests";

describe("Header", () => {
  it("should run without crashing with isLoggedIn = false prop", () => {
    shallow(<Header isLoggedIn={false} />);
  });

  it("should run without crashing with isLoggedIn = true prop", () => {
    shallow(<Header isLoggedIn={true} />);
  });
});
