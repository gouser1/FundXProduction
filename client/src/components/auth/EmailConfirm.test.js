import React from 'react';
import renderer from 'react-test-renderer';

import EmailConfirm from './EmailConfirm';

it('renders correctly', () => {
  const tree = renderer.create(<EmailConfirm />).toJSON();
  expect(tree).toMatchSnapshot();
});
