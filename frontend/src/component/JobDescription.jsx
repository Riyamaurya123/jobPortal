import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "../utils/constant";
import { setSingleJob } from "../redux/jobSlice";
import { toast } from "react-toastify";
import Navbar from "./shared/Navbar";

const JobDescription = () => {
  const dispatch = useDispatch();
  const { id: jobId } = useParams();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isInitiallyApplied =
    singleJob?.applications?.some((app) => app.applicant === user._id) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user._id }],
        };
        dispatch(setSingleJob(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications?.some(
              (app) => app.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="bg-white shadow-lg rounded-xl p-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {singleJob?.title}
              </h1>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
                  {singleJob?.position} Position
                </span>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full font-semibold">
                  {singleJob?.jobType}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-semibold">
                  {singleJob?.salary} LPA
                </span>
              </div>
            </div>
            <button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`px-6 py-3 rounded-lg text-white font-semibold transition ${
                isApplied
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-purple-700 hover:bg-purple-800"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </button>
          </div>

          {/* Job Details */}
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2 border-gray-200">
              Job Description
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <DetailItem label="Role" value={singleJob?.title} />
              <DetailItem label="Location" value={singleJob?.location} />
              <DetailItem
                label="Experience"
                value={`${singleJob?.experienceLevel} years`}
              />
              <DetailItem label="Salary" value={`${singleJob?.salary} LPA`} />
              <DetailItem
                label="Total Applications"
                value={singleJob?.applications?.length || 0}
              />
              <DetailItem
                label="Posted Date"
                value={singleJob?.createdAt?.split("T")[0]}
              />
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description:</h3>
              <p className="text-gray-700">{singleJob?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable component for job details
const DetailItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-gray-500 font-medium">{label}</span>
    <span className="text-gray-800 font-semibold">{value}</span>
  </div>
);

export default JobDescription;
