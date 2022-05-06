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

test('Cleared everything out', () => {
  render(<App />)

  const adding = screen.getByText('Add');
  const clearing = screen.getByText('Clear');
  const desc = screen.getByPlaceholderText('Description');
  const date = screen.getByPlaceholderText('Date');

  fireEvent.change(desc, { target: { value: 'Cooking' }});
  fireEvent.change(date, { target: { value: '10.02.2020' }});
  fireEvent.click(adding);

  fireEvent.change(desc, { target: { value: 'Zoom meeting' }});
  fireEvent.change(date, { target: { value: '15.04.2020' }});
  fireEvent.click(adding);

  fireEvent.change(desc, { target: { value: 'Drinking tea' }});
  fireEvent.change(date, { target: { value: '01.10.2021' }});
  fireEvent.click(adding);

  fireEvent.change(desc, { target: { value: 'Washing windows' }});
  fireEvent.change(date, { target: { value: '25.07.2021' }});
  fireEvent.click(adding);

  fireEvent.click(clearing);

  const row = screen.queryByText(/Washing windows/i);
  expect(row).not.toBeInTheDocument;
})
