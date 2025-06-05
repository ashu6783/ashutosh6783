"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { ChapterData } from "../types"; // ✅ Ensure correct path

interface ChapterDetailsProps {
  chapter: ChapterData;
}

const ChapterDetails: React.FC<ChapterDetailsProps> = ({ chapter }) => {
  const { yearWiseQuestionCount } = chapter;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <div className="p-3 sm:p-4">
        <div className="mb-4">
          <h4 className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
            Year-wise Question Distribution
          </h4>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {Object.entries(yearWiseQuestionCount)
              .sort(([a], [b]) => Number(b) - Number(a))
              .slice(0, 4)
              .map(([year, count]) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-700 rounded-lg p-3 text-center"
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{year}</div>
                  <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">{String(count)}</div>
                  <div className="text-xs text-gray-500">questions</div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChapterDetails;
