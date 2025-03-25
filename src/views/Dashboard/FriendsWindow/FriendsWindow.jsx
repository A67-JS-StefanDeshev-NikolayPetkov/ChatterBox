import "./FriendsWindow.css";

//Components
import FriendsHeader from "./FriendsHeader/FriendsHeader";
import FriendsBody from "./FriendsBody/FriendsBody";

import { useContext, useEffect, useState } from "react";
import {
  cancelFriendRequest,
  acceptFriendRequest,
} from "../../../services/users.service";
import { AppContext } from "../../../context/AppContext";
import { createPeer } from "../../../config/peer-config";
import { set } from "firebase/database";

function FriendsWindow() {
  const { updateUserData, user } = useContext(AppContext);
  const [peer, setPeer] = useState(null);
  const [currentCall, setCurrentCall] = useState(null);
  const [localStream, setLocalStream] = useState(null);

  useEffect(() => {
    // Initialize PeerJS for the current user
    const peerInstance = createPeer(user.uid);
    setPeer(peerInstance);

    // Listen for incoming calls
    peerInstance.on("call", (call) => {
      const acceptCall = window.confirm("Incoming call. Do you want to answer?");
      if (acceptCall) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            setLocalStream(stream); // Store the local stream
    
            call.answer(stream); // Answer the call with your stream
            setCurrentCall(call);
    
            // Display the receiver's local video stream
            const localVideo = document.getElementById("local-video");
            if (localVideo) {
              localVideo.srcObject = stream;
            }
    
            call.on("stream", (remoteStream) => {
              // Display the sender's remote video stream
              const remoteVideo = document.getElementById("remote-video");
              if (remoteVideo) {
                remoteVideo.srcObject = remoteStream;
              }
            });
    
            call.on("close", () => {
              console.log("Call ended");
              endCall(); // Ensure cleanup when the call is closed
            });
          })
          .catch((err) => console.error("Failed to get local stream:", err));
      } else {
        call.close();
      }
    });

    return () => {
      peerInstance.destroy();
    };
  }, [user.uid]);

  const startCall = (friendId, isVideoCall) => {
    navigator.mediaDevices
      .getUserMedia({ video: isVideoCall, audio: true })
      .then((stream) => {
        setLocalStream(stream); // Store the local stream
  
        const call = peer.call(friendId, stream);
        setCurrentCall(call);
  
        // Display your local stream
        const localVideo = document.getElementById("local-video");
        if (localVideo) {
          localVideo.srcObject = stream;
        }
  
        call.on("stream", (remoteStream) => {
          // Display the remote stream
          const remoteVideo = document.getElementById("remote-video");
          if (remoteVideo) {
            remoteVideo.srcObject = remoteStream;
          }
        });
  
        call.on("close", () => {
          console.log("Call ended");
          endCall(); // Ensure cleanup when the call is closed
        });
      })
      .catch((err) => {
        if (err.name === "NotReadableError") {
          alert("The device is already in use by another application.");
        } else if (err.name === "NotAllowedError") {
          alert("Permission to access the microphone or camera was denied.");
        } else if (err.name === "OverconstrainedError") {
          alert("The requested media device is not available.");
        } else {
          alert("Failed to access media devices: " + err.message);
        }
        console.error("Failed to get local stream:", err);
      });
  };

  const endCall = () => {
    if (currentCall) {
      currentCall.close();
      setCurrentCall(null);
    }
  
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
      setCurrentCall(null);
      setPeer(null);
    }
  };

  async function handleCancelFriendRequest(
    userUid,
    foundUserUid,
    setAddButton
  ) {
    cancelFriendRequest(userUid, foundUserUid);
    updateUserData();
    if (setAddButton) setAddButton(true);
  }

  async function handleAcceptFriendRequest(foundUserUid, userUid) {
    acceptFriendRequest(foundUserUid, userUid);
    updateUserData();
  }

  return (
    <div className="friends-window">
      <FriendsHeader></FriendsHeader>
      <FriendsBody
        peer={peer}
        currentCall={currentCall}
        onStartCall={startCall}
        onEndCall={endCall}
        handleCancelFriendRequest={handleCancelFriendRequest}
        handleAcceptFriendRequest={handleAcceptFriendRequest}
      ></FriendsBody>
    </div>
  );
}

export default FriendsWindow;
