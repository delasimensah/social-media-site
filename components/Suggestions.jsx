import React from "react";

const suggestions = [
  {
    image: "/1.jpg",
    name: "Prince Smith",
  },
  {
    image: "/2.jpg",
    name: "Clark Kent",
  },
  {
    image: "/3.jpg",
    name: "Sean Spencer",
  },
  {
    image: "/4.jpg",
    name: "Patrick Jane",
  },
  {
    image: "/me.jpg",
    name: "Richard Castle",
  },
];

const Suggestions = () => {
  return (
    <div className="space-y-10 bg-white dark:bg-[#202836] shadow-md rounded-md px-5 py-10">
      <h1 className="text-lg font-medium dark:text-white">
        Suggestions for you
      </h1>

      <div className="space-y-5">
        {suggestions.map((sugg, idx) => (
          <SuggestionCard key={idx} sugg={sugg} />
        ))}
      </div>
    </div>
  );
};

const SuggestionCard = ({ sugg }) => {
  return (
    <div className="flex items-center space-x-4 ">
      <div className="w-10 h-10">
        <img
          src={sugg.image}
          alt="profile picture"
          className="object-cover object-top w-full h-full rounded-full"
        />
      </div>

      <h1 className="flex-grow text-[14px] text-color">{sugg.name}</h1>

      <button className="px-3 py-[5px] text-sm font-light text-white bg-purple-600 rounded-md">
        Follow
      </button>
    </div>
  );
};

export default Suggestions;
