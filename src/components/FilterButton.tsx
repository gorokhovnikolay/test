type Props = {
  handleFilter: () => void;
};

export const FilterButton = ({ handleFilter }: Props) => {
  return (
    <button onClick={handleFilter} data-testid="btn-filter">
      Фильтровать
    </button>
  );
};
