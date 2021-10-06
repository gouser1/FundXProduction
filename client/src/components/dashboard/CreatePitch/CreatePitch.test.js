import React from "react";
import renderer from "react-test-renderer";

import CreatePitch from "./CreatePitch";

it("renders correctly", () => {
  const tree = renderer.create(<CreatePitch />).toJSON();
  expect(tree).toMatchSnapshot();
});
