import Calendar from "react-calendar";
import { Todo } from "../../types";

/**
 * CalendarTodoListコンポーネントのProps
 */
type CalendarTodoListProps = {
  /** 現在選択中の日付 */
  selectedDate: Date;
  /** 変更時の処理  */
  onSelectedDateChange: (date: Date) => void;
  /** Todoリスト */
  todos: Todo[];
};

/**
 * 日付ごとのTodoを表示するカレンダーコンポーネント
 *
 * @param currentFilter 現在選択中のフィルター値
 * @param onFilterChange フィルター変更時の処理
 * @param todos フィルター変更時の処理
 * @return コンポーネント
 */
export const CalendarTodoList = ({
  selectedDate,
  onSelectedDateChange,
  todos,
}: CalendarTodoListProps) => {
  // 日付表示フォーマット
  const formatDate = (date: Date) =>
    `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;

  // 優先度順にタスクを並べ替える
  const priorityOrder = {
    high: 0,
    medium: 1,
    low: 2,
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (!todo.dueDate || todo.removed) return false;
      return (
        formatDate(new Date(todo.dueDate)) ===
        formatDate(selectedDate ?? new Date())
      );
    })
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  const priorityLabel = (priority: Todo["priority"]) => {
    switch (priority) {
      case "high":
        return "優先度：高";
      case "medium":
        return "優先度：中";
      case "low":
        return "優先度：低";
      default:
        return "";
    }
  };

  return (
    <div className="calendar-page">
      <h1>カレンダー</h1>
      <div className="calendar-container">
        <Calendar
          onChange={(selectedDate) => {
            onSelectedDateChange(selectedDate as Date);
          }}
          value={selectedDate}
        />
        {selectedDate && (
          <div className="todo-on-date">
            <h2>{formatDate(selectedDate)} のタスク</h2>
            {filteredTodos.length === 0 ? (
              <p>タスクはありません</p>
            ) : (
              <ul>
                {filteredTodos.map((todo: Todo) => (
                  <li
                    key={todo.id}
                    className={`todo-item ${todo.checked ? "checked" : ""}`}
                  >
                    <span className={`priority-badge ${todo.priority}`}>
                      {priorityLabel(todo.priority)}
                    </span>
                    <span className="todo-text">{todo.value}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
