import { get, set, ref, push } from "firebase/database";
import { db } from "../config/firebase-config";

const teamsRef = ref(db, "teams/");

// Function to create a new team
export const createTeam = async (
  name,
  ownerId,
  members = [],
  channels = []
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
  const newTeamRef = push(teamsRef);
  const teamId = newTeamRef.key;
  const teamData = { id: teamId, name, owner: ownerId, members, channels };

  await set(newTeamRef, teamData);
  return teamData;
};

//function to get all teams
export const getTeams = async () => {
  try {
    const teamsRef = ref(db, "teams");
    const snapshot = await get(teamsRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
};
