import { Todo } from "../../types";

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
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        disabled={todo.removed}
        checked={todo.checked}
        onChange={() => onUpdate(todo.id, "checked", !todo.checked)}
      />
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
