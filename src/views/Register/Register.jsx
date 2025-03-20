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
import LogoWithText from "../../components/logo/LogoWithText/LogoWithText";
import Button from "../../components/button/Button";
import Center from "../../components/center/Center";

//Services
import { AppContext } from "../../context/AppContext";
import {
  getUserByUsername,
  createUserHandle,
} from "../../services/users.service";
import { registerUser } from "../../services/auth.service";

function Register() {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { onLogout } = useContext(AppContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profilePicture: null,
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
    if (!formData.profilePicture) {
      newErrors.profilePicture = "Profile picture is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInput = function (eventTarget) {
    const newFormData = ({ ...formData, [eventTarget.name]: eventTarget.value });
    newFormData[eventTarget.name] = eventTarget.value;
    setFormData(newFormData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result }); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async function (e) {
    e.preventDefault();
    setLoading(true);

    //If the form data is valid
    if (validateRegistrationForm()) {
      try {
        //Check if user already exists
        const snapshot = await getUserByUsername(formData.username);
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
        createUserHandle({
          username: formData.username,
          uid: userCredentials.user.uid,
          email: userCredentials.user.email,
          profilePicture: formData.profilePicture,
        });

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

  if (loading)
    return (
      <Center>
        <Loader></Loader>
      </Center>
    );

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
        handleFileChange={handleFileChange}
        formData={formData}
        errors={errors}
      ></RegisterForm>
    </div>
  );
}
export default Register;
