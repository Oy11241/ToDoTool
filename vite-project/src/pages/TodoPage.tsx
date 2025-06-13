import { useSearchParams } from "react-router-dom";
import { useTodos } from "../hooks/useTodos";
import { TodoFilter } from "../components/todo/TodoFilter";
import { TodoForm } from "../components/todo/TodoForm";
import { TodoList } from "../components/todo/TodoList";
import { Filter } from "../types";

export const TodoPage = () => {
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get("filter") as Filter | null;

  const {
    text,
    filter,
    dueDate,
    priority,
    filteredTodos,
    handleTextChange,
    handleFilterChange,
    handleDueDateChange,
    handlePriorityChange,
    handleSubmit,
    handleTodoUpdate,
    handleEmptyTrash,
  } = useTodos(filterParam || undefined);

  const showForm = filter !== "checked" && filter !== "removed";
  const showEmptyTrashButton = filter === "removed" && filteredTodos.length > 0;

  return (
    <div className="todo-page">
      <h1>Todo管理</h1>

      <div className="todo-controls">
        <TodoFilter
          currentFilter={filter}
          onFilterChange={handleFilterChange}
        />

        {showEmptyTrashButton && (
          <button onClick={handleEmptyTrash} className="btn btn-danger btn-sm">
            ゴミ箱を空にする
          </button>
        )}
      </div>

      {showForm && (
        <div className="todo-input-section">
          <div className="form-container">
            <TodoForm
              text={text}
              onTextChange={handleTextChange}
              priority={priority}
              onPriorityChange={handlePriorityChange}
              date={dueDate}
              onCalendarChange={handleDueDateChange}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      )}

      <TodoList todos={filteredTodos} onUpdate={handleTodoUpdate} />
    </div>
  );
};
