import React from "react";
import { mount, shallow } from "enzyme";
import Navlink from "../Components/Navlink";
import "../setupTests";

// ** dispatch doesn't work **
const dispatch = jest.fn();
React.useContext = (() => dispatch) as <T>(context: React.Context<T>) => T;

describe("Navlink", () => {
  const wrapper = mount(<Navlink isLoggedIn={false} />);

  it("should run without crashing with a false prop", () => {
    shallow(<Navlink isLoggedIn={false} />);
  });

  it("should run without crashing with a true prop", () => {
    shallow(<Navlink isLoggedIn={true} />);
  });
});
