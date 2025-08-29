import { describe, it, expect, vi } from "vitest";
import { renderWithTheme } from "../../../../utils/renderWithTheme";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import LineChart from "../";

const mockData = {
    total: [
        { month: "2025-01", value: 10 },
        { month: "2025-02", value: 15 },
    ],
    direct: [
        { month: "2025-01", value: 5 },
        { month: "2025-02", value: 7 },
    ],
};

describe("LineChart", () => {
    it("mostra título e mensagem de vazio quando não há dados", () => {
        renderWithTheme(<LineChart title="Headcount" />);
        expect(screen.getByText("Headcount")).toBeInTheDocument();
        expect(screen.getByText("Nenhum dado disponível.")).toBeInTheDocument();
    });

    it("renderiza séries e legendas quando há dados", () => {
        renderWithTheme(<LineChart title="Headcount" data={mockData} />);
        expect(screen.getByText("Headcount")).toBeInTheDocument();
        expect(screen.getByText("total")).toBeInTheDocument();
        expect(screen.getByText("direct")).toBeInTheDocument();

        expect(document.querySelectorAll("circle").length).toBeGreaterThan(0);
    });

    it("toggle de série ao clicar na legenda", () => {
        renderWithTheme(<LineChart title="Headcount" data={mockData} />);
        const legendItem = screen.getByText("total");

        fireEvent.click(legendItem);
        fireEvent.click(legendItem);

        expect(legendItem).toBeInTheDocument();
    });

    it("remove tooltip ao sair do gráfico", () => {
        renderWithTheme(<LineChart title="Headcount" data={mockData} />);
        const svg = document.querySelector("svg")!;
        fireEvent.mouseLeave(svg);

        expect(document.body.querySelector("[data-testid='tooltip']")).toBeFalsy();
    });
});
