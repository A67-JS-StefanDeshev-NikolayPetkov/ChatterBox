import "./TeamsBar.css";
import teamLogo from "../../../assets/default-team.png";
import logo from "../../../assets/chatterbox-logo-nobackground-white.svg";
import plusSign from "../../../assets/plus.svg";

// Component imports
import Avatar from "../../../components/avatar/Avatar";

// Dependency imports
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { getChannels } from "../../../services/teams.service";
import { AppContext } from "../../../context/AppContext";
import { getTeams, getUserTeams } from "../../../services/teams.service";

function TeamsBar({ setTeamChannels }) {
  const [teams, setTeams] = useState([]);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  // Fetch teams from Firebase
  const fetchTeams = async () => {
    const userTeams = await getUserTeams(user.uid);

    if (userTeams) {
      const teamsData = await getTeams();
      const teamsArray = Object.keys(teamsData)
        .filter((teamId) => userTeams[teamId])
        .map((teamId) => ({
          id: teamId,
          name: teamsData[teamId].name,
          imageUrl: teamsData[teamId].imageUrl,
          members: teamsData[teamId].members,
        }));
      setTeams(teamsArray);
    }
  };

  // Fetch teams when the component mounts
  useEffect(() => {
    fetchTeams();
  }, []);

  const handleTeamClick = async (teamId) => {
    console.log();
    const channelsData = await getChannels(teamId);
    const channelsArray = channelsData ? Object.values(channelsData) : [];
    console.log(channelsArray);

    setTeamChannels(channelsArray);
    navigate(`/${teamId}/${channelsArray[0].id}`);
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
        {teams.map((team) => (
          <Avatar
            key={team.id}
            type="team"
            imageUrl={team.imageUrl || teamLogo}
            onClick={() => handleTeamClick(team.id)}
            name={team.name}
          />
        ))}
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
