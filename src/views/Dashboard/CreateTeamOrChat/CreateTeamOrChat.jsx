import "./CreateTeamOrChat.css";

import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

import CreateTeamOrChatBody from "../../../components/create-team-chat-body/CreateTeamOrChatBody";
import { createTeam, createTeamChat } from "../../../services/teams.service";
import { validateMedia } from "../../../utils/helpers";

function CreateTeamOrChat({ whatToCreate }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const { user } = useContext(AppContext);
  const { team } = useParams();

  const handleCreateTeamChat = async () => {
    validateMedia(name);
    await createTeamChat(team, name, [user.uid], false, image);
    setName("");
    setImage(null);
  };

  const handleCreateTeam = async () => {
    validateMedia(name);
    await createTeam(name, user.uid, [user.uid], [], image);
    setName("");
    setImage(null);
  };

  return (
    <div className="add-team-container">
      <div className="add-team-header">
        <h2>{whatToCreate === "team" ? "Create team" : "Create chat"}</h2>
      </div>
      <CreateTeamOrChatBody
        placeholder="Enter name"
        name={name}
        setValue={setName}
        onSubmit={
          whatToCreate === "team" ? handleCreateTeam : handleCreateTeamChat
        }
        setImage={setImage}
      />
    </div>
  );
}

export default CreateTeamOrChat;
