//Misc imports
import "./RegisterForm.css";

//Dependency imports
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

//Component imports
import Button from "../../button/Button";
import FieldError from "../error/FieldError";

function RegisterForm({ handleInput, handleSubmit, handleFileChange,  formData, errors }) {
  const paragraphRef = useRef(null);

  useEffect(() => {
    if (errors.message) paragraphRef.current.focus();
  }, [errors.message]);

  return (
    <form
      className="register-form"
      onSubmit={handleSubmit}
    >
      <h2>Register</h2>

      {errors.message && (
        <div autoFocus>
          <p
            ref={paragraphRef}
            tabIndex={-1}
          >
            {errors.message}
          </p>
        </div>
      )}

      <div className="fields-container">
        <div className="field-container">
          <label htmlFor="username">Username</label>
          <input
            className="register-input"
            type="text"
            id="username"
            name="username"
            required
            placeholder="Enter your username"
            value={formData.username}
            onChange={(e) => {
              handleInput(e.target);
            }}
          />
          {errors.username && <FieldError label={errors.username}></FieldError>}
        </div>
        <div className="field-container">
          <label htmlFor="email">Email</label>
          <input
            className="register-input"
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
          {errors.email && <FieldError label={errors.email}></FieldError>}
        </div>
        <div className="field-container">
          <label htmlFor="password">Password</label>
          <input
            className="register-input"
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
          {errors.password && <FieldError label={errors.password}></FieldError>}
        </div>
        <div className="field-container">
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            required
            onChange={handleFileChange}
          />
          {errors.profilePicture && <p className="error">{errors.profilePicture}</p>}
        </div>
      </div>

      <div className="redirection-links">
        <div className="redirection-link">
          Already registered? <Link to="/login">Click here.</Link>
        </div>
      </div>

      <Button
        className={"submit-register-btn"}
        label="Register"
      />
    </form>
  );
}

export default RegisterForm;
