import "./PendingRequest.css";

function PendingRequest({ request }) {
  return (
    <div className="pending-request">
      <p>User: {request.username}</p>
      <p>Email: {request.email}</p>
      <button>Accept</button>
      <button>Remove</button>
    </div>
  );
}

export default PendingRequest;
