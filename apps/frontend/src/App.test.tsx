import { render, screen } from "@testing-library/react";

function App() {
    return <h1>People Analytics KPIs</h1>;
}

test("renders app title", () => {
    render(<App />);
    expect(screen.getByText(/People Analytics KPIs/i)).toBeInTheDocument();
});
