import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    onLogin({
      name: email.split("@")[0],
      email: email,
    });
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* LOGO */}
        <div className="login-logo">
          <div className="logo-icon">✦</div>

          <div>
            <h1>MediSphere</h1>
            <span>COGNITIVE TWIN</span>
          </div>
        </div>

        <h2>Welcome to MediSphere</h2>

        <p className="login-subtitle">
          Healthcare Cognitive Twin
        </p>

        {/* LOGIN FORM */}
        <form onSubmit={handleSubmit}>

          {/* EMAIL */}
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          {/* PASSWORD */}
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          {/* OPTIONS */}
          <div className="login-options">

            <label className="remember">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>

            <button
              type="button"
              className="forgot-btn"
              onClick={() =>
                alert("Password reset option coming soon")
              }
            >
              Forgot password?
            </button>

          </div>

          {/* LOGIN BUTTON */}
          <button type="submit" className="login-btn">
            Login →
          </button>

        </form>

        <p className="login-footer">
          Secure healthcare workspace
        </p>

      </div>
    </div>
  );
}

export default Login;