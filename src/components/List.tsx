import { useSelector } from "react-redux";
import { Item } from "./Item";
import { filterSelector } from "src/store/taskSlice";

type Props = {
  items: Task[];
  onDelete: (id: Task["id"]) => void;
  onToggle: (id: Task["id"]) => void;
  isFilter: boolean;
};

export const List = ({ isFilter, items, onDelete, onToggle }: Props) => {
  const itemsList = isFilter
    ? items.filter((item) => item.done === false)
    : items;

  return (
    <ul className="task-list tasks">
      {itemsList.map((item) => (
        <Item {...item} key={item.id} onDelete={onDelete} onToggle={onToggle} />
      ))}
    </ul>
  );
};
