//Misc imports
import "./ChatsBar.css";
import plusSign from "../../../assets/plus.svg";
import chatLogo from "../../../assets/default-chat.png";

//Dependency imports
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import { validateMedia } from "../../../utils/helpers";
import { createTeamChat, getChannels } from "../../../services/teams.service";

//Component imports
import UserHeader from "./UserHeader/UserHeader";
import ChatPreview from "../../../components/chat-preview/ChatPreview";
import Modal from "../../../components/modal/Modal";
import CreateMedia from "../../../components/createMedia/CreateMedia";
import Avatar from "../../../components/avatar/Avatar";

function ChatsBar({
  channels,
  activeChannelId,
  team,
  user,
  handleFetchAndSetTeamChats,
}) {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [channelImage, setChannelImage] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [newChannelTitle, setNewChannelTitle] = useState("");
  const [error, setError] = useState(null);

  const handleCreateTeamChat = async () => {
    try {
      if (!team) {
        throw new Error("No team selected.");
      }
      validateMedia(newChannelTitle);

      "Channel Image Base64:", channelImage;
      // Create channel in Firebase
      await createTeamChat(
        team,
        newChannelTitle,
        [user.uid],
        isPublic,
        channelImage
      );
      handleFetchAndSetTeamChats();
      setError(null);
      setNewChannelTitle("");
      setChannelImage(null);
      const channelsData = await getChannels(team);
      setChats(channelsData ? Object.values(channelsData) : []);
      // setChats((prevChats) => [...prevChats, newChannel]);
      setIsModalOpen(false);
      // handleNavigation(newChannelTitle);
    } catch (err) {
      setError(err.message);
      setNewChannelTitle("");
    }
  };

  const handleChannelClick = (channelId) => {
    navigate(`/${team}/${channelId}`);
  };

  return (
    <div className="chats-bar">
      <UserHeader></UserHeader>
      <div className="search-bar"></div>
      <div className={`chats-container`}>
        {/* If no chats in current team, show indication */}
        {channels.map((chat) => (
          <ChatPreview
            key={chat.id}
            chat={{
              name: chat.title,
              status: chat.isPublic ? "Public" : "Private",
              imageUrl: chat.imageUrl || chatLogo,
            }}
            isActive={chat.id === activeChannelId}
            setActiveChat={() => handleChannelClick(chat.id)}
          />
        ))}
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
                title="Create Channel"
                placeholder="Enter channel name"
                value={newChannelTitle}
                setValue={setNewChannelTitle}
                onSubmit={handleCreateTeamChat}
                error={error}
                setImage={setChannelImage}
              >
                <div className="channel-visibility-toggle">
                  <label>
                    <input
                      type="checkbox"
                      checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)}
                    />
                    Public Channel
                  </label>
                </div>
              </CreateMedia>
            </Modal>
          </div>
          {channels && channels.length > 0 && (
            <Avatar
              onClick={() => setIsModalOpen(true)}
              type="team"
              imageUrl={plusSign}
              name="Create Channel"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatsBar;
