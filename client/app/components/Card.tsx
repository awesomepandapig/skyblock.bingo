"use client";

import Blackout from "./Blackout";

export default function Card({
  params,
}: {
  params: { goals: any; setGoal: any; completedGoals: Array<string> };
}) {
  if (params.completedGoals.length == 20) {
    params.setGoal(-1);
    return <Blackout />;
  }
  let hashmap = new Map<string, boolean>();
  for (let i = 0; i < params.completedGoals.length; i++) {
    hashmap.set(params.completedGoals[i], true);
  }

  console.log(hashmap);

  let buttonClass = `w-1/5 lg:w-20 aspect-square border-slate-800 active:bg-opacity-60`;
  function getBackgroundColor(num: number, color: string) {
    if (color == "#ECB22E") {
      return hashmap.get(params.goals[num].id) ? "bg-black" : "bg-[#ECB22E]";
    } else if (color == "#D01EE0") {
      return hashmap.get(params.goals[num].id) ? "bg-black" : "bg-[#D01EE0]";
    } else if (color == "#2EB67D") {
      return hashmap.get(params.goals[num].id) ? "bg-black" : "bg-[#2EB67D]";
    } else if (color == "#E01E5A") {
      return hashmap.get(params.goals[num].id) ? "bg-black" : "bg-[#E01E5A]";
    } else if (color == "#1EE0C0") {
      return hashmap.get(params.goals[num].id) ? "bg-black" : "bg-[#1EE0C0]";
    } else if (color == "#1E78E0") {
      return hashmap.get(params.goals[num].id) ? "bg-black" : "bg-[#1E78E0]";
    }
  }

  return (
    <div className="flex flex-col w-full lg:w-[400px] aspect-square mb-4 mt-4 lg:m-4 rounded-xl">
      <div className="flex flex-row">
        <button
          onClick={() => params.setGoal(0)}
          className={`${getBackgroundColor(
            0,
            "#ECB22E"
          )} ${buttonClass} border-b border-r rounded-tl-xl`}
        ></button>
        <button
          onClick={() => params.setGoal(1)}
          className={`${getBackgroundColor(
            1,
            "#2EB67D"
          )} ${buttonClass} border-b border-r`}
        ></button>
        <button
          onClick={() => params.setGoal(2)}
          className={`${getBackgroundColor(
            2,
            "#D01EE0"
          )} ${buttonClass} border-b border-r`}
        ></button>
        <button
          onClick={() => params.setGoal(3)}
          className={`${getBackgroundColor(
            3,
            "#2EB67D"
          )} ${buttonClass} border-b border-r`}
        ></button>
        <button
          onClick={() => params.setGoal(4)}
          className={`${getBackgroundColor(
            4,
            "#E01E5A"
          )} ${buttonClass} border-b rounded-tr-xl`}
        ></button>
      </div>
      <div className="flex flex-row">
        <button
          onClick={() => params.setGoal(5)}
          className={`${getBackgroundColor(
            5,
            "#1EE0C0"
          )} ${buttonClass} border-b border-r`}
        ></button>
        <button
          onClick={() => params.setGoal(6)}
          className={`${getBackgroundColor(
            6,
            "#ECB22E"
          )} ${buttonClass} border-b border-r`}
        ></button>
        <button
          onClick={() => params.setGoal(7)}
          className={`${getBackgroundColor(
            7,
            "#1E78E0"
          )} ${buttonClass} border-b border-r`}
        ></button>
        <button
          onClick={() => params.setGoal(8)}
          className={`${getBackgroundColor(
            8,
            "#1EE0C0"
          )} ${buttonClass} border-b border-r`}
        ></button>
        <button
          onClick={() => params.setGoal(9)}
          className={`${getBackgroundColor(
            9,
            "#1E78E0"
          )} ${buttonClass} border-b`}
        ></button>
      </div>
      <div className="flex flex-row">
        <button
          onClick={() => params.setGoal(10)}
          className={`${getBackgroundColor(
            10,
            "#D01EE0"
          )} ${buttonClass} border-b border-r`}
        ></button>
        <button
          onClick={() => params.setGoal(11)}
          className={`${getBackgroundColor(
            11,
            "#1EE0C0"
          )} ${buttonClass} border-b border-r`}
        ></button>
        <button
          onClick={() => params.setGoal(12)}
          className={`${getBackgroundColor(
            12,
            "#ECB22E"
          )} ${buttonClass} border-b border-r`}
        ></button>
        <button
          onClick={() => params.setGoal(13)}
          className={`${getBackgroundColor(
            13,
            "#1E78E0"
          )} ${buttonClass} border-b border-r`}
        ></button>
        <button
          onClick={() => params.setGoal(14)}
          className={`${getBackgroundColor(
            14,
            "#2EB67D"
          )} ${buttonClass} border-b`}
        ></button>
      </div>
      <div className="flex flex-row">
        <button
          onClick={() => params.setGoal(15)}
          className={`${getBackgroundColor(
            15,
            "#1EE0C0"
          )} ${buttonClass} border-b border-r`}
        ></button>
        <button
          onClick={() => params.setGoal(16)}
          className={`${getBackgroundColor(
            16,
            "#D01EE0"
          )} ${buttonClass} border-b border-r`}
        ></button>
        <button
          onClick={() => params.setGoal(17)}
          className={`${getBackgroundColor(
            17,
            "#1EE0C0"
          )} ${buttonClass} border-b border-r`}
        ></button>
        <button
          onClick={() => params.setGoal(18)}
          className={`${getBackgroundColor(
            18,
            "#ECB22E"
          )} ${buttonClass} border-b border-r`}
        ></button>
        <button
          onClick={() => params.setGoal(19)}
          className={`${getBackgroundColor(
            19,
            "#1EE0C0"
          )} ${buttonClass} border-b`}
        ></button>
      </div>
      <div className="flex flex-row">
        <button
          onClick={() => params.setGoal(20)}
          className={`${getBackgroundColor(
            20,
            "#1E78E0"
          )} ${buttonClass} border-r rounded-bl-xl`}
        ></button>
        <button
          onClick={() => params.setGoal(21)}
          className={`${getBackgroundColor(
            21,
            "#1E78E0"
          )} ${buttonClass} border-r`}
        ></button>
        <button
          onClick={() => params.setGoal(22)}
          className={`${getBackgroundColor(
            22,
            "#2EB67D"
          )} ${buttonClass} border-r`}
        ></button>
        <button
          onClick={() => params.setGoal(23)}
          className={`${getBackgroundColor(
            23,
            "#E01E5A"
          )} ${buttonClass} border-r`}
        ></button>
        <button
          onClick={() => params.setGoal(24)}
          className={`${getBackgroundColor(
            24,
            "#ECB22E"
          )} ${buttonClass} rounded-br-xl`}
        ></button>
      </div>
    </div>
  );
}
