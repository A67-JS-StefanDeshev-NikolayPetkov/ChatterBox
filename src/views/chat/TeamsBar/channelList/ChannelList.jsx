import "./ChannelList.css";

function ChannelsList ({ channels }) {
  return (
    <div className="channels-list">
      <h3>Channels</h3>
      {channels.length === 0 ? (
        <p>No channels available.</p>
      ) : (
        <ul>
          {channels.map((channel) => (
            <li key={channel.id}>{channel.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChannelsList;