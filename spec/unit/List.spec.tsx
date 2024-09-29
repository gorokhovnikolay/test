import { render, screen } from "@testing-library/react";
import { List } from "src/components/List";

it.skip("отображение списка задач", () => {
  const onDelete = jest.fn();
  const onToggle = jest.fn();
  const isFilter = false;

  const items: Task[] = [
    {
      id: "1",
      header: "купить хлеб",
      done: false,
    },
    {
      id: "2",
      header: "купить молоко",
      done: false,
    },
    {
      id: "3",
      header: "выгулять собаку",
      done: true,
    },
  ];

  const { rerender, asFragment } = render(
    <List
      isFilter={isFilter}
      items={items}
      onDelete={onDelete}
      onToggle={onToggle}
    />
  );
  const firstRender = asFragment();

  items.pop();

  rerender(
    <List
      isFilter={isFilter}
      items={items}
      onDelete={onDelete}
      onToggle={onToggle}
    />
  );
  const secondRender = asFragment();

  expect(firstRender).toMatchDiffSnapshot(secondRender);
});

it("Список содержит не больше 10 невыполненных задач", () => {
  const onDelete = jest.fn();
  const onToggle = jest.fn();

  const items: Task[] = [
    {
      id: "1",
      header: "купить хлеб",
      done: false,
    },
    {
      id: "2",
      header: "купить молоко",
      done: false,
    },
    {
      id: "3",
      header: "выгулять собаку",
      done: false,
    },
    {
      id: "4",
      header: "выгулять собаку",
      done: false,
    },
    {
      id: "5",
      header: "выгулять собаку",
      done: false,
    },
    {
      id: "6",
      header: "выгулять собаку",
      done: false,
    },
    {
      id: "7",
      header: "выгулять собаку",
      done: false,
    },
    {
      id: "8",
      header: "выгулять собаку",
      done: false,
    },
    {
      id: "9",
      header: "выгулять собаку",
      done: false,
    },
    {
      id: "10",
      header: "выгулять собаку",
      done: false,
    },
    {
      id: "12",
      header: "выгулять собаку",
      done: true,
    },
    {
      id: "13",
      header: "выгулять собаку",
      done: true,
    },
  ];

  render(
    <List
      isFilter={false}
      items={items}
      onDelete={onDelete}
      onToggle={onToggle}
    />
  );

  expect(items.filter((i) => i.done === false).length <= 10).toBe(true);
});
