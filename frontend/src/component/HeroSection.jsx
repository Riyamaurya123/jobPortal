import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const searchJobHandler = () => {
    if (!query.trim()) return; // Prevent empty search
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="bg-gradient-to-r from-purple-700 to-purple-500 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <span className="inline-block px-4 py-2 rounded-full bg-white text-purple-700 font-semibold shadow-lg mb-4">
          No. 1 Job Hunt Website
        </span>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-yellow-300">Dream Jobs</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-100 mb-10">
          Explore thousands of opportunities and take the next step in your
          career journey.
        </p>

        {/* Search bar */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-0 w-full md:w-3/4 mx-auto shadow-xl bg-white rounded-full overflow-hidden">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find your dream jobs"
            className="flex-1 px-6 py-4 text-gray-800 text-lg outline-none"
          />
          <button
            onClick={searchJobHandler}
            className="bg-yellow-400 hover:bg-yellow-500 transition-colors px-6 py-4 flex items-center justify-center"
          >
            <CiSearch className="h-8 w-8 text-white" />
          </button>
        </div>

        {/* Optional Call-to-Action */}
        <p className="text-gray-200 mt-6">
          Join thousands of professionals who found their dream job with us.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
