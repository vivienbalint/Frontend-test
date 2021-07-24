import React from "react";
import { shallow } from "enzyme";
import App from "../App";
import "../setupTests";

it("should run without crashing", () => {
  shallow(<App />);
});
