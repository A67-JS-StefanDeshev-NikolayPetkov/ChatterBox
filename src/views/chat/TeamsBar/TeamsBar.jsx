import "./TeamsBar.css";
import logo from "../../../assets/chatterbox-logo-nobackground-white.svg";
import teamLogo from "../../../assets/chatterbox-logo-background-black.svg";

// Component imports
import ChannelBalloon from "../../../components/channelBaloon/ChannelBaloon";
import FieldError from "../../../components/forms/error/FieldError";

// Dependency imports
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { createTeam } from "../../../services/teams.service";
import { AppContext } from "../../../context/AppContext";
import { getTeams } from "../../../services/teams.service";

function TeamsBar() {
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState(null);
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  // Fetch teams from Firebase
  const fetchTeams = async () => {
    try {
      const teamsData = await getTeams();
      const teamsArray = Object.keys(teamsData).map((key) => ({
        id: key,
        name: teamsData[key].name,
      }));
      setTeams(teamsArray);
    } catch (err) {
      setError("Failed to load teams");
    } finally {
      setError(null);
    }
  };

  // Fetch teams when the component mounts
  useEffect(() => {
    fetchTeams();
  }, []);

  const handleNavigation = (channelName) => {
    if (typeof channelName !== "string") return;
    navigate(`/home/${channelName}`);
  };

  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      setError("Team name cannot be empty.");
      return;
    }

    try {
      // Create team in Firebase
      await createTeam(teamName, user.uid, [user.uid], []);
      setError(null);
      setTeamName("");
      fetchTeams();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="sidebar">
      <ChannelBalloon
        imageUrl={logo}
        channelName="home"
        onClick={() => handleNavigation("")}
      />
      <h2>Teams</h2>
      <div className="team-list">
        {teams.length === 0 ? (
          <p>No teams available.</p>
        ) : (
          teams.map((team) => (
            <div className="team" key={team.id}>
              <ChannelBalloon
                className="team-item"
                channelName={team.name}
                imageUrl={teamLogo}
                onClick={() => handleNavigation(team.name)}
                data-tooltip={team.name}
              />
              {/* <span>{team.name}</span> */}
            </div>
          ))
        )}
      </div>

      <div className="add-team">
        <h2>Create Team</h2>
        <input
          type="text"
          placeholder="Enter team name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="team-input"
        />
        <div className="add-channel" onClick={handleCreateTeam}>
          <span className="plus-sign">+</span>
        </div>
        {/* Display error message, if any */}
        <FieldError label={error} />
      </div>
    </div>
  );
}

export default TeamsBar;
