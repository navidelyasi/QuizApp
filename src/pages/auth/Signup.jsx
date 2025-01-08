import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import "../../styles/pages-styles/login-page.css";
import "../../styles/pages-styles/index.css";

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/menu");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Signup Page</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="email"
          ref={emailRef}
          placeholder="Enter your email"
        />
        <input
          className="login-input"
          type="password"
          ref={passwordRef}
          placeholder="Enter your password"
        />
        <input
          className="login-input"
          type="password"
          ref={confirmPasswordRef}
          placeholder="Confirm your password"
        />
        <button className="login-button" type="submit" disabled={loading}>
          Signup
        </button>
      </form>
      <button
        className="login-button signup"
        onClick={() => navigate("/login")}
        disabled={loading}
      >
        Already have an account? Log In
      </button>

      {/* _______________________ loading overlay _______________________ */}
      {loading && (
        <div className="submitting-overlay">
          <div className="submitting-content">
            <div className="spinner"></div>
            <div className="general-text">please wait ...</div>
          </div>
        </div>
      )}
    </div>
  );
}
