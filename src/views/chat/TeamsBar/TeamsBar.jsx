import "./TeamsBar.css";
import logo from "../../../assets/chatterbox-logo-nobackground-white.svg";
import teamLogo from "../../../assets/chatterbox-logo-background-black.svg";
import plusSign from "../../../assets/plus.svg";

// Component imports
import ChannelBalloon from "../channelBalloon/ChannelBalloon";
import FieldError from "../../../components/forms/error/FieldError";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";

// Dependency imports
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { createTeam } from "../../../services/teams.service";
import { AppContext } from "../../../context/AppContext";
import { getTeams } from "../../../services/teams.service";
import Modal from "../../../components/modal/Modal";

function TeamsBar() {
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState(null);
  const [teams, setTeams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, userData } = useContext(AppContext);

  // Fetch teams from Firebase
  const fetchTeams = async () => {
    
    try {
      const teamsData = await getTeams();
      const teamsArray = Object.keys(teamsData).map((key) => ({
        id: key,
        name: teamsData[key].name,
      }));
      setTeams(teamsArray);
    } catch (error) {
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
    } finally {
      setTeamName("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="sidebar">
      <div className="team-logo">
        <ChannelBalloon
          imageUrl={logo}
          channelName="home"
          onClick={() => handleNavigation("")}
          title={"Home"}
        />
      </div>
      <div className="team-list">
        {teams.length === 0 ? (
          <p>No teams available for you, {userData.username}</p>
        ) : (
          teams.map((team) => (
            <div className="team" key={team.id}>
              <ChannelBalloon
                className="team-item"
                channelName={team.name}
                imageUrl={teamLogo}
                onClick={() => handleNavigation(team.name)}
                title={team.name}
              />
            </div>
          ))
        )}
      </div>

      <div className="add-team">
        <div>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2>Create Team</h2>
            {/* <input
              type="text"
              placeholder="Enter team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="team-input"
            /> */}
            <Input placeholder="Enter team name" value={teamName} setValue={setTeamName} className="team-input"/>
            <Button onClick={handleCreateTeam} label="Submit" className="submit-input"/>
          </Modal>
        </div>
        <ChannelBalloon
          className="add-channel"
          onClick={() => setIsModalOpen(true)}
          channelName="Create Team"
          imageUrl={plusSign}
          title="Create Team"
        />
        <FieldError label={error} />
      </div>
    </div>
  );
}

export default TeamsBar;
