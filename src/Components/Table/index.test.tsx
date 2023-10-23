import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LogTable } from ".";
import { logs } from "../../MockObjects/logs";

test("Displays data", () => {
  render(<LogTable />);

  const tableHeader = screen.getByTestId("table-header-row");
  expect(tableHeader).toBeInTheDocument();
});

test("Renders given rows", () => {
  render(<LogTable logs={logs} />);

  const dataRow = screen.getAllByTestId("os-table-cell");
  expect(dataRow).toHaveLength(15);
});

export {};
