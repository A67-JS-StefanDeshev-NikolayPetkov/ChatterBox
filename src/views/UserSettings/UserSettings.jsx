import "./UserSettings.css";
import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { updateUserDetails, deleteUserProfile } from "../../services/users.service";
import { logoutUser } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";

function UserSettings() {
  const { user, userData, setContext } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: userData?.details?.username || "",
    phoneNumber: userData?.details?.phoneNumber || "",
    profilePicture: userData?.details?.profilePicture || "",
  });

  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="profilePicture">Profile Picture</label>
        <input type="file" id="profilePicture" onChange={handleFileChange} />
        {formData.profilePicture && (
          <img
            src={formData.profilePicture}
            alt="Profile Preview"
            className="profile-preview"
          />
        )}
      </div>
      <div className="form-group">
        <label htmlFor="password">Password (required to delete account)</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
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