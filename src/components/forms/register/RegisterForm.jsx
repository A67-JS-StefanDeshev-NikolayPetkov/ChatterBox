//Misc imports
import "./RegisterForm.css";

//Dependency imports
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

//Component imports
import Button from "../../button/Button";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import FieldError from "../error/FieldError";

function RegisterForm({
  handleInput,
  handlePhoneInput,
  handleSubmit,
  handleFileChange,
  formData,
  errors,
  setErrors,
}) {
  const paragraphRef = useRef(null);

  useEffect(() => {
    if (errors.message) paragraphRef.current.focus();
  }, [errors.message]);

  const validateForm = (e) => {
    e.preventDefault();
    setErrors({});
    if (!formData.phoneNumber || formData.phoneNumber.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: "Phone number is required.",
      }));
      return;
    }
    if (!formData.profilePicture) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        profilePicture: "Profile picture is required!",
      }));
      return;
    }
    handleSubmit(e);
  };

  return (
    <form
      className="register-form"
      onSubmit={validateForm}
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
        <div className="upload-image-container">
          <div
            className="team-image-preview"
            style={{
              backgroundImage: formData.profilePicture
                ? `url(${formData.profilePicture})`
                : null,
            }}
            onClick={() => document.getElementById("file-upload").click()}
          >
            {!formData.profilePicture && <p>Upload image</p>}
          </div>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

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
        </div>
        {errors.username && <FieldError label={errors.username}></FieldError>}

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
        </div>
        {errors.email && <FieldError label={errors.email}></FieldError>}

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
        </div>
        {errors.password && <FieldError label={errors.password}></FieldError>}

        <div className="field-container">
          <label
            htmlFor="phoneNumber"
            className="offfff"
          >
            Number
          </label>
          <PhoneInput
            country={"bg"}
            value={formData.phoneNumber}
            onChange={(phone, country) => handlePhoneInput(phone, country)}
            required
            inputClass="phone-input"
            containerClass="phone-input-container"
          />
        </div>
        {errors.phoneNumber && (
          <FieldError label={errors.phoneNumber}></FieldError>
        )}
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
