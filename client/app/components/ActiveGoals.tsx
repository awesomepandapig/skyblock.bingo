interface Goal {
  lore: string;
  name: string;
}

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

export default async function goals({ params }: { params: { goals: any } }) {
  // Parse regular goal strings
  const goals = params.goals.map((goal: Goal, index: number) => {
    const goalText = convertColorCodes(goal.lore || goal.name || "");
    return <p key={index} dangerouslySetInnerHTML={{ __html: goalText }} />;
  });

  // Parse community goals
  const community_goals = [
    params.goals[0],
    params.goals[6],
    params.goals[12],
    params.goals[18],
    params.goals[24],
  ];
  for (let i = 0; i < community_goals.length; i++) {
    let result = `${community_goals[i].name} -`;
    for (let tier = 0; tier < community_goals[i].tiers.length; tier++) {
      if (community_goals[i].progress > community_goals[i].tiers[tier]) {
        result += ` <span class="mc-color-a">${community_goals[i].tiers[tier]}`;
        if (tier < community_goals[i].tiers.length - 1) {
          result += ",</span>";
        } else {
          result += "</span>";
        }
      } else {
        result += ` ${community_goals[i].tiers[tier]}`;
        if (tier < community_goals[i].tiers.length - 1) {
          result += ",";
        }
      }
    }
    result += "<br/>";
    goals[6 * i] = result;
  }

  return (
    <div className="ml-4 mr-4 mb-4 lg:mb-0 w-screen-4 bg-slate-800 rounded-xl p-4 lh">
      <h3 className="text-[#2EB67D] font-bold text-xl">Tier 1</h3>
      <div className="leading-[19.5px]">
        {[goals[1], goals[3], goals[14], goals[22]]}
      </div>
      <h3 className="text-[#1ee0c0] font-bold text-xl mt-4">Tier 2</h3>
      <div className="leading-[19.5px]">
        {[goals[5], goals[8], goals[11], goals[15], goals[17], goals[19]]}
      </div>
      <h3 className="text-[#1e78e0] font-bold text-xl mt-4">Tier 3</h3>
      <div className="leading-[19.5px]">
        {[goals[7], goals[9], goals[13], goals[20], goals[21]]}
      </div>
      <h3 className="text-[#d01ee0] font-bold text-xl mt-4">Tier 4</h3>
      <div className="leading-[19.5px]">{[goals[2], goals[10], goals[16]]}</div>
      <h3 className="text-[#E01E5A] font-bold text-xl mt-4">Tier 5</h3>
      <div className="leading-[19.5px]">{[goals[4], goals[23]]}</div>
      <h3 className="text-[#ECB22E] font-bold text-xl mt-4">Community</h3>
      <div
        className="leading-[19.5px] text-slate-300"
        dangerouslySetInnerHTML={{
          __html: goals[0] + goals[6] + goals[12] + goals[18] + goals[24],
        }}
      ></div>
    </div>
  );
}
