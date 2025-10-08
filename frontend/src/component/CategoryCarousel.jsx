import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "UI/UX Designer",
    "DevOps Engineer",
  ];

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="relative max-w-5xl mx-auto my-16 px-4">
      <Slider {...settings}>
        {categories.map((item, index) => (
          <div key={index} className="px-3">
            <div
              onClick={() => searchJobHandler(item)}
              className="cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 py-8 px-6 text-center"
            >
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                {item}
              </h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Custom Next Arrow
const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer text-3xl md:text-4xl text-purple-700 hover:text-purple-900 z-10"
    onClick={onClick}
  >
    <IoIosArrowForward />
  </div>
);

// Custom Prev Arrow
const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer text-3xl md:text-4xl text-purple-700 hover:text-purple-900 z-10"
    onClick={onClick}
  >
    <IoIosArrowBack />
  </div>
);

export default CategoryCarousel;
