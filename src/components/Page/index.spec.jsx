import React from 'react';
import {shallow} from 'enzyme';
import Page from '.';

it('should render', () => {
  expect(shallow(<Page>some content</Page>)).toMatchSnapshot();
});
