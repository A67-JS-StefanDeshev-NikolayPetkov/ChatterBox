
import SubmitButton from "../button/Button";
import FieldError from "../forms/error/FieldError";
import Input from "../input/Input";
import "./CreateMedia.css";

function CreateMedia({ title, placeholder, value, setValue, onSubmit, error, setImage }) {

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("Uploaded Image Base64:", reader.result);
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
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="image-input"
      />
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