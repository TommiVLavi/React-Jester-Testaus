import '@testing-library/jest-dom/extend-expect'
import { render, screen } from "@testing-library/react"
import Table from "./TodoTable"

test('rendering', () => {
  const row = [{desc: 'Wash your windows', 
                date: '12.5.2021'}];  
    render(<Table todos={row} />);
    const cell = screen.getByText(/Wash your windows/i);
    expect(cell).toBeInTheDocument();
})