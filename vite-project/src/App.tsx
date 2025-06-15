import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/common/Layout";
import { TodoPage } from "./pages/TodoPage";
import { DashboardPage } from "./pages/DashboardPage";
import { CalendarPage } from "./pages/CalendarPage";

// 今後ページを追加したい場合：
// - `<Routes>` 内に新たな `<Route path="/your-path" element={<YourComponent />} />` を追加
// - 新しいページ用のコンポーネントを `pages/` フォルダに作成
export const App = () => {
  // GitHub Pages用のベースパス設定
  const basePath = "/ToDoTool";

  return (
    <Router basename={basePath}>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/todos" element={<TodoPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};
