import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/common/Layout";
import { TodoPage } from "./pages/TodoPage";

// 今後ページを追加したい場合：
// - `<Routes>` 内に新たな `<Route path="/your-path" element={<YourComponent />} />` を追加
// - 新しいページ用のコンポーネントを `pages/` フォルダに作成
export const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/todos" element={<TodoPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};
