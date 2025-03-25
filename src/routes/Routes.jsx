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
        path="/:teamId/friends/:filter"
        element={<Dashboard isFriendsWindow={true} />}
      ></Route>
      <Route
        path="/:teamId/:chatId"
        element={<Dashboard isChatWindow={true} />}
      ></Route>

      <Route
        path="/:teamId/settings/:filter"
        element={<Dashboard />}
      ></Route>
      <Route
        path="/:teamId/create-chat"
        element={<Dashboard isCreateChat={true} />}
      ></Route>
      <Route
        path="/:teamId/add-members"
        element={<Dashboard isAddMembers={true} />}
      ></Route>
      <Route
        path="/:teamId/create-team"
        element={<Dashboard isCreateTeam={true} />}
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
