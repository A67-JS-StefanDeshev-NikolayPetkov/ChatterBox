//Style imports
"./AddFriendModal.css";

function AddFriendModal({ setIsAddFriendOpen }) {
  return (
    <div
      className="modal-overlay"
      onClick={() => setIsAddFriendOpen(false)}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Add a Friend</h2>
        <input
          type="text"
          placeholder="Enter username or email"
        />
        <button onClick={() => setIsAddFriendOpen(false)}>Close</button>
      </div>
    </div>
  );
}

export default AddFriendModal;
