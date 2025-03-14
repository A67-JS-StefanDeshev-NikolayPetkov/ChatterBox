import {
  get,
  set,
  ref,
  query,
  equalTo,
  orderByChild,
  onValue,
  onDisconnect,
} from "firebase/database";
import { db } from "../config/firebase-config";

export const createUserHandle = (username, uid, email) => {
  return set(ref(db, `users/${uid}`), {
    username,
    email,
    createdOn: Date.now(),
  });
};

export const getUserByUid = (uid) => {
  return get(ref(db, `users/${uid}`));
};

export const getUserByUsername = (username) => {
  return get(
    query(ref(db, "users"), orderByChild("username"), equalTo(username))
  );
};

export const isUserOnline = (uid) => {
  const connectedRef = ref(db, ".info/connected");

  onValue(connectedRef, (snapshot) => {
    if (snapshot.val() === true) {
      set(ref(db, `users/${uid}/status`), "online");
      onDisconnect(ref(db, `users/${uid}/status`)).set("offline");
    }
  });
};

export const updateUserStatus = (uid, status) => {
  return set(ref(db, `users/${uid}/status`), status);
};
