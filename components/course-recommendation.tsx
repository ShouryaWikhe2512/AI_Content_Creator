"use client";

import { motion } from "framer-motion";
import { Clock, BookOpen } from "lucide-react";

interface Course {
  title: string;
  description: string;
  level: string;
  duration: string;
  image: string;
}

interface CourseRecommendationProps {
  course: Course;
}

export default function CourseRecommendation({
  course,
}: CourseRecommendationProps) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-lg border border-blue-500/20 bg-blue-900/20 hover:bg-blue-800/30 transition-all duration-300 group"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 h-32 md:h-auto relative overflow-hidden">
          <img
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
          <div className="absolute bottom-2 left-2 bg-blue-500/80 text-white text-xs px-2 py-1 rounded">
            {course.level}
          </div>
        </div>

        <div className="p-4 flex-1">
          <h4 className="text-lg font-semibold text-blue-100 mb-2 group-hover:text-blue-300 transition-colors duration-300">
            {course.title}
          </h4>

          <p className="text-sm text-blue-200/70 mb-3 line-clamp-2">
            {course.description}
          </p>

          <div className="flex items-center text-xs text-blue-300/70">
            <Clock className="w-3 h-3 mr-1" />
            <span>{course.duration}</span>
            <span className="mx-2">•</span>
            <BookOpen className="w-3 h-3 mr-1" />
            <span>Online</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </motion.div>
  );
}
