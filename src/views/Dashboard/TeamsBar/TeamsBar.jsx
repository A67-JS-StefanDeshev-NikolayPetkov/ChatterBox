import "./TeamsBar.css";
import teamLogo from "../../../assets/default-team.png";
import logo from "../../../assets/chatterbox-logo-nobackground-white.svg";
import plusSign from "../../../assets/plus.svg";

// Component imports
import Avatar from "../../../components/avatar/Avatar";

// Dependency imports
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import {
  getTeamsDetails,
  subscribeToTeams,
} from "../../../services/teams.service";

function TeamsBar() {
  const [teamsDetails, setTeamsDetails] = useState(null);
  const { user, userData } = useContext(AppContext);
  const navigate = useNavigate();

  const handleTeamClick = async (teamDetails) => {
    const firstChatId = teamDetails?.chats
      ? Object.keys(teamDetails.chats)[0]
      : null;
    navigate(`/${teamDetails.id}/${firstChatId}`);
  };

  function handleFetchTeamsDetails(teamsIds) {
    getTeamsDetails(teamsIds).then((teamsDetails) =>
      setTeamsDetails(teamsDetails)
    );
  }

  // Fetch teams when the component mounts
  useEffect(() => {
    const unsubscribe = subscribeToTeams(user.uid, handleFetchTeamsDetails);

    if (userData?.teams) {
      handleFetchTeamsDetails(Object.keys(userData.teams));
    }

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="teams-bar">
      <div className="team-logo">
        <Avatar
          imageUrl={logo}
          onClick={() => navigate(`/${user.uid}/friends/all`)}
          title={"Home"}
          name="Home"
          className="to-dms"
        />
      </div>
      <div className="teams-list">
        {teamsDetails &&
          teamsDetails.map((team) => {
            return (
              <Avatar
                key={team.id}
                type="team"
                imageUrl={team?.imageUrl || teamLogo}
                onClick={() => handleTeamClick(team)}
                name={team.name}
              />
            );
          })}
      </div>
      <Avatar
        onClick={() => navigate(`/${user.uid}/create-team`)}
        type="team"
        imageUrl={plusSign}
        name="Create Team"
      />
    </div>
  );
}

export default TeamsBar;
