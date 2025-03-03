import { get, set, ref, query, equalTo, orderByChild } from "firebase/database";
import { db } from "../config/firebase-config";

export const getUserByHandle = (handle) => {
  return get(ref(db, `users/${handle}`));
};

export const createUserHandle = (username, uid, email) => {
  return set(ref(db, `users/${username}`), {
    uid,
    email,
    createdOn: Date.now(),
  });
};

export const getUserData = (uid) => {
  return get(query(ref(db, "users"), orderByChild("uid"), equalTo(uid)));
};
