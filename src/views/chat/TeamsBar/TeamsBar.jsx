import "./TeamsBar.css";
import logo from "../../../assets/chatterbox-logo-nobackground-white.svg";
import teamLogo from "../../../assets/chatterbox-logo-background-black.svg";
import plusSign from "../../../assets/plus.svg";

// Component imports
import Avatar from "../../../components/avatar/Avatar";
import Modal from "../../../components/modal/Modal";
import ChannelsList from "./channelList/ChannelList";

// Dependency imports
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import {
  createTeam,
  getChannels,
  createChannel,
} from "../../../services/teams.service";
import { AppContext } from "../../../context/AppContext";
import { getTeams } from "../../../services/teams.service";
import CreateMedia from "../../../components/createMedia/CreateMedia";
import { validateMedia } from "../../../utils/helpers";

function TeamsBar() {
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState(null);
  const [teams, setTeams] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [channels, setChannels] = useState([]);
  const [viewChannels, setViewChannels] = useState(false);
  const [newChannelTitle, setNewChannelTitle] = useState("");
  const [isPublic, setIsPublic] = useState(true);
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
      const newTeam = await createTeam(teamName, user.uid, [user.uid], []);
      setError(null);
      setTeamName("");
      fetchTeams();
      setIsModalOpen(false);
      const channelsData = await getChannels(newTeam.id);
      setChannels(channelsData ? Object.values(channelsData) : []);
    } catch (err) {
      setError(err.message);
      setTeamName("");
    }
  };

  const handleTeamClick = async (teamId) => {
    setSelectedTeam(teamId);
    try {
      const channelsData = await getChannels(teamId);
      setChannels(channelsData ? Object.values(channelsData) : []);
      setViewChannels(true);
    } catch (error) {
      setError("Failed to load channels");
    }
  };

  const handleCreateChannel = async () => {
    try {
      validateMedia(newChannelTitle);
      // Create channel in Firebase
      await createChannel(selectedTeam, newChannelTitle, [user.uid], isPublic);
      setError(null);
      setNewChannelTitle("");
      const channelsData = await getChannels(selectedTeam);
      setChannels(channelsData ? Object.values(channelsData) : []);
      setIsModalOpen(false);
      // handleNavigation(selectedTeam,newChannelTitle);
    } catch (err) {
      setError(err.message);
      setNewChannelTitle("");
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
        {!viewChannels
          ? teams.length !== 0 &&
            teams.map((team) => (
              <Avatar
                key={team.id}
                type="team"
                imageUrl={teamLogo}
                onClick={() => handleTeamClick(team.id)}
                name={team.name}
              />
            ))
          : channels.length !== 0 &&
            channels.map((channel) => (
              <Avatar
                key={channel.id}
                type="team"
                onClick={() => handleNavigation(selectedTeam, channel.title)}
                name={channel.title}
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
            {!viewChannels ? (
              <CreateMedia
                title="Create Team"
                placeholder="Enter team name"
                value={teamName}
                setValue={setTeamName}
                onSubmit={handleCreateTeam}
                error={error}
              />
            ) : (
              <CreateMedia
                title="Create Channel"
                placeholder="Enter channel name"
                value={newChannelTitle}
                setValue={setNewChannelTitle}
                onSubmit={handleCreateChannel}
                error={error}
              />
            )}
          </Modal>
        </div>
        <Avatar
          onClick={() => setIsModalOpen(true)}
          type="team"
          imageUrl={plusSign}
          name={viewChannels ? "Create Channel" : "Create Team"}
        />
      </div>
    </div>
  );
}

export default TeamsBar;
