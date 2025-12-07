import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../../assets/css/Login.css'
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { loginAuth } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    if (!info.email || !info.password) {
      return alert("All fields are required!");
    }

    setLoading(true);
    loginAuth(info)
      .then(() => {
        alert("Login successful!");
        navigate("/dashboard");
      })
      .catch(err => {
        console.error(err);
        alert("Login failed. Please check your credentials.");
        setLoading(false);
      });
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <div className="login-logo">
            <h1>Dart l'Darna</h1>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input
                value={info.email}
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
                placeholder="your@email.com"
                type="email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                value={info.password}
                onChange={(e) => setInfo({ ...info, password: e.target.value })}
                placeholder="••••••••"
                type="password"
              />
            </div>

            <div className="form-options">
              <label className="remember-check">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" disabled={loading} className="login-btn">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>
        </div>

        <div className="signup-box">
          Don't have an account?{" "}
          <Link to="/register" className="signup-link">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}