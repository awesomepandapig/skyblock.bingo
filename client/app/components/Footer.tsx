import Link from "next/link";

export default function Footer() {
  return (
    <div className="m-4 hidden lg:block text-slate-300">
      <span className="ml-4">Bingo rank is based on your active bingo pet</span>
      <span className="mr-4 float-right">
        Made by{" "}
        <Link
          className="decoration-none text-[#1e78e0]"
          href="https://github.com/awesomepandapig/skyblock.bingo"
          target="_blank"
        >
          awesomepandapig
        </Link>
      </span>
    </div>
  );
}
