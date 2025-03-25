import "./CreateTeam.css";

import { useState, useContext } from "react";
import { AppContext } from "../../../context/AppContext";

import { createTeam } from "../../../services/teams.service";
import { validateMedia } from "../../../utils/helpers";

import SubmitButton from "../../../components/button/Button";

//Dependency
import { useNavigate } from "react-router-dom";

function CreateTeam() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const { user } = useContext(AppContext);

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

  const handleCreateTeam = async () => {
    validateMedia(name);
    const teamData = await createTeam(name, user.uid, image);
    setName("");
    setImage(null);
    navigate(`/${teamData.id}/${Object.keys(teamData.chats)[0]}`);
  };

  return (
    <div className="add-team-container">
      <div className="add-team-header">
        <h2>Create team</h2>
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
          onClick={handleCreateTeam}
          label="Submit"
          className="submit-input"
        />
      </div>
    </div>
  );
}

export default CreateTeam;
