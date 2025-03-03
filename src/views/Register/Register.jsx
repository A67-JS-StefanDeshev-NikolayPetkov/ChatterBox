import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../utils/helpers";

//Misc imports
import "./Register.css";

//Dependency imports
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

//Component imports
import RegisterForm from "../../components/forms/register/RegisterForm";
import Loader from "../../components/loader/Loader";
import LogoWithText from "../../components/logo/LogoWithText";
import Button from "../../components/button/Button";

//Services
import { AppContext } from "../../context/AppContext";
import {
  getUserByHandle,
  createUserHandle,
} from "../../services/users.service";
import { registerUser } from "../../services/auth.service";

function Register() {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const { onLogout } = useContext(AppContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const validateRegistrationForm = function () {
    const newErrors = {};

    if (!validateUsername(formData.username)) {
      newErrors.username = "Invalid username.";
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email.";
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = "Invalid password.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInput = function (eventTarget) {
    const newFormData = { ...formData };
    newFormData[eventTarget.name] = eventTarget.value;
    setFormData(newFormData);
  };

  const handleSubmit = async function (e) {
    e.preventDefault();
    setLoading(true);

    //If the form data is valid
    if (validateRegistrationForm()) {
      try {
        //Check if user already exists
        const snapshot = await getUserByHandle(formData.username);
        if (snapshot.exists()) {
          throw new Error(
            `Username @${formData.username} has already been taken!`
          );
        }

        //Register user
        const userCredentials = await registerUser(
          formData.email,
          formData.password,
          formData.username
        );

        //Log user in database
        createUserHandle(
          formData.username,
          userCredentials.user.uid,
          userCredentials.user.email
        );

        //Logout user (firebase automatically logs users in)
        onLogout();

        setSuccess(true);
      } catch (e) {
        setErrors({ ...errors, message: e.message });
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <Loader></Loader>;

  if (success)
    return (
      <div className="center">
        <LogoWithText></LogoWithText>
        <div className="success-container">
          <h2>Success!</h2>
          <p>Your account has been creates successfully!</p>
          <Button
            label="Login"
            className="success-login-btn"
            onClick={() => navigate("/login")}
          ></Button>
        </div>
      </div>
    );

  return (
    <div className="center">
      <LogoWithText></LogoWithText>

      <RegisterForm
        handleSubmit={handleSubmit}
        handleInput={handleInput}
        formData={formData}
        errors={errors}
      ></RegisterForm>
    </div>
  );
}
export default Register;
