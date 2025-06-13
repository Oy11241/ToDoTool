import { DashboardAlert } from "../components/dashboard/DashboardAlert";
import { DashboardBar } from "../components/dashboard/DashboardBar";
import { DashboardGrid } from "../components/dashboard/DashboardGrid";
import { useTodos } from "../hooks/useTodos";

export const DashboardPage = () => {
  const { todos } = useTodos();
  const activeTodos = todos.filter((t) => !t.removed);

  return (
    <div className="dashboard">
      <DashboardGrid todos={activeTodos} />
      <DashboardBar todos={activeTodos} />
      <DashboardAlert todos={activeTodos} />
    </div>
  );
};
