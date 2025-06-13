import "react-datepicker/dist/react-datepicker.css";
import { Todo } from "../../types";
import { Link } from "react-router-dom";

/**
 * DashboardAlertコンポーネントのProps
 */
type DashboardAlertProps = {
  /** Todoリスト */
  todos: Todo[];
};

/**
 * 期限切れ、未完了のTodoを警告するコンポーネント
 *
 * @param todos Todoリスト
 * @return コンポーネント
 */
export const DashboardAlert = ({ todos }: DashboardAlertProps) => {
  // 期限切れのタスク数
  const overdue = todos.filter(
    (t) => !t.checked && t.dueDate && new Date(t.dueDate) < new Date()
  ).length;

  // 今日が期限のタスク数
  const today = new Date();
  const dueTodayCount = todos.filter((t) => {
    if (!t.dueDate || t.checked) return false;
    const dueDate = new Date(t.dueDate);
    return (
      dueDate.getDate() === today.getDate() &&
      dueDate.getMonth() === today.getMonth() &&
      dueDate.getFullYear() === today.getFullYear()
    );
  }).length;

  return (
    <div className="dashboard-alerts">
      {overdue > 0 && (
        <div className="alert overdue">
          <span className="alert-icon">⚠️</span>
          <span className="alert-text">
            <strong>{overdue}件</strong>のタスクが期限切れです
          </span>
          <Link to="/todos" className="alert-link">
            確認する
          </Link>
        </div>
      )}

      {dueTodayCount > 0 && (
        <div className="alert due-today">
          <span className="alert-icon">📅</span>
          <span className="alert-text">
            今日が期限の未完了タスクが<strong>{dueTodayCount}件</strong>
            あります
          </span>
          <Link to="/calendar" className="alert-link">
            確認する
          </Link>
        </div>
      )}
    </div>
  );
};
