import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/common/Layout";
import { TodoPage } from "./pages/Todopage";

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
