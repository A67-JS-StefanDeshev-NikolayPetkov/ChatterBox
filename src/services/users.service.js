import { get, set, ref, query, equalTo, orderByChild } from "firebase/database";
import { db } from "../config/firebase-config";

export const getUserByUid = (uid) => {
  return get(ref(db, `users/${uid}`));
};

export const createUserHandle = (username, uid, email) => {
  return set(ref(db, `users/${uid}`), {
    username,
    email,
    createdOn: Date.now(),
  });
};

export const getUserByUsername = (username) => {
  return get(
    query(ref(db, "users"), orderByChild("username"), equalTo(username))
  );
};
