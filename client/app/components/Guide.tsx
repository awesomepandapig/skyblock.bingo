import { ReactElement } from "react";

const convertColorCodes = (text: string) => {
  let currentIndex = 0;
  let result = "";
  text.replace(/§([a-f0-9klmnor])/g, (match, colorCode, offset) => {
    result += text.substring(currentIndex, offset);
    result += `<span class="mc-color-${colorCode}">`;
    currentIndex = offset + 2; // Skip color code
    return "";
  });
  result += text.substring(currentIndex); // Add remaining text
  result = result.replace(/\n/g, "<br />"); // Replace newlines with <br> tags
  // Remove all periods
  result = result.replace(/\./g, "");
  return result;
};

function title(goals: any, index: number): ReactElement<any> {
  if (index == 1 || index == 3 || index == 14 || index == 22) {
    return (
      <h3 className="text-[#2EB67D] font-bold text-2xl mb-4">
        {goals[index].name}
      </h3>
    );
  } else if (
    index == 5 ||
    index == 8 ||
    index == 11 ||
    index == 15 ||
    index == 17 ||
    index == 19
  ) {
    return (
      <h3 className="text-[#1ee0c0] font-bold text-2xl mb-4">
        {goals[index].name}
      </h3>
    );
  } else if (
    index == 7 ||
    index == 9 ||
    index == 13 ||
    index == 20 ||
    index == 21
  ) {
    return (
      <h3 className="text-[#1e78e0] font-bold text-2xl mb-4">
        {goals[index].name}
      </h3>
    );
  } else if (index == 2 || index == 10 || index == 16) {
    return (
      <h3 className="text-[#d01ee0] font-bold text-2xl mb-4">
        {goals[index].name}
      </h3>
    );
  } else if (index == 4 || index == 23) {
    return (
      <h3 className="text-[#E01E5A] font-bold text-2xl mb-4">
        {goals[index].name}
      </h3>
    );
  } else {
    return (
      <h3 className="text-[#ECB22E] font-bold text-2xl mb-4">
        {goals[index].name}
      </h3>
    );
  }
}

export default function Guide({
  params,
}: {
  params: { goals: any; guide: any; selectedGoal: number };
}) {
  if (params.selectedGoal == -1) {
    return (
      <div className="hidden lg:block w-full pb-4 text-left m-8">
        <div className="w-full p-4 rounded-xl bg-slate-700 overflow-y-auto text-slate-300">
          <p>You have completed all of your bingo goals</p>
          <p>Come back next month for a new bingo challenge!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden lg:block w-full pb-4 text-left m-8">
      {title(params.goals, params.selectedGoal)}
      <p
        className="mb-4 text-white"
        dangerouslySetInnerHTML={{
          __html: convertColorCodes(
            params.goals[params.selectedGoal].lore ||
              params.guide[params.selectedGoal].lore
          ),
        }}
      ></p>
      <div className="w-full p-4 rounded-xl bg-slate-700 overflow-y-auto">
        <p className="text-slate-300 mb-4">
          {params.guide[params.selectedGoal].method}
        </p>
        <p className="text-slate-300">
          {params.guide[params.selectedGoal].notes}
        </p>
      </div>
    </div>
  );
}
