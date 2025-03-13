//Dependency imports
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

//View imports
import Home from "../views/Home/Home";
import Login from "../views/Login/Login";
import Register from "../views/Register/Register";
import Chat from "../views/Chat/Chat";

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
      <Route
        path="/login"
        element={<Login />}
      ></Route>
      <Route
        path="/register"
        element={<Register />}
      ></Route>
      <Route
        path="/dashboard"
        element={<Chat />}
      >
        <Route
          path=":team/:chat?"
          element={<Chat />}
        ></Route>
      </Route>
    </Routes>
  );
}

export default NavigationRoutes;
