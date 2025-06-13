import "react-datepicker/dist/react-datepicker.css";
import { Todo } from "../../types";

/**
 * DashboardBarコンポーネントのProps
 */
type DashboardBarProps = {
  /** Todoリスト */
  todos: Todo[];
};

/**
 * 優先度別にTodoを集計表示するコンポーネント
 *
 * @param todos Todoリスト
 * @return コンポーネント
 */
export const DashboardBar = ({ todos }: DashboardBarProps) => {
  const total = todos.length;
  // 優先度別のタスク数
  const highPriority = todos.filter((t) => t.priority === "high").length;
  const mediumPriority = todos.filter((t) => t.priority === "medium").length;
  const lowPriority = todos.filter((t) => t.priority === "low").length;
  return (
    <div className="dashboard-additional">
      <div className="priority-stats">
        <h2>優先度別タスク</h2>
        <div className="priority-bars">
          <div className="priority-bar">
            <span className="label">高</span>
            <div className="bar-container">
              <div
                className="bar high"
                style={{
                  width: `${total ? (highPriority / total) * 100 : 0}%`,
                }}
              ></div>
            </div>
            <span className="count">{highPriority}</span>
          </div>
          <div className="priority-bar">
            <span className="label">中</span>
            <div className="bar-container">
              <div
                className="bar medium"
                style={{
                  width: `${total ? (mediumPriority / total) * 100 : 0}%`,
                }}
              ></div>
            </div>
            <span className="count">{mediumPriority}</span>
          </div>
          <div className="priority-bar">
            <span className="label">低</span>
            <div className="bar-container">
              <div
                className="bar low"
                style={{
                  width: `${total ? (lowPriority / total) * 100 : 0}%`,
                }}
              ></div>
            </div>
            <span className="count">{lowPriority}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
