//Misc imports
import "./LoginForm.css";

//Dependency imports
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

//Component imports
import Button from "../../button/Button";

function LoginForm({ formData, handleInput, handleSubmit, loginError }) {
  const paragraphRef = useRef(null);

  useEffect(() => {
    if (loginError) paragraphRef.current.focus();
  }, [loginError]);

  return (
    <form
      className="login-form"
      onSubmit={handleSubmit}
    >
      <h2>Login</h2>

      {loginError && (
        <div autoFocus>
          <p
            ref={paragraphRef}
            tabIndex={-1}
          >
            {loginError}
          </p>
        </div>
      )}

      <div className="fields-container">
        <div className="field-container">
          <label htmlFor="email">Email</label>
          <input
            className="login-input"
            type="text"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => {
              handleInput(e.target);
            }}
          />
        </div>
        <div className="field-container">
          <label htmlFor="password">Password</label>
          <input
            className="login-input"
            type="password"
            id="password"
            name="password"
            required
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => {
              handleInput(e.target);
            }}
          />
        </div>
      </div>

      <div className="redirection-links">
        {/* <div className="redirection-link">
          <Link>Forgot password?</Link>
        </div> */}
        <div className="redirection-link">
          New user? <Link to="/register">Register here.</Link>
        </div>
      </div>

      <Button
        className="submit-login-btn"
        label="Login"
      ></Button>
    </form>
  );
}

export default LoginForm;
