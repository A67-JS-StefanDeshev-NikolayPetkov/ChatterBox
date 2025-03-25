import { useState, useEffect } from "react";

function CallManager({ peer, userId, onCallEnd }) {
  const [currentCall, setCurrentCall] = useState(null);
  const [localStream, setLocalStream] = useState(null);

  useEffect(() => {
    if (!peer) return;

    peer.on("call", (call) => {
      const acceptCall = window.confirm("Incoming call. Do you want to answer?");
      if (acceptCall) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            setLocalStream(stream);
            call.answer(stream);
            setCurrentCall(call);

            const localVideo = document.getElementById("local-video");
            if (localVideo) {
              localVideo.srcObject = stream;
            }

            call.on("stream", (remoteStream) => {
              const remoteVideo = document.getElementById("remote-video");
              if (remoteVideo) {
                remoteVideo.srcObject = remoteStream;
              }
            });

            call.on("close", () => {
              console.log("Call ended");
              endCall();
            });
          })
          .catch((err) => console.error("Failed to get local stream:", err));
      } else {
        call.close();
      }
    });

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      peer.destroy();
    };
  }, [peer, localStream]);

  const startCall = (friendId, isVideoCall) => {
    if (!peer) {
      console.error("Peer instance is not initialized yet.");
      alert("Unable to start the call. Please wait for the system to initialize.");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: isVideoCall, audio: true })
      .then((stream) => {
        setLocalStream(stream);

        const call = peer.call(friendId, stream);
        setCurrentCall(call);

        const localVideo = document.getElementById("local-video");
        if (localVideo) {
          localVideo.srcObject = stream;
        }

        call.on("stream", (remoteStream) => {
          const remoteVideo = document.getElementById("remote-video");
          if (remoteVideo) {
            remoteVideo.srcObject = remoteStream;
          }
        });

        call.on("close", () => {
          console.log("Call ended");
          endCall();
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
    }

    if (onCallEnd) {
      onCallEnd();
    }
  };

  return { startCall, endCall, currentCall, localStream };
}

export default CallManager;