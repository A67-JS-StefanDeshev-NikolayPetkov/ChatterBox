//Misc imports
import "./ChannelBaloon.css";

function ChannelBalloon({ channelName, imageUrl, onClick }) {
  return (
    <div className="channel-balloon" onClick={onClick}>
      <img src={imageUrl} alt={channelName} className="channel-image" />
    </div>
  );
}

export default ChannelBalloon;
