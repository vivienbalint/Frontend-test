import React from "react";
import { mount } from "enzyme";
import ArticleCard from "../Components/ArticleCard";
import "../setupTests";

describe("Article Card with isDisabled = true prop", () => {
  const propTitle = "An article";
  const propDesc = "A description";
  const propBody = "A long text";
  const propSlug = "A slug";
  const propIsDisabled = true;

  const wrapper = mount(
    <ArticleCard
      title={propTitle}
      description={propDesc}
      body={propBody}
      slug={propSlug}
      isDisabled={propIsDisabled}
    />
  );

  it("should accept propTitle", () => {
    expect(wrapper.props().title).toEqual(propTitle);
  });

  it("should accept propDesc", () => {
    expect(wrapper.props().description).toEqual(propDesc);
  });

  it("should accept propBody", () => {
    expect(wrapper.props().body).toEqual(propBody);
  });

  it("should accept propSlug", () => {
    expect(wrapper.props().slug).toEqual(propSlug);
  });

  it("should accept propIsDisabled", () => {
    expect(wrapper.props().isDisabled).toEqual(propIsDisabled);
  });

  it("should match the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it("should not have a link", () => {
    expect(wrapper.find("a").length).toEqual(0);
  });
});
