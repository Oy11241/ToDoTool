import { FILTERS } from "../../constants";
import { Filter } from "../../types";

type TodoFilterProps = {
  currentFilter: Filter;
  onFilterChange: (filter: Filter) => void;
};

export const TodoFilter = ({ currentFilter, onFilterChange }: TodoFilterProps) => {
  return (
    <select
      value={currentFilter}
      onChange={(e) => onFilterChange(e.target.value as Filter)}
    >
      {FILTERS.map((filter) => (
        <option key={filter.value} value={filter.value}>
          {filter.label}
        </option>
      ))}
    </select>
  );
};