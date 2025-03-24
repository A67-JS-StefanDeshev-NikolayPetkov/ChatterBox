import { useState } from "react";
import SubmitButton from "../button/Button";
import FieldError from "../forms/error/FieldError";
import "./CreateTeamOrChatBody.css";

function CreateTeamOrChatBody({
  placeholder,
  name,
  setValue,
  onSubmit,
  error,
  setImage,
}) {
  const [fileName, setFileName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

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

  return (
    <div className="create-team-chat-container">
      <input
        className="name-input"
        type="text"
        placeholder={placeholder}
        value={name}
        onChange={(e) => setValue(e.target.value)}
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
        onClick={onSubmit}
        label="Submit"
        className="submit-input"
      />
      {error && <FieldError label={error} />}
    </div>
  );
}

export default CreateTeamOrChatBody;
