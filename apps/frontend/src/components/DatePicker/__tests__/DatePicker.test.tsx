import { describe, it, expect, vi } from "vitest";
import { fireEvent, screen } from "@testing-library/react";
import { renderWithTheme } from "../../../utils/renderWithTheme";
import { DatePicker } from "../";

describe("DatePicker", () => {
  it("renderiza no modo dropdown com trigger", () => {
    renderWithTheme(<DatePicker />);
    expect(screen.getByTestId("datepicker-trigger")).toBeInTheDocument();
  });

  it("abre e fecha popover ao clicar no trigger", () => {
    renderWithTheme(<DatePicker />);
    const trigger = screen.getByTestId("datepicker-trigger");

    fireEvent.click(trigger);
    expect(screen.getByTestId("datepicker-popover")).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.queryByTestId("datepicker-popover")).not.toBeInTheDocument();
  });

  it("renderiza no modo inline direto com calendários", () => {
    renderWithTheme(<DatePicker variant="inline" />);
    expect(screen.getByTestId("datepicker")).toBeInTheDocument();
    expect(screen.getByTestId("datepicker-shortcuts")).toBeInTheDocument();
  });

  it("chama onChange no modo single", () => {
    const onChange = vi.fn();
    renderWithTheme(<DatePicker mode="single" onChange={onChange} />);
    const trigger = screen.getByTestId("datepicker-trigger");

    fireEvent.click(trigger);
    const shortcut = screen.getByTestId("datepicker-shortcut-thisMonth");
    fireEvent.click(shortcut);

    expect(onChange).toHaveBeenCalled();
    expect(screen.queryByTestId("datepicker-popover")).not.toBeInTheDocument();
  });

  it("chama onChange no modo range", () => {
    const onChange = vi.fn();
    renderWithTheme(<DatePicker mode="range" onChange={onChange} />);
    const trigger = screen.getByTestId("datepicker-trigger");

    fireEvent.click(trigger);
    const shortcut = screen.getByTestId("datepicker-shortcut-thisYear");
    fireEvent.click(shortcut);

    expect(onChange).toHaveBeenCalledWith(expect.arrayContaining([expect.any(String), expect.any(String)]));
  });

  it("limpa valores quando allowClear está ativo", () => {
    const onChange = vi.fn();
    renderWithTheme(
      <DatePicker
        mode="single"
        allowClear
        defaultValue="2025-01-01"
        onChange={onChange}
      />
    );

    const clearBtn = screen.getByTestId("datepicker-clear-button");
    expect(clearBtn).toBeInTheDocument();

    fireEvent.click(clearBtn);
    expect(onChange).toHaveBeenCalledWith("");
  });

  it("não mostra ícone quando showIcon = false", () => {
    renderWithTheme(<DatePicker showIcon={false} />);
    const trigger = screen.getByTestId("datepicker-trigger");
    expect(trigger.querySelector("svg")).toBeNull();
  });
});
