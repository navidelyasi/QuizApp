import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import EmailVerification from "./pages/auth/EmailVerification.jsx";
import PrivateRoute from "./pages/auth/PrivateRoute.jsx";
import Menu from "./pages/Menu.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import CardGame from "./components/game-components/CardGame.jsx";
import Halloween from "./components/game-components/Halloween.jsx";
import Index from "./pages/Index.jsx";
import Profile from "./pages/Profile.jsx";
import { AuthProvider } from "./hooks/AuthContext.jsx";
import { QuizProvider } from "./hooks/QuizContext.jsx";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <QuizProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cv" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route
              path="/menu"
              element={
                <PrivateRoute>
                  <Menu />
                </PrivateRoute>
              }
            />
            <Route
              path="/quiz/:quizId"
              element={
                <PrivateRoute>
                  <QuizPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/card-game/:id"
              element={
                <PrivateRoute>
                  <CardGame />
                </PrivateRoute>
              }
            />
            <Route path="/halloween-game/:id" element={<Halloween />} />
          </Routes>
        </QuizProvider>
      </AuthProvider>
    </Router>
  );
}
