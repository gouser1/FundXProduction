import React from "react";
import renderer from "react-test-renderer";

import Faq from "./Faq";

it("renders correctly", () => {
  const tree = renderer.create(<Faq />).toJSON();
  expect(tree).toMatchSnapshot();
});
