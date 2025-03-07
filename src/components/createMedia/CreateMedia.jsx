
import SubmitButton from "../button/Button";
import FieldError from "../forms/error/FieldError";
import Input from "../input/Input";
import "./CreateMedia.css";

function CreateMedia({ title, placeholder, value, setValue, onSubmit, error }){
  return (
    <>
      <h2>{title}</h2>
      <Input
        placeholder={placeholder}
        value={value}
        setValue={setValue}
        className="team-input"
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