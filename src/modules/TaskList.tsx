import { useDispatch, useSelector } from "react-redux";
import { Empty } from "src/components/Empty";
import { FilterButton } from "src/components/FilterButton";
import { List } from "src/components/List";
import {
  deleteTask,
  filterSelector,
  filterTask,
  tasksSelector,
  toggleTask,
} from "src/store/taskSlice";

export const TaskList = () => {
  const items = useSelector(tasksSelector);
  const isFilter = useSelector(filterSelector);
  const dispatch = useDispatch();

  const handleDelete = (id: Task["id"]) => {
    dispatch(deleteTask(id));
  };

  const handleToggle = (id: Task["id"]) => {
    dispatch(toggleTask(id));
  };
  const handleFilter = () => {
    dispatch(filterTask());
  };

  return (
    <>
      <FilterButton handleFilter={handleFilter} />
      {items.length > 0 ? (
        <List
          isFilter={isFilter}
          items={items}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      ) : (
        <Empty />
      )}
    </>
  );
};
