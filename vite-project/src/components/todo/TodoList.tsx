import { Todo } from "../../types";
import { TodoItem } from "./TodoItem";

type TodoListProps = {
  todos: Todo[];
  onUpdate: <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => void;
};

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
