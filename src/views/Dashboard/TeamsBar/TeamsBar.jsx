import "./TeamsBar.css";
import teamLogo from "../../../assets/default-team.png";
import logo from "../../../assets/chatterbox-logo-nobackground-white.svg";
import plusSign from "../../../assets/plus.svg";

// Component imports
import Avatar from "../../../components/avatar/Avatar";
import Modal from "../../../components/modal/Modal";

// Dependency imports
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { createTeam, getChannels } from "../../../services/teams.service";
import { AppContext } from "../../../context/AppContext";
import { getTeams } from "../../../services/teams.service";
import CreateMedia from "../../../components/createMedia/CreateMedia";
import { validateMedia } from "../../../utils/helpers";

function TeamsBar({ setSelectedTeamChannels, setSelectedTeam }) {
  const [teamName, setTeamName] = useState("");
  const [teamImage, setTeamImage] = useState(null);
  const [error, setError] = useState(null);
  const [teams, setTeams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  // Fetch teams from Firebase
  const fetchTeams = async () => {
    try {
      const teamsData = await getTeams();
      const teamsArray = Object.keys(teamsData)
        .map((key) => ({
          id: key,
          name: teamsData[key].name,
          imageUrl: teamsData[key].imageUrl,
          members: teamsData[key].members,
        }))
        .filter((team) => team.members && team.members.includes(user.uid));
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

  const handleNavigation = (teamId, channelName) => {
    if (typeof channelName !== "string" || typeof teamId !== "string") return;
    const team = teams.find((team) => team.id === teamId);
    team ? team.name : "";
    navigate(`/dashboard/${channelName}/general`);
  };

  const handleCreateTeam = async () => {
    try {
      validateMedia(teamName);
      // Create team in Firebase
      await createTeam(teamName, user.uid, [user.uid], [], teamImage);
      setError(null);
      setTeamName("");
      setTeamImage(null);
      fetchTeams();
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
      setTeamName("");
    }
  };

  const handleTeamClick = async (teamId) => {
    try {
      const channelsData = await getChannels(teamId);
      const channelsArray = channelsData ? Object.values(channelsData) : [];
      setSelectedTeamChannels(channelsArray);
      setSelectedTeam(teamId);
      const team = teams.find((team) => team.id === teamId);
      if (channelsArray.length > 0 && team) {
        navigate(`/${team.name}/${channelsArray[0].id}`);
      }
    } catch (error) {
      setError("Failed to load channels");
    } finally {
      setError(null);
    }
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

      <div className="add-team">
        <div>
          <Modal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setError(null);
            }}
          >
            <CreateMedia
              title="Create Team"
              placeholder="Enter team name"
              value={teamName}
              setValue={setTeamName}
              onSubmit={handleCreateTeam}
              error={error}
              setImage={setTeamImage}
            />
          </Modal>
        </div>
        <Avatar
          onClick={() => setIsModalOpen(true)}
          type="team"
          imageUrl={plusSign}
          name="Create Team"
        />
      </div>
    </div>
  );
}

export default TeamsBar;
