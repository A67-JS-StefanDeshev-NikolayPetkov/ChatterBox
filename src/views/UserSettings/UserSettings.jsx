import "./UserSettings.css";
import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { updateUserDetails, deleteUserProfile } from "../../services/users.service";
import { logoutUser } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function UserSettings() {
  const { user, userData, setContext } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: userData?.details?.username || "",
    phoneNumber: userData?.details?.phoneNumber || "",
    profilePicture: userData?.details?.profilePicture || "",
  });

  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("bg");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneInputChange = (phone, country) => {
    setFormData({ ...formData, phoneNumber: `+${phone}` });
    setCountryCode(country.dialCode);
  };

  const validatePhoneNumber = (phoneNumber) => {
    try {
      const formattedNumber = phoneNumber.startsWith("+") ? phoneNumber : `+${phoneNumber}`;
      const parsedNumber = parsePhoneNumberFromString(formattedNumber);
      return parsedNumber?.isValid() || false;
    } catch (error) {
      setError("Phone number validation error");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    if (!validatePhoneNumber(formData.phoneNumber)) {
      setError("Invalid phone number. Please enter a valid phone number.");
      return;
    }
    try {
      await updateUserDetails(user.uid, formData);
      setContext((prev) => ({
        ...prev,
        userData: {
          ...prev.userData,
          details: { ...prev.userData.details, ...formData },
        },
      }));
      navigate("/home");
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    }
  };

  const handleCancelChanges = () => {
    navigate("/home");
  };

  const handlePasswordVisibilityToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleDeleteProfile = async () => {
    try {
      if (!password) {
        setError("Password is required to delete your profile.");
        return;
      }

      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);

      await deleteUser(user);

      await deleteUserProfile(user.uid);

      await logoutUser();
      setContext({ user: null, userData: null });

      navigate("/home");
    } catch (err) {
      console.error("Error during profile deletion:", err);
      if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else {
        setError("Failed to delete profile. Please try again.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setContext({ user: null, userData: null });
      navigate("/home");
    } catch (err) {
      console.error("Error during logout:", err);
      setError("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="user-settings">
      <h2>Edit Profile</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <PhoneInput
          country={countryCode}
          value={formData.phoneNumber}
          onChange={handlePhoneInputChange}
          inputClass="phone-input"
          containerClass="phone-input-container"
          enableSearch
        />
      </div>
      <div className="form-group">
        <label>Profile Picture</label>
        <label htmlFor="profilePicture" className="profile-picture-label">
          <img
            src={formData.profilePicture || "default-avatar.png"}
            alt="Profile Preview"
            className="profile-preview"
          />
        </label>
        <input
          type="file"
          id="profilePicture"
          name="profilePicture"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
      <div className="form-group password-group">
        <label htmlFor="password">Password (required to delete account)</label>
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"} // Toggle input type
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="toggle-password-btn"
            onClick={handlePasswordVisibilityToggle}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
      </div>
      <button onClick={handleSaveChanges} className="save-btn">
        Save Changes
      </button>
      <button onClick={handleCancelChanges} className="cancel-btn">
        Cancel Changes
      </button>
      <button onClick={handleDeleteProfile} className="delete-btn">
        Delete Profile
      </button>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}

export default UserSettings;