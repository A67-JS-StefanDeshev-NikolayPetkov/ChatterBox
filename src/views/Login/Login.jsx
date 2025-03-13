//Misc imports
import "./Login.css";

//Dependency imports
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth.service.js";
import { AppContext } from "../../context/AppContext.jsx";

//Component imports
import LoginForm from "../../components/forms/login/LoginForm";
import LogoWithText from "../../components/logo/LogoWithText/LogoWithText.jsx";
import Center from "../../components/center/Center.jsx";
import Loader from "../../components/loader/Loader.jsx";

function Login() {
  const { setContext, user, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    loginUser(formData.email, formData.password)
      .then((credentials) => {
        setContext({ user: credentials.user });
      })
      .catch((e) => setLoginError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user && userData) {
      navigate(`/dashboard/${userData.username}/${userData.chats}`);
    }
  }, [userData]);

  if (loading || (user && !userData))
    return (
      <Center>
        <Loader></Loader>
      </Center>
    );

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
