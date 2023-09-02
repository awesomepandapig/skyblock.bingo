import ActiveGoals from "../../components/ActiveGoals";
import Container from "../../components/Container";
import Unavailable from "@/app/components/Unavailable";
import { redirect } from "next/navigation";

const key = process.env.API_KEY;

async function getUser(user: string): Promise<User> {
  let url = "";
  if (user.length > 16) {
    url = `https://api.mojang.com/user/profile/${user}`;
  } else {
    url = `https://api.mojang.com/users/profiles/minecraft/${user}`;
  }
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok || data.errorMessage) {
    throw new Error(`Failed to obtain UUID`);
  }
  return data;
}

async function getCurrentEvent(): Promise<CurrentEvent> {
  const url = "https://api.hypixel.net/resources/skyblock/bingo";
  const res = await fetch(url, { next: { revalidate: 500 } });
  const data = await res.json();
  if (!res.ok || !data.success || data.goals == null) {
    throw new Error(`Failed to obtain the current event`);
  }
  return data;
}

async function getBingoData(uuid: string): Promise<BingoData> {
  const url = `https://api.hypixel.net/skyblock/bingo?key=${key}&uuid=${uuid}`;
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(`Failed to obtain bingo data for ${uuid}`);
  }
  return data;
}

function getUserData(currEvent: CurrentEvent, bingoData: BingoData): UserData {
  let userData: UserData = {
    completions: 0,
    points: 0,
    totalPoints: 0,
    completedGoals: [],
    bingoRank: 0,
    hypixelRank: 'NORMAL',
    globalRank: 0,
  };
  const latestPlayed = bingoData.events[bingoData.events.length - 1];
  if (bingoData.events.length != 0 && bingoData.events != undefined) {
    if (currEvent.id == latestPlayed.key) {
      userData.completedGoals = latestPlayed.completed_goals;
      userData.points = latestPlayed.points;
      for (let i = 0; i < bingoData.events.length; i++) {
        if (bingoData.events[i].completed_goals.length == 20) {
          userData.completions++;
        }
        userData.totalPoints += bingoData.events[i].points;
      }
    }
  }
  return userData;
}

async function getPlayerData(uuid: string): Promise<ProfileData> {
  const url = `https://api.hypixel.net/skyblock/profiles?key=${key}&uuid=${uuid}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(`Unable to find bingo profile for ${uuid}`);
  }
  return data;
}

// Determines the user's bingo rank (based on their active bingo pet)
async function getBingoRank(uuid: string, userData: UserData) {
  if (userData.totalPoints < 50) {
   return
  }
  let profiles: Profile[];
  try {
    profiles = (await getPlayerData(uuid)).profiles;
  } catch (error) {
    throw error;
  }
  for (let i = 0; i < profiles.length; i++) {
    if (profiles[i].game_mode == "bingo") {
      if (profiles[i].members[uuid].pets[0] != undefined) {
        if (profiles[i].members[uuid].pets[0].tier == "UNCOMMON") {
          userData.bingoRank = 1;
        }
        if (profiles[i].members[uuid].pets[0].tier == "RARE") {
          userData.bingoRank = 2;
        }
        if (profiles[i].members[uuid].pets[0].tier == "EPIC") {
          userData.bingoRank = 3;
        }
        if (profiles[i].members[uuid].pets[0].tier == "LEGENDARY") {
          userData.bingoRank = 4;
        }
      }
    }
  }
}

async function getHypixelRank(uuid: string, userData: UserData) {
  const url = `https://api.hypixel.net/player?key=${key}&uuid=${uuid}`
  const res = await fetch(url)
  const data = await res.json()
  if(!res.ok) {
    throw new Error(`Failed to obtain Hypixel rank for ${uuid}`);
  }

  if(data.rank != undefined) {
    userData.hypixelRank = data.rank;
  } else if(data.monthlyPackageRank != undefined && data.monthlyPackageRank != 'NONE') {
    userData.hypixelRank = data.monthlyPackageRank;
  } else if(data.newPackageRank != undefined) {
    userData.hypixelRank = data.newPackageRank;
  } else if(data.packageRank != undefined) {
    userData. hypixelRank = data.packageRank;
  }
}

async function getGuide(): Promise<Array<GuideEntry>> {
  const url = `https://api.skyblock.bingo/guide`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Failed to obtain guide");
  }
  return data;
}

async function getLeaderboardPos(uuid: string): Promise<LeaderboardPosition> {
  const url = `https://api.skyblock.bingo/leaderboard/${uuid}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Failed to obtain leaderboard position for ${uuid}`);
  }
  return data;
}

export default async function Home({ params }: { params: { user: string } }) {
  let user: User;
  try {
    user = await getUser(params.user);
  } catch (error) {
    console.error(error);
    redirect("/");
  }

  let currentEvent: CurrentEvent;
  try {
    currentEvent = await getCurrentEvent();
  } catch (error) {
    console.error();
    return <Unavailable errorMessage={JSON.stringify(error)}/>
  }

  let bingoData: BingoData;
  try {
    bingoData = await getBingoData(user.id);
  } catch (error) {
    console.error();
    bingoData = {success:false, events:[]}
  }

  let userData = getUserData(currentEvent, bingoData);
  await getBingoRank(user.id, userData);
  await getHypixelRank(user.id, userData);

  /* FIX THESE TWO  */
  let guide: GuideEntry[] = [];
  try {
    guide = await getGuide();
  } catch (error) {
    console.error(error);
    return <Unavailable errorMessage={JSON.stringify(error)}/>
  }

  let leaderboardPos: LeaderboardPosition = { Rank: 0, Score: 0 };
  try {
    leaderboardPos = await getLeaderboardPos(user.id);
  } catch (error) {
    console.error(error);
    return <Unavailable errorMessage={JSON.stringify(error)}/>
  }
  userData.globalRank = leaderboardPos.Rank + 1;

  const containerData = {
    user,
    goals: currentEvent.goals,
    userData,
    guide,
  };

  return (
    <main>
      <Container params={containerData} />
      <ActiveGoals params={containerData} />
    </main>
  );
}
