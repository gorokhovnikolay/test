import { render, screen } from "@testing-library/react";
import { App } from "src/App";
import ue from "@testing-library/user-event";

describe("Оповещение при вополнении задачи", () => {
  const userEvent = ue.setup({
    advanceTimers: jest.advanceTimersByTime,
  });

  it("появляется и содержит заголовок задачи", async () => {
    const { container } = render(<App />);
    const inputTitle = screen.getByTestId("input-field");
    const addBtn = container.querySelector('[data-alt="добавить задачу"]');
    await userEvent.clear(inputTitle);
    await userEvent.type(inputTitle, "Hello world");
    if (addBtn) {
      await userEvent.click(addBtn);
    }
    const check = screen.getByTestId("test-checkbox");
    await userEvent.click(check);

    screen.debug();

    const notifier = container.querySelector(".notifier-wrapper");
    const title = screen.getByText('Задача "Hello world" завершена');

    expect(title).toBeInTheDocument();
  });

  it.skip("одновременно может отображаться только одно", async () => {
    const { container } = render(<App />);
    const inputTitle = screen.getByTestId("input-field");
    const addBtn = container.querySelector('[data-alt="добавить задачу"]');
    await userEvent.clear(inputTitle);
    await userEvent.type(inputTitle, "Hello world");
    if (addBtn) {
      await userEvent.click(addBtn);
    }
    await userEvent.clear(inputTitle);
    await userEvent.type(inputTitle, "Hello world");
    if (addBtn) {
      await userEvent.click(addBtn);
    }
    const check = screen.getAllByTestId("test-checkbox");
    await userEvent.click(check[0]);
    await userEvent.click(check[1]);

    const notifier = container.querySelectorAll(".notifier-wrapper");

    expect(notifier.length).toBe(1);
  });
});
