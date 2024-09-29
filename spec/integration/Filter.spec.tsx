import { render, screen, prettyDOM } from "@testing-library/react";
import ue from "@testing-library/user-event";
import { App } from "src/App";

const userEvent = ue.setup({
  advanceTimers: jest.advanceTimersByTime,
});

describe("Список задач", () => {
  // не содержит выполненные задачи
  // после нажатия на кнопку фильтрации
  it("с включенным фильтром", async () => {
    render(<App />);
    const input = screen.getByTestId("input-field");
    const addBtn = screen.getByAltText("Добавить");
    await userEvent.clear(input);
    await userEvent.type(input, "Привет");
    await userEvent.click(addBtn);
    await userEvent.clear(input);
    await userEvent.type(input, "Привет2");
    await userEvent.click(addBtn);

    const checkBtn = screen.getAllByTestId("test-checkbox")[0];

    await userEvent.click(checkBtn);
    const filterBtn = screen.getByTestId("btn-filter");
    await userEvent.click(filterBtn);
    const itemList = screen.getAllByTestId("item-wrapper");
    expect(itemList).toHaveLength(1);
  });

  // показывает как выполненные, так и не выполненные задачи
  // после повторного нажатия на кнопку фильтрации
  it("с выключенным фильтром", async () => {
    render(<App />);
    const input = screen.getByTestId("input-field");
    const addBtn = screen.getByAltText("Добавить");
    await userEvent.clear(input);
    await userEvent.type(input, "Привет");
    await userEvent.click(addBtn);
    await userEvent.clear(input);
    await userEvent.type(input, "Привет2");
    await userEvent.click(addBtn);

    const checkBtn = screen.getAllByTestId("test-checkbox")[0];

    await userEvent.click(checkBtn);
    const filterBtn = screen.getByTestId("btn-filter");
    await userEvent.click(filterBtn);
    await userEvent.click(filterBtn);
    const itemList = screen.getAllByTestId("item-wrapper");
    expect(itemList).toHaveLength(2);
  });
});
