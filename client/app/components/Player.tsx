import { ReactElement } from "react";
import Guide from "./Guide";
import Image from "next/image";

function bingoRank(userData: { bingoRank: number }) {
  if (userData.bingoRank == 1) {
    return <span className="text-[#55FF55] float-right">I</span>;
  }
  if (userData.bingoRank == 2) {
    return <span className="text-[#00bfff] float-right">II</span>;
  }
  if (userData.bingoRank == 3) {
    return <span className="text-[#d01ee0] float-right">III</span>;
  }
  if (userData.bingoRank == 4) {
    return <span className="text-[#FFAA00] float-right">IV</span>;
  }
  return <span className="float-right text-slate-300">0</span>;
}

function username(user: User, userData: { hypixelRank: string }): ReactElement {
  if (userData.hypixelRank == 'ADMIN' || userData.hypixelRank == 'YOUTUBER') {
    return <span className='text-[#FF5555]'>{user.name}</span>
  } else if (userData.hypixelRank == 'MODERATOR') {
    return <span className='text-[#00AA00]'>{user.name}</span>
  } else if (userData.hypixelRank == 'HELPER') {
    return <span className='text-[#0000AA]'>{user.name}</span>
  } else if (userData.hypixelRank == 'SUPERSTAR') {
    return <span className='text-[#FFAA00]'>{user.name}</span>
  } else if (userData.hypixelRank == 'MVP_PLUS' || userData.hypixelRank == 'MVP') {
    return <span className='text-[#55FFFF]'>{user.name}</span>
  } else if (userData.hypixelRank == 'VIP_PLUS' || userData.hypixelRank == 'VIP') {
    return <span className='text-[#55FF55]'>{user.name}</span>
  }
  return <span>{user.name}</span>
}

export default function Player({
  params,
}: {
  params: {
    user: User;
    goals: [];
    userData: UserData;
    guide: GuideEntry[];
    selectedGoal: number;
  };
}) {
  const guideData = {
    goals: params.goals,
    guide: params.guide,
    selectedGoal: params.selectedGoal,
  };

  return (
    <div className="mt-4 mr-4 w-full lg:h-[400px] bg-slate-800 rounded-xl text-center flex lg:flex-row">
      <div className="p-4 w-full lg:w-[212px] h-full bg-slate-800 lg:bg-slate-700 rounded-xl lg:rounded-tr-none lg:rounded-br-none">
        <div className="lg:w-[180px] lg:h-[180px] flex flex-row lg:flex-col lg:mb-[76px]">
          <Image
            src={`https://crafatar.com/avatars/${params.user.id}`}
            width={180}
            height={180}
            priority={true}
            alt="Playerhead Image"
            className="rounded mb-6 w-12 aspect-square lg:w-[180px] lg:h-[180px]"
          />
          {/** If username is longer than 9 characters */}
          <h3 className="ml-4 mt-2 lg:ml-0 lg:mt-0 w-full text-left text-2xl lg:text-xl font-bold text-white break-all">
            {username(params.user, params.userData)}
          </h3>
        </div>

        <p className="text-left">
          <span className="font-bold text-slate-300">Global Rank: </span>
          <span className="text-[#FFAA00] float-right">
            #{params.userData.globalRank}
          </span>
        </p>

        <p className="text-left">
          <span className="font-bold text-slate-300">Bingo Rank: </span>
          {bingoRank(params.userData)}
        </p>

        <p className="text-left">
          <span className="font-bold text-slate-300">Event Points: </span>
          <span className="text-[#FFAA00] float-right">
            {params.userData.points}
          </span>
        </p>
        <p className="text-left">
          <span className="font-bold text-slate-300">Total Points: </span>
          <span className="text-[#FFAA00] float-right">
            {params.userData.totalPoints}
          </span>
        </p>

        <p className="text-left">
          <span className="font-bold text-slate-300">Completed: </span>
          <span className="float-right">
            <span className="text-[#55FF55]">
              {params.userData.completedGoals.length}
            </span>
            <span className="text-[#FFAA00]">/20</span>
          </span>
        </p>
      </div>
      <Guide params={guideData} />
    </div>
  );
}
