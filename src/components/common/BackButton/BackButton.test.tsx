import BackButton from "./BackButton";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const goToListMock = vi.fn();

vi.mock("../../../hooks/useStudentNavigation", () => ({
  useStudentNavigation: () => ({
    goToList: goToListMock,
  }),
}));

describe("BackButton", () => {
  beforeEach(() => {
    goToListMock.mockClear();
  });

  it("prüft den Aufruf der Navigationsfunktion bei Klick", async () => {
    render(<BackButton />);
    const button = screen.getByRole("button", { name: /Zurück/i });
    await userEvent.click(button);
    expect(goToListMock).toHaveBeenCalled();
  });

  it("prüft, ob der Zurück-Button im DOM vorhanden ist", () => {
    render(<BackButton />);
    expect(screen.getByRole("button", { name: /Zurück/i })).toBeInTheDocument();
  });
});
