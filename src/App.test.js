import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('Adding something', () => {
  render(<App />);

  const desc = screen.getByPlaceholderText('Description');
  fireEvent.change(desc, { target: { value: 'See you soon!' }});
  const date = screen.getByPlaceholderText('Date');
  fireEvent.change(date, { target: { value: '27.09.2022' }});

  const pressing = screen.getByText('Add');
  fireEvent.click(pressing);

  const cell = screen.getByText(/See you soon!/i);
  expect(cell).toBeInTheDocument();
})
