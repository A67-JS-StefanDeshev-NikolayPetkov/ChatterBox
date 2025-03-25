import "./CreateTeamChat.css";

import { useState, useContext } from "react";
import { AppContext } from "../../../context/AppContext";

import { createTeamChat } from "../../../services/teams.service";
import { validateMedia } from "../../../utils/helpers";

import SubmitButton from "../../../components/button/Button";

//Dependency
import { useNavigate, useParams } from "react-router-dom";

function CreateTeamChat() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const { user } = useContext(AppContext);
  const { teamId } = useParams();

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateChat = async () => {
    validateMedia(name);
    const chatData = await createTeamChat(teamId, name, [user.uid], image);
    setName("");
    setImage(null);
    navigate(`/${teamId}/${Object.keys(chatData)}`);
  };

  return (
    <div className="add-team-container">
      <div className="add-team-header">
        <h2>Create team chat</h2>
      </div>
      <div className="create-team-chat-container">
        <input
          className="name-input"
          type="text"
          placeholder={"Enter name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="upload-image-container">
          <div
            className="team-image-preview"
            style={{
              backgroundImage: previewImage ? `url(${previewImage})` : null,
            }}
            onClick={() => document.getElementById("file-upload").click()}
          >
            {!previewImage && <p>Upload image</p>}
          </div>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        {fileName && <p className="file-name">Selected: {fileName}</p>}
        <SubmitButton
          onClick={handleCreateChat}
          label="Submit"
          className="submit-input"
        />
      </div>
    </div>
  );
}

export default CreateTeamChat;
