import { useSearchParams } from "react-router-dom";
import { useTodos } from "../hooks/useTodos";
import { TodoFilter } from "../components/todo/TodoFilter";
import { TodoForm } from "../components/todo/TodoForm";
import { TodoList } from "../components/todo/TodoList";
import { Filter } from "../types";
import { TodoSort } from "../components/todo/TodoSort";

export const TodoPage = () => {
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get("filter") as Filter | null;

  const {
    text,
    filter,
    dueDate,
    priority,
    sort,
    filteredTodos,
    sortedTodos,
    handleTextChange,
    handleFilterChange,
    handleDueDateChange,
    handlePriorityChange,
    handleSortChange,
    handleSubmit,
    handleTodoUpdate,
    handleEmptyTrash,
  } = useTodos(filterParam || undefined);

  const showForm = filter !== "checked" && filter !== "removed";
  const showEmptyTrashButton = filter === "removed" && filteredTodos.length > 0;

  return (
    <div className="todo-page">
      <h1>Todo管理</h1>

      <div className="todo-controls flex justify-between items-center">
        <div>
          <TodoFilter
            currentFilter={filter}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="flex items-center">
          {showEmptyTrashButton && (
            <button
              onClick={handleEmptyTrash}
              className="btn btn-danger btn-sm"
            >
              ゴミ箱を空にする
            </button>
          )}
          <TodoSort sort={sort} onSortChange={handleSortChange} />
        </div>
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

      <TodoList todos={sortedTodos} onUpdate={handleTodoUpdate} />
    </div>
  );
};
