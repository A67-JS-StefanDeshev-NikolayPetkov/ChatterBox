//Misc imports
import "./Login.css";

//Dependency imports
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth.service.js";
import { AppContext } from "../../context/AppContext.jsx";

//Component imports
import LoginForm from "../../components/forms/login/LoginForm";
import LogoWithText from "../../components/logo/LogoWithText";

function Login() {
  const { setContext } = useContext(AppContext);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInput = function (eventTarget) {
    const newFormData = { ...formData };
    newFormData[eventTarget.name] = eventTarget.value;
    setFormData(newFormData);
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    loginUser(formData.email, formData.password)
      .then((credentials) => {
        setContext({ user: credentials.user });
      })
      .then(() => {
        navigate("/chat");
      })
      .catch((e) => setLoginError(e.message));
  };

  return (
    <div className="center">
      <LogoWithText></LogoWithText>

      <LoginForm
        formData={formData}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        loginError={loginError}
      ></LoginForm>
    </div>
  );
}

export default Login;
