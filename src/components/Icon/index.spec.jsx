import React from 'react';
import {shallow} from 'enzyme';
import Icon from '.';

jest.mock('./symbols', () => ({someSymbol: '/icons.svg#someSymbol'}));

it('should render', () => {
  expect(shallow(<Icon symbol="someSymbol" />)).toMatchSnapshot();
});

it('should trigger \'onClick\' event handler', () => {
  const mockOnClick = jest.fn();
  const icon = shallow(
    <Icon symbol="someSymbol" onClick={mockOnClick} />,
  );

  icon.simulate('click');

  expect(mockOnClick).toHaveBeenCalled();
});
