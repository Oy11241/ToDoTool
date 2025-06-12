import { Todo } from "../../types";
import { TodoItem } from "./TodoItem";

/**
 * TodoItemコンポーネントのProps
 */
type TodoListProps = {
  /** Todoリスト */
  todos: Todo[];
  /**　Todo編集時の処理　*/
  onUpdate: <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => void;
};

/**
 * Todo一覧を表示・編集するためのコンポーネント
 *
 * @param todos Todoリスト
 * @param onUpdate Todo編集時の処理　
 * @return コンポーネント
 */
export const TodoList = ({ todos, onUpdate }: TodoListProps) => {
  if (todos.length === 0) {
    return <p className="empty-message">タスクがありません</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} />
      ))}
    </ul>
  );
};
