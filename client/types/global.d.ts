import { UUID } from "crypto";

export {};

declare global {
  interface User {
    id: string;
    name: string;
  }

  interface CurrentEvent {
    success: string;
    lastUpdated: EpochTimeStamp;
    id: number;
    goals: [];
  }

  interface Event {
    key: number;
    points: number;
    completed_goals: string[];
  }

  interface BingoData {
    success: boolean;
    events: Event[];
  }

  interface GuideEntry {
    name: string;
    lore: string;
    method: string;
    notes: string;
  }

  interface LeaderboardPosition {
    Rank: number;
    Score: number;
  }
  
  interface Member {
    pets: Array<{
      uuid: UUID | null;
      type: string;
      exp: number;
      active: boolean;
      tier: string;
      heldItem: string;
      candyUsed: number;
      skin: string | null;
    }>;
  }

  interface Profile {
    profile_id: UUID;
    community_upgrades: object;
    created_at: EpochTimeStamp;
    members: Record<string, Member>;
    game_mode: string;
    cute_name: string;
    selected: string;
  }

  interface ProfileData {
    success: boolean;
    profiles: Profile[];
  }

  interface UserData {
    completions: number;
    points: number;
    totalPoints: number;
    completedGoals: string[];
    bingoRank: number;
    hypixelRank: string;
    globalRank: number;
  }
}
