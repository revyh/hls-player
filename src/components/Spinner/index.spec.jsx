import React from 'react';
import {shallow} from 'enzyme';
import Spinner from '.';

it('should render', () => {
  expect(shallow(<Spinner className="some-class" active />)).toMatchSnapshot();
});
