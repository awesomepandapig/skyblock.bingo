import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-[#070F15] flex sticky top-0 overflow-y-scroll">
      <Link
        className="mt-3 ml-3 text-white pt-1 pb-4 pl-2 pr-2 rounded-3xl leading-4 font-semibold"
        href="/"
      >
        skyblock.bingo
      </Link>

      <Link
        className="mt-2.5 ml-3 text-white bg-slate-800 h-fit pt-0.5 pb-0.5 pl-2 pr-2 rounded-3xl hover:bg-slate-300 hover:text-slate-600"
        href="/guide"
        target="_blank"
      >
        Guide
      </Link>
      <Link
        className="mt-2.5 ml-3 text-white bg-slate-800 h-fit pt-0.5 pb-0.5 pl-2 pr-2 rounded-3xl hover:bg-slate-300 hover:text-slate-600"
        href="/leaderboard"
        target="_blank"
      >
        Leaderboard
      </Link>
    </div>
  );
}
