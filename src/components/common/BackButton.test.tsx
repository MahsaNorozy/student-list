import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BackButton from "./BackButton";

const goToListMock = vi.fn();

vi.mock("../../hooks/useStudentNavigation", () => ({
  useStudentNavigation: () => ({
    goToList: goToListMock,
  }),
}));

describe("BackButton", () => {
  beforeEach(() => {
    goToListMock.mockClear();
  });

  it("ruft goToList auf, wenn der Button geklickt wird", async () => {
    render(<BackButton />);
    const button = screen.getByRole("button", { name: /Zurück/i });
    await userEvent.click(button);
    expect(goToListMock).toHaveBeenCalled();
  });

  it("zeigt den Zurück-Text an", () => {
    render(<BackButton />);
    expect(screen.getByRole("button", { name: /Zurück/i })).toBeInTheDocument();
  });
});
