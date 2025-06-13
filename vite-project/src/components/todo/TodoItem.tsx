import DatePicker from "react-datepicker";
import { Priority, Todo } from "../../types";

/**
 * TodoItemコンポーネントのProps
 */
type TodoItemProps = {
  /** Todo */
  todo: Todo;
  /**　Todo編集時の処理　*/
  onUpdate: <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => void;
};

/**
 * Todoを表示・編集するためのコンポーネント
 *
 * @param todo Todo
 * @param onUpdate Todo編集時の処理
 * @return コンポーネント
 * @description 既に削除されたTodoの場合は、復元ボタンを表示させる
 */
export const TodoItem = ({ todo, onUpdate }: TodoItemProps) => {
  const today = new Date();
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        disabled={todo.removed}
        checked={todo.checked}
        onChange={() => onUpdate(todo.id, "checked", !todo.checked)}
      />
      <div className="due-date-wrapper">
        <label>期限</label>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          locale="ja"
          disabled={todo.checked || todo.removed}
          selected={todo.dueDate}
          minDate={today}
          onChange={(selectedDate) =>
            onUpdate(todo.id, "dueDate", selectedDate || today)
          }
        />
      </div>
      <div className="priority-wrapper">
        <label>優先度</label>
        <select
          value={todo.priority}
          disabled={todo.checked || todo.removed}
          onChange={(e) =>
            onUpdate(todo.id, "priority", e.target.value as Priority)
          }
          className={
            todo.priority === "low"
              ? "priority-low"
              : todo.priority === "medium"
              ? "priority-medium"
              : "priority-high"
          }
        >
          <option value="low">低</option>
          <option value="medium">中</option>
          <option value="high">高</option>
        </select>
      </div>
      <input
        type="text"
        disabled={todo.checked || todo.removed}
        value={todo.value}
        onChange={(e) => onUpdate(todo.id, "value", e.target.value)}
      />
      <button onClick={() => onUpdate(todo.id, "removed", !todo.removed)}>
        {todo.removed ? "復元" : "削除"}
      </button>
    </li>
  );
};
