import React from "react";
import renderer from "react-test-renderer";

import AdminPanel from "./AdminPanel";

it("renders correctly", () => {
  const tree = renderer.create(<AdminPanel />).toJSON();
  expect(tree).toMatchSnapshot();
});
