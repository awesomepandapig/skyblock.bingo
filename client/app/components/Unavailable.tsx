import Image from "next/image";
import StaticCard from "./StaticCard";

export default function Unavailable(error: {errorMessage: string}) {
  return (
    <main>
      <div className="flex flex-col-reverse ml-4 mr-4 lg:flex-row lg:m-0">
        <StaticCard />
        <div className="mt-4 mr-4 w-full lg:h-[400px] bg-slate-800 rounded-xl text-center flex lg:flex-row">
            <p className="m-4 text-red-500 text-xl font-bold break-all">
              {error.errorMessage}
            </p>
        </div>
      </div>
    </main>
  );
}
