import "./TeamsBar.css";
import teamLogo from "../../../assets/default-team.png";
import logo from "../../../assets/chatterbox-logo-nobackground-white.svg";
import plusSign from "../../../assets/plus.svg";

// Component imports
import Avatar from "../../../components/avatar/Avatar";

// Dependency imports
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { getChatsDetails } from "../../../services/teams.service";
import { AppContext } from "../../../context/AppContext";
import { getTeamsDetails } from "../../../services/teams.service";

function TeamsBar({ setTeamChannels }) {
  const [teams, setTeams] = useState(null);
  const { user, userData } = useContext(AppContext);
  const navigate = useNavigate();

  // Fetch teams from Firebase
  const fetchTeams = async () => {
    if (userData.teams) {
      const teamsData = await getTeamsDetails(Object.keys(userData.teams));
      setTeams(teamsData);
    }
  };

  // Fetch teams when the component mounts
  useEffect(() => {
    fetchTeams();
  }, []);

  const handleTeamClick = async (teamId) => {
    const chatsData = await getChatsDetails(teamId);

    setTeamChannels(chatsData);
    navigate(`/${teamId}/${chatsData[0].id}`);
  };

  return (
    <div className="teams-bar">
      <div className="team-logo">
        <Avatar
          imageUrl={logo}
          type="team"
          onClick={() => navigate("/home")}
          title={"Home"}
          name="Home"
        />
      </div>
      <div className="teams-list">
        {teams &&
          teams.map((team) => {
            return (
              <Avatar
                key={team.id}
                type="team"
                imageUrl={team?.imageUrl || teamLogo}
                onClick={() => handleTeamClick(team.id)}
                name={team.name}
              />
            );
          })}
      </div>
      <Avatar
        onClick={() => navigate(`/create-team`)}
        type="team"
        imageUrl={plusSign}
        name="Create Team"
      />
    </div>
  );
}

export default TeamsBar;
