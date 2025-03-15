//Misc imports
import "./ChatsBar.css";

//Dependency imports
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

//Component imports
import UserHeader from "./UserHeader/UserHeader";
import ChatPreview from "../../../components/chat-preview/ChatPreview";

function ChatsBar({ setFriendsWindow }) {
  const { userData } = useContext(AppContext);

  return (
    <div className="chats-bar">
      <UserHeader setFriendsWindow={setFriendsWindow}></UserHeader>
      <div className="search-bar"></div>
      <div className={`chats-container ${!userData.chats && "center-flexbox"}`}>
        {!userData.chats && (
          <div className="flex-column center-flexbox">
            <p>No chats yet.</p>
            <p> Send a friend a message!</p>
          </div>
        )}
        {/* For each chat, call ChatPreview component */}
      </div>
    </div>
  );
}

export default ChatsBar;
