import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import "../../styles/pages-styles/login-page.css";

export default function EmailVerification() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, logout, reloadUser, sendVerificationEmail } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setError("Please verify your email address to continue using the app.");
  }, []);

  async function handleResendEmail() {
    try {
      setError("");
      setLoading(true);
      await sendVerificationEmail();
      setError("Verification email sent! Please check your inbox.");
    } catch (error) {
      setError("Failed to resend verification email. " + error.message);
    }
    setLoading(false);
  }

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      setError("Failed to log out");
    }
  }

  async function handleVerifiedEmail() {
    try {
      setLoading(true);
      setError("it is sending");
      await reloadUser();
      setError("Email is not verified");
      navigate("/menu");
    } catch (error) {
      setError("Email is not verified");
    }
    setLoading(false);
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Verify Your Email</h1>
      <p className="general-text">
        A verification email has been sent to {currentUser?.email}
      </p>

      {error && <div className="error-message">{error}</div>}

      <button
        className="login-button"
        onClick={handleVerifiedEmail}
        disabled={loading}
      >
        I Verified My Email
      </button>
      <button
        className="login-button"
        onClick={handleResendEmail}
        disabled={loading}
      >
        Resend Verification Email
      </button>
      <button className="login-button signup" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
