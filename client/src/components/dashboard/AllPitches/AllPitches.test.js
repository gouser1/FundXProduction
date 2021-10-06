import React from "react";
import renderer from "react-test-renderer";

import AllPitches from "./AllPitches";

it("renders correctly", () => {
  const tree = renderer.create(<AllPitches />).toJSON();
  expect(tree).toMatchSnapshot();
});
