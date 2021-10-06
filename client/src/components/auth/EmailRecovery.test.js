import React from 'react';
import renderer from 'react-test-renderer';

import EmailRecovery from './EmailRecovery';

it('renders correctly', () => {
  const tree = renderer.create(<EmailRecovery />).toJSON();
  expect(tree).toMatchSnapshot();
});
