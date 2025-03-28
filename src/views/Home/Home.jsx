//Dependency
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { getUserCount } from "../../services/users.service";
import { getTeamsCount } from "../../services/teams.service";

//Components
import Header from "../../components/header/Header";
import Button from "../../components/button/Button";
import Loader from "../../components/loader/Loader";

//Misc
import "./Home.css";
import Center from "../../components/center/Center";

function Home() {
  const { user, userData } = useContext(AppContext);
  const navigate = useNavigate();

  const [usersCount, setUsersCount] = useState(0);
  const [teamsCount, setTeamsCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const [userCount, teamCount] = await Promise.all([
        getUserCount(),
        getTeamsCount(),
      ]);
      setUsersCount(userCount);
      setTeamsCount(teamCount);
    };
    fetchCounts();
  }, []);

  useEffect(() => {
    if (user && userData) navigate(`/${user.uid}/friends/all`);
  }, [userData]);

  if (user && !userData)
    return (
      <Center>
        <Loader></Loader>
      </Center>
    );

  if (!user)
    return (
      <>
        <Header></Header>
        <div className="home-content">
          <div className="info-container">
            <h1>The new oldschool direct & group chat</h1>
            <p>
              We built this chat for all of you that wish to stay connected with
              no additional hassle. Simply create an account, add friends and
              chat away. Have a whole team behind you? We got you. Simply create
              a team and chat with all your friends together!
            </p>
            <div className="btns-container">
              <Button
                onClick={() => navigate("/register")}
                label={"Join us!"}
                className={"register-btn"}
              />
              <Button
                onClick={() => navigate("/login")}
                label={"Log in."}
                className={"login-btn"}
              />
            </div>
          </div>
          <div className="stats-container">
            <div className="stat-container">
              <p>{usersCount}</p>
              <p>users</p>
            </div>
            <div className="stat-container">
              <p>{teamsCount}</p>
              <p>channels</p>
            </div>
          </div>
        </div>
      </>
    );

  return null;
}

export default Home;
