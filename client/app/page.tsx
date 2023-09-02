import StaticCard from "./components/StaticCard";
import Search from "./components/Search";
import ActiveGoals from "./components/ActiveGoals";
import Unavailable from "./components/Unavailable";

async function getCurrentEvent(): Promise<CurrentEvent> {
  const url = "https://api.hypixel.net/resources/skyblock/bingo";
  const res = await fetch(url, { next: { revalidate: 500 } });
  const data = await res.json();
  if (!res.ok || !data.success || data.goals == null) {
    throw new Error(`Failed to obtain the current event`);
  }
  return data;
}

export default async function Home() {
  let currentEvent: CurrentEvent;
  try {
    currentEvent = await getCurrentEvent();
  } catch (error) {
    console.error();
    return <Unavailable errorMessage={JSON.stringify(error)}/>
  }

  const containerData = {
    goals: currentEvent.goals
  }

  return (
    <main>
      <div className="flex flex-col-reverse ml-4 mr-4 mb-4 lg:flex-row lg:m-0">
        <div className="hidden lg:block">
          <StaticCard />
        </div>
        <Search />
      </div>
      <ActiveGoals params={containerData} />
    </main>
  );
}

