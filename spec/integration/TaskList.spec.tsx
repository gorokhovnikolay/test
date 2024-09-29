import { render, screen } from "@testing-library/react";
import ue from "@testing-library/user-event";
import { App } from "src/App";

describe("Добавление задачь", () => {
  const userEvent = ue.setup({
    advanceTimers: jest.advanceTimersByTime,
  });
  it("нельзя добавить более 10 невыполненных задачь", async () => {
    const { container } = render(<App />);
    const input = screen.getByAltText("поле для ввода заголовка задачи");
    const btn = container.querySelector("[data-alt='добавить задачу']");
    for (let i = 0; i < 10; i++) {
      await userEvent.clear(input);
      await userEvent.type(input, `${i}`);
      if (btn) {
        await userEvent.click(btn);
      }
    }
    await userEvent.type(input, `тест`);
    expect(btn).toBeDisabled();
  });
});
