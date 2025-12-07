import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../../assets/css/Register.css'
import { authApi } from "../../services/authApi";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!user.firstName || !user.lastName || !user.email || !user.password || !user.confirmPassword) {
      return alert("All fields are required!");
    }
    if (user.password !== user.confirmPassword) {
      return alert("Confirm password is incorrect!");
    }

    setLoading(true);
    authApi.register(user)
      .then(() => {
        alert("Success! Welcome to Dart l'Darna");
        navigate("/login");
      })
      .catch(err => {
        console.error(err);
        alert("Registration failed. Please try again.");
        setLoading(false);
      });
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-box">
          <div className="register-logo">
            <h1>Dart l'Darna</h1>
          </div>
          <p className="register-subtitle">
            Sign up to see properties and join Daret groups
          </p>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                  value={user.firstName}
                  type="text"
                  placeholder="Ahmed"
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                  value={user.lastName}
                  type="text"
                  placeholder="Bennani"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                value={user.email}
                type="email"
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                value={user.password}
                type="password"
                placeholder="••••••••"
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                value={user.confirmPassword}
                type="password"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" disabled={loading} className="register-btn">
              {loading ? "Creating..." : "Sign Up"}
            </button>

            <p className="terms-text">
              By signing up, you agree to our Terms & Privacy Policy.
            </p>
          </form>
        </div>

        <div className="login-box">
          Have an account?{" "}
          <Link to="/login" className="login-link">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;