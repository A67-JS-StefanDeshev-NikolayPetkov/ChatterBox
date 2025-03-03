//Dependency imports
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

//Component imports

//View imports
import Home from "../views/Home/Home";
// import Login from "../views/Login/Login";
// import Register from "../views/Register/Register";
// import RegistrationSuccess from "../components/informational/RegistrationSuccess/RegistrationSuccess";

function NavigationRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            replace
            to="/home"
          ></Navigate>
        }
      ></Route>
      <Route
        path="/home"
        element={<Home />}
      ></Route>
      {/* <Route
        path="/login"
        element={<Login />}
      ></Route>
      <Route
        path="/register"
        element={<Register />}
      ></Route>
      <Route
        path="/registration-success"
        element={<RegistrationSuccess />}
      ></Route> */}
    </Routes>
  );
}

export default NavigationRoutes;
