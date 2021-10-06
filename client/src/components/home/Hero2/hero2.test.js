import React from "react";
import renderer from "react-test-renderer";

import Hero2 from "./Hero2";

it("renders correctly", () => {
  const tree = renderer.create(<Hero2 />).toJSON();
  expect(tree).toMatchSnapshot();
});
