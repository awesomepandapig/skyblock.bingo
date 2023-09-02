"use client";

import Card from "./Card";
import Player from "./Player";
import { useState } from "react";

/* CHECK WHAT HAPPENS WHEN REMOVING REACT.MEMO */

export default function Container({
  params,
}: {
  params: { user: User; goals: []; userData: UserData; guide: GuideEntry[] };
}) {
  const [selectedGoal, setSelectedGoal] = useState(0);
  function handleSelectedGoal(selectedGoal: number) {
    setSelectedGoal(selectedGoal);
  }

  const playerData = {
    user: params.user,
    goals: params.goals,
    userData: params.userData,
    guide: params.guide,
    selectedGoal,
  };

  const cardData = {
    goals: params.goals,
    completedGoals: params.userData.completedGoals,
    setGoal: handleSelectedGoal,
  };

  return (
    <div className="flex flex-col-reverse ml-4 mr-4 lg:flex-row lg:m-0">
      <Card params={cardData} />
      <Player params={playerData} />
    </div>
  );
}
