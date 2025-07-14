import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { LuLoaderCircle } from "react-icons/lu";

const Signup = () => {
  const { user } = useSelector((store) => store.auth);
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber); // ✅ spelling fix
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res?.data?.success) {
        toast.success(res.data.message || "Registration successful!");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);

      const errorMessage =
        error?.response?.data?.message || "Something went wrong during signup.";

      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-300 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>

          <div className="my-2">
            <label>Full Name</label>
            <input
              className="w-full p-2.5 rounded-sm border border-gray-300"
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="my-2">
            <label>Email</label>
            <input
              className="w-full p-2.5 rounded-sm border border-gray-300"
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="my-2">
            <label>Phone Number</label>
            <input
              className="w-full p-2.5 rounded-sm border border-gray-300"
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="my-2">
            <label>Password</label>
            <input
              className="w-full p-2.5 rounded-sm border border-gray-300"
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center gap-4 my-5">
            <div>
              <input
                type="radio"
                id="student"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={changeEventHandler}
                className="cursor-pointer"
                required
              />
              <label className="mx-2" htmlFor="student">
                Student
              </label>
            </div>

            <div>
              <input
                type="radio"
                id="recruiter"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                className="cursor-pointer"
              />
              <label className="mx-2" htmlFor="recruiter">
                Recruiter
              </label>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-10">
            <label>Profile</label>
            <input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="cursor-pointer border border-gray-300 p-2.5 rounded-sm"
            />
          </div>

          {loading ? (
            <button className="w-full my-4 bg-black text-white py-2 rounded-2xl flex gap-3 items-center justify-center h-full">
              <LuLoaderCircle className="h-4 w-4 animate-spin" /> please wait
            </button>
          ) : (
            <button
              type="submit"
              className="w-full my-4 bg-black text-white py-2 rounded-2xl"
            >
              Signup
            </button>
          )}

          <span className="text-sm">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
