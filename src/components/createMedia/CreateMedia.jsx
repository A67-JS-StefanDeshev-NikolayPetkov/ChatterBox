import { useState } from "react";
import SubmitButton from "../button/Button";
import FieldError from "../forms/error/FieldError";
import Input from "../input/Input";
import "./CreateMedia.css";

function CreateMedia({ title, placeholder, value, setValue, onSubmit, error, setImage }) {
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
    <>
      <h2>{title}</h2>
      <Input
        placeholder={placeholder}
        value={value}
        setValue={setValue}
        className="team-input"
      />
      <label htmlFor="file-upload" className="custom-file-label">
        {previewImage ? (
          <img
            src={previewImage}
            alt="Preview"
            className="image-preview"
          />
        ) : (
          <div className="image-placeholder">Click to upload an image</div>
        )}
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="image-input"
        style={{ display: "none" }}
      />
      {fileName && <p className="file-name">Selected: {fileName}</p>}
      <SubmitButton
        onClick={onSubmit}
        label="Submit"
        className="submit-input"
      />
      {error && <FieldError label={error} />}
    </>
  );
};

export default CreateMedia;