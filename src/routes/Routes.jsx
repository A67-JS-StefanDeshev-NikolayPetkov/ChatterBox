//Dependency imports
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

//View imports
import Home from "../views/Home/Home";
import Login from "../views/Login/Login";
import Register from "../views/Register/Register";
import Dashboard from "../views/Dashboard/Dashboard";
import UserSettings from "../views/UserSettings/UserSettings";
import NotFound from "../views/NotFound/NotFound";
import About from "../views/About/About";

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
        path="/about"
        element={<About />}
      ></Route>
      <Route
        path="/:team/friends/:filter"
        element={<Dashboard />}
      ></Route>
      <Route
        path="/:team/:channelId"
        element={<Dashboard />}
      ></Route>
      <Route
        path="/:team/settings/:filter"
        element={<Dashboard />}
      ></Route>
      <Route
        path="*"
        element={<NotFound />}
      ></Route>
      {/* <Route
        path="/:team/chats/:chat"
        element={<Dashboard />}
      ></Route> */}
    </Routes>
  );
}

export default NavigationRoutes;
