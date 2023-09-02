"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Search() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/stats/${inputValue}`);
  };

  return (
    <div className="mt-4 mr-4 w-full lg:h-[400px] bg-slate-800 rounded-xl text-center">
      <form
        className="p-8 lg:ml-[40px] lg:mr-[40px]"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h1 className="lg:mt-[120px] mb-4 text-white font-bold text-2xl lg:text-[2em]">
          Show Bingo Stats For:{" "}
        </h1>
        <div className="p-2 lg:p-[10px] w-full bg-black rounded-xl text-center text-lg lg:text-2xl flex flex-row">
          <input
            className="text-white w-full bg-black rounded-xl text-center"
            placeholder="Enter username/uuid"
            autoComplete="off"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button aria-label="Get User" type="submit">
            <FontAwesomeIcon
              className="text-white float-right text-lg lg:text-2xl"
              icon={faSearch}
            />
          </button>
        </div>
      </form>
    </div>
  );
}
