import React from "react";
import renderer from "react-test-renderer";

import Support from "./Support";

it("renders correctly", () => {
  const tree = renderer.create(<Support />).toJSON();
  expect(tree).toMatchSnapshot();
});
