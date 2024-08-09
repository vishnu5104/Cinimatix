import React from "react";

const PostCard = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      {/* <img className="w-full" src="https://example.com/paella.jpg" alt="Shrimp and Chorizo Paella"> */}
      <div className="flex items-center">
        <span className=" flex justify-center items-center w-8 h-8 rounded-full bg-red-500 text-white font-bold">
          R
        </span>
      </div>
      <div className="px-6 py-2">
        <div className="font-bold text-xl mb-2">Shrimp and Chorizo Paella</div>
        <p className="text-gray-600 text-sm">September 14, 2016</p>
        <p className="text-gray-700 text-base mt-2">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <div className="flex space-x-4">
          <button className="text-gray-500 hover:text-gray-700">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16V12a4 4 0 01-4-4V5a4 4 0 014-4h10a4 4 0 014 4v3a4 4 0 01-4 4v4a4 4 0 11-8 0v-4H7z"
              ></path>
            </svg>
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 12h16m-8 8l-8-8m8-8l8 8"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
