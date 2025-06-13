import "react-datepicker/dist/react-datepicker.css";
import { Todo } from "../../types";

/**
 * DashboardGridコンポーネントのProps
 */
type DashboardGridProps = {
  /** Todoリスト */
  todos: Todo[];
};

/**
 * 状態別にTodoを集計表示するコンポーネント
 *
 * @param todos Todoリスト
 * @return コンポーネント
 */
export const DashboardGrid = ({ todos }: DashboardGridProps) => {
  const total = todos.length;
  const completed = todos.filter((t) => t.checked).length;
  const remaining = total - completed;
  return (
    <div>
      <h1>ダッシュボード</h1>

      <div className="dashboard-grid">
        <div className="stat-card total">
          <p className="stat-label">総タスク数</p>
          <p className="stat-value">{total}</p>
        </div>
        <div className="stat-card completed">
          <p className="stat-label">完了済</p>
          <p className="stat-value">{completed}</p>
        </div>
        <div className="stat-card remaining">
          <p className="stat-label">未完了</p>
          <p className="stat-value">{remaining}</p>
        </div>
      </div>
    </div>
  );
};
