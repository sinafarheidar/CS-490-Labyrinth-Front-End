import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { FileEditor } from "./FileEditor";
import { fileOptions } from "../../MockObjects/fileEditor";

const mockUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUsedNavigate,
}));

test("Displays dropdown", () => {
  render(
    <FileEditor
      fileOptions={fileOptions}
      fileContent=""
      handleSelectNewFile={jest.fn()}
      handleEditFile={jest.fn()}
      handleKeyValidation={jest.fn()}
      updatePathKey={jest.fn()}
      updatedFile={true}
    />
  );

  const dropdown = screen.getByTestId("dropdown");
  expect(dropdown).toBeInTheDocument();
});

export {};
