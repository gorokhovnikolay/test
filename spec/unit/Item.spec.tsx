import { render, screen, prettyDOM } from "@testing-library/react";
import { Item } from "src/components/Item";

describe("Элемент списка задач", () => {
  it("название не должно быть больше 32 символов", () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();
    const task: Task = {
      id: "1",
      header: "Купить печенье",
      done: false,
    };
    render(
      <Item
        id={task.id}
        header={task.header}
        done={task.done}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    );

    const label = screen.getByText("Купить печенье");
    expect(label.innerHTML.length < 32).toBe(true);
  });

  it("название не должно быть пустым", () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();
    const task: Task = {
      id: "1",
      header: "1",
      done: false,
    };
    render(
      <Item
        id={task.id}
        header={task.header}
        done={task.done}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    );

    const label = screen.getByTestId("item-label");
    expect(label.innerHTML.length === 0).not.toBe(true);
  });

  it("нельзя удалять невыполненные задачи", () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();
    const task: Task = {
      id: "1",
      header: "Купить печенье",
      done: false,
    };
    render(
      <Item
        id={task.id}
        header={task.header}
        done={task.done}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    );

    const buttonEl = screen.getByRole("button");
    expect(buttonEl).toBeDisabled();
  });
});
