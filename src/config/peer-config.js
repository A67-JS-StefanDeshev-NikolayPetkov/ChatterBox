import Peer from "peerjs";

export const createPeer = (userId) => {
  return new Peer(userId);
};