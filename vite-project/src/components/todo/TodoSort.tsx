import { Sort } from "../../types";

/**
 * TodoSortコンポーネントのProps
 */
type TodoSortProps = {
  /** ソート */
  sort: Sort;
  /** ソート変更時の処理  */
  onSortChange: (sort: Sort) => void;
};

/**
 * Todoをソートする選択リストコンポーネント
 *
 * @param sort ソート
 * @param onSortChange ソート変更時の処理
 * @return コンポーネント
 */
export const TodoSort = ({ sort, onSortChange }: TodoSortProps) => {
  return (
    <div className="flex items-center">
      <label htmlFor="sort-select">並び替え:</label>
      <select
        id="sort-select"
        value={sort}
        onChange={(e) => onSortChange(e.target.value as Sort)}
      >
        <option value="priority_asc">優先度（昇順）</option>
        <option value="priority_desc">優先度（降順）</option>
        <option value="dueDate_asc">期限（昇順）</option>
        <option value="dueDate_desc">期限（降順）</option>
      </select>
    </div>
  );
};
