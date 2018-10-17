import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './utils';
import renderer from 'react-test-renderer'
import { safeName, getWeek } from './utils';

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

it('renders correctly lastweek', () => {
  const tree = renderer
    .create(<App week={52} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders correctly firstweek', () => {
  const tree = renderer
    .create(<App week={1} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test('weekCalc', () => {
  expect(getWeek(new Date('2018/10/17'))).toBe(42);
});

test('no swedish chars in safeName', () => {
  expect(safeName('åäöÅÄÖ')).toBe('aaoaao');
});