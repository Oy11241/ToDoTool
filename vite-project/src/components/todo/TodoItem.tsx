import { Todo } from "../../types";


type TodoItemProps = {
  todo: Todo;
  onUpdate: <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => void;
};

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
