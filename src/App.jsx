import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Menu from "./pages/Menu.jsx";
import QuizPage from "./pages/QuizPage.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/quiz/:quizId" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}
