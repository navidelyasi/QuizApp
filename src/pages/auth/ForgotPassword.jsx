import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import "../../styles/pages-styles/login-page.css";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef();
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setError(
        "if the email is valid, you will receive a password reset email"
      );
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Forgot Password Page</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="email"
          ref={emailRef}
          placeholder="Enter your email"
        />
        <button className="login-button" type="submit" disabled={loading}>
          Reset Password
        </button>
      </form>
      <button
        className="login-button signup"
        onClick={() => navigate("/login")}
        disabled={loading}
      >
        Back to Login
      </button>
      <button
        className="login-button signup"
        onClick={() => navigate("/signup")}
        disabled={loading}
      >
        Don't have an account? Sign Up
      </button>
    </div>
  );
}
