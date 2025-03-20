//Misc imports
import "./ChatsBar.css";
import plusSign from "../../../assets/plus.svg";

//Dependency imports
import { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { validateMedia } from "../../../utils/helpers";
import { createChannel, getChannels } from "../../../services/teams.service";

//Component imports
import UserHeader from "./UserHeader/UserHeader";
import ChatPreview from "../../../components/chat-preview/ChatPreview";
import Modal from "../../../components/modal/Modal";
import CreateMedia from "../../../components/createMedia/CreateMedia";
import Avatar from "../../../components/avatar/Avatar";

function ChatsBar({ channels }) {
  const { userData } = useContext(AppContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [newChannelTitle, setNewChannelTitle] = useState("");
  const [error, setError] = useState(null);

  const handleNavigation = (channelName) => {
    if (typeof channelName !== "string") return;
    navigate(`/dashboard/${channelName}/general`);
  };

  const handleCreateChannel = async () => {
    try {
      validateMedia(newChannelTitle);
      // Create channel in Firebase
      await createChannel(selectedTeam, newChannelTitle, [user.uid], isPublic);
      setError(null);
      setNewChannelTitle("");
      const channelsData = await getChannels(selectedTeam);
      setChats(channelsData ? Object.values(channelsData) : []);
      setIsModalOpen(false);
      handleNavigation(newChannelTitle);
    } catch (err) {
      setError(err.message);
      setNewChannelTitle("");
    }
  };

  return (
    <div className="chats-bar">
      <UserHeader></UserHeader>
      <div className="search-bar"></div>
      <div className={`chats-container ${!userData.chats && "center-flexbox"}`}>
        {/* {!userData.chats && (
          <div className="flex-column center-flexbox">
            <p>No chats yet.</p>
            <p> Send a friend a message!</p>
          </div>
        )} */}
        {channels.map((chat) => (
          <ChatPreview
            key={chat.id}
            chat={{
              name: chat.title,
              status: chat.isPublic ? "Public" : "Private",
            }}
            setActiveChat={() => console.log(`Active chat: ${chat.title}`)}
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
                onSubmit={handleCreateChannel}
                error={error}
              />
            </Modal>
          </div>
          <Avatar
            onClick={() => setIsModalOpen(true)}
            type="team"
            imageUrl={plusSign}
            name="Create Channel"
          />
        </div>
      </div>
    </div>
  );
}

export default ChatsBar;
