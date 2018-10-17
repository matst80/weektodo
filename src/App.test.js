import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './utils';
import renderer from 'react-test-renderer'
import { safeName } from './utils';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
  const tree = renderer
    .create(<App />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test('weekCalc', () => {
  expect(new Date('2018/10/17').getWeek()).toBe(42);
});

test('no swedish chars in safeName',()=>{
  expect(safeName('åäöÅÄÖ')).toBe('aaoaao');
});