import { FILTERS } from "../../constants";
import { Filter } from "../../types";

/**
 * TodoFilterコンポーネントのProps
 */
type TodoFilterProps = {
  /** 現在選択中のフィルター */
  currentFilter: Filter;
  /** フィルター変更時の処理  */
  onFilterChange: (filter: Filter) => void;
};

/**
 * Todoをフィルタリングする選択リストコンポーネント
 *
 * @param currentFilter 現在選択中のフィルター値
 * @param onFilterChange フィルター変更時の処理
 * @return コンポーネント
 */
export const TodoFilter = ({
  currentFilter,
  onFilterChange,
}: TodoFilterProps) => {
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
