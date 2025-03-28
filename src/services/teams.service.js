import {
  get,
  set,
  ref,
  push,
  update,
  runTransaction,
  onValue,
} from "firebase/database";
import { db } from "../config/firebase-config";

const teamsRef = ref(db, "teams/");

// Function to create a new team
export const createTeam = async (
  name,
  ownerId,
  imageUrl = "default-team.png"
) => {
  if (name.length < 3 || name.length > 40) {
    throw new Error("Team name must be between 3 and 40 characters.");
  }

  // Check if team name already exists
  const snapshot = await get(teamsRef);
  const teams = snapshot.val();
  if (teams) {
    const nameExists = Object.values(teams).some((team) => team.name === name);
    if (nameExists) throw new Error("Team name already exists.");
  }
  // Create a new team with a unique ID
  const userTeamsRef = ref(db, `users/${ownerId}/teams`);

  const newTeamRef = push(teamsRef);
  const teamId = newTeamRef.key;
  const teamData = {
    details: { name, owner: ownerId, imageUrl },
    members: { [ownerId]: true },
  };

  try {
    await set(newTeamRef, teamData);
    const generalChat = await createTeamChat(
      teamId,
      "General",
      [ownerId],
      null
    );

    await update(userTeamsRef, { [teamId]: true });

    // const updates = {};
    // members.forEach((memberUid) => {
    //   updates[`users/${memberUid}/teams/${teamId}`] = true;
    // });
    // await update(ref(db), updates);

    // Increment the teamsCount
    const teamsCountRef = ref(db, "teams/teamsCount");
    await runTransaction(teamsCountRef, (currentCount) => {
      return (currentCount || 0) + 1;
    });

    return { ...teamData, chats: generalChat, id: teamId };
  } catch (error) {
    throw new Error("Error creating team: " + error.message);
  }
};

// function to delete the team
export const deleteTeam = async (teamId) => {
  try {
    const teamRef = ref(db, `teams/${teamId}`);
    await set(teamRef, null);

    // Decrement the teamsCount
    const teamsCountRef = ref(db, "teamsCount");
    await runTransaction(teamsCountRef, (currentCount) => {
      return (currentCount || 1) - 1;
    });
  } catch (error) {
    throw new Error("Error deleting team: " + error.message);
  }
};

//function to get all teams
export const getTeamsDetails = async (teams) => {
  let teamsDetails = await Promise.all(
    teams.map(async (teamId) => {
      const teamDetails = (await get(ref(db, `teams/${teamId}/details`))).val();
      teamDetails.id = teamId;
      return teamDetails;
    })
  );

  return teamsDetails;
};

// Function to create a new channel
export const createTeamChat = async (
  teamId,
  name,
  creatorId,
  imageUrl = "default-chat.png"
) => {
  if (name.length < 3 || name.length > 40) {
    throw new Error("Channel name must be between 3 and 40 characters.");
  }
  const chatsRef = ref(db, `chats`);
  const teamChatsRef = ref(db, `teams/${teamId}/details/chats`);

  const newChatRef = push(chatsRef);
  const chatId = newChatRef.key;
  const channelData = {
    details: { name, imageUrl },
    members: { [creatorId]: true },
  };

  await set(newChatRef, channelData);
  await update(teamChatsRef, { [chatId]: true });

  return { [chatId]: channelData };
};

export const getTeamsCount = async () => {
  try {
    const teamsCountRef = ref(db, "teams/teamsCount");
    const snapshot = await get(teamsCountRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }
    return 0;
  } catch (error) {
    throw new Error("Error fetching teams count: " + error.message);
  }
};

export const subscribeToTeams = function (userUid, callback) {
  const teamsRef = ref(db, `/users/${userUid}/teams`);

  //When messages change, update local messages via callback passed in
  const unsubscribe = onValue(teamsRef, (snapshot) => {
    if (snapshot.exists()) callback(Object.keys(snapshot.val()));
  });

  return unsubscribe;
};

export const addToTeam = function (teamUid, userUid) {
  const teamRef = ref(db, `teams/${teamUid}/members`);
  const userRef = ref(db, `users/${userUid}/teams`);

  update(teamRef, { [userUid]: true });
  update(userRef, { [teamUid]: true });
};

export const leaveTeam = async function (teamUid, userUid) {
  const teamRef = ref(db, `teams/${teamUid}`);

  const teamMembersRef = ref(db, `teams/${teamUid}/members`);
  const userRef = ref(db, `users/${userUid}/teams`);

  await Promise.all([
    update(teamMembersRef, { [userUid]: null }),
    update(userRef, { [teamUid]: null }),
  ]);

  const teamMembersSnapshot = await get(teamMembersRef);

  //If no members remove team
  if (!teamMembersSnapshot.exists()) {
    await set(teamRef, null);
    const teamsCountRef = ref(db, "teams/teamsCount");
    await runTransaction(teamsCountRef, (currentCount) => {
      return (currentCount || 0) - 1;
    });
  }
};
