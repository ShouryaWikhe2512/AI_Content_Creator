"use client";

import MCQ from "@/components/mcq_test";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-2xl p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Content Creation Quiz
        </h1>
        <MCQ />
      </div>
    </div>
  );
}
