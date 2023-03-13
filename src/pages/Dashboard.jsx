import React from "react";
import { Link } from "react-router-dom";
import QuizzesContainer from "../components/QuizzesContainer";
import { fetchQuizzes } from "../utils";

const Dashboard = () => {
  const data = fetchQuizzes();
  console.log(data);
  return (
    <div className="container mx-auto">
      <div>
        <h1 className="text-3xl font-semibold my-12">
          View all Quizzes - Admin
        </h1>
      </div>
      <main className="border rounded-md py-5 px-10">
        <div className="flex justify-between my-12">
          <h2 className="text-4xl">All Quizzes</h2>
          <Link to="create/0">
            <button className="bg-blue-400 px-4 py-2 text-white rounded-md">
              New Quiz
            </button>
          </Link>
        </div>
        <QuizzesContainer />
      </main>
    </div>
  );
};

export default Dashboard;
