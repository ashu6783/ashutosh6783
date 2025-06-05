"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { ChapterData } from '../types';
import { calculateTotalQuestions, getQuestionCountChange } from '../lib/utils';
import { getChapterIcon } from '@/lib/chapterIcons';

interface ChapterItemProps {
  chapter: ChapterData;
  index?: number;
}

export const ChapterItem: React.FC<ChapterItemProps> = ({ chapter, index = 0 }) => {
  const IconComponent = getChapterIcon(chapter.chapter);
  const totalQuestions = calculateTotalQuestions(chapter.yearWiseQuestionCount);
  const {direction } = getQuestionCountChange(chapter.yearWiseQuestionCount);
  
  const years = Object.keys(chapter.yearWiseQuestionCount).sort();
  const currentYear = years[years.length - 1];
  const previousYear = years[years.length - 2];
  
  const currentYearCount = chapter.yearWiseQuestionCount[currentYear];
  const previousYearCount = previousYear ? chapter.yearWiseQuestionCount[previousYear] : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center justify-between py-4 px-4 mx-4 mb-3 bg-white dark:bg-gray-900 rounded-lg border-0 sm:border sm:border-gray-200 sm:dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors shadow-sm cursor-pointer"
    >
      <div className="flex items-center flex-1 min-w-0 gap-3">
        <motion.div 
          className="flex-shrink-0"
          whileHover={{ rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: index * 0.1 + 0.2,
              type: "spring",
              stiffness: 200
            }}
          >
            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.div>
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <motion.h3 
            className="font-medium text-gray-900 dark:text-gray-100 truncate text-sm sm:text-base mb-1 sm:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            {chapter.chapter}
          </motion.h3>
          <motion.div 
            className="flex items-center gap-2 text-xs sm:text-sm sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            <span className="text-gray-900 dark:text-gray-100">
              {currentYear}: {currentYearCount}q
            </span>
            {direction !== 'same' && (
              <motion.div 
                className="flex items-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: index * 0.1 + 0.5,
                  type: "spring",
                  stiffness: 300
                }}
              >
                {direction === 'up' ? (
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      ease: "easeInOut"
                    }}
                  >
                    <ChevronUp className="h-3 w-3 text-green-600" />
                  </motion.div>
                ) : (
                  <motion.div
                    animate={{ y: [0, 2, 0] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      ease: "easeInOut"
                    }}
                  >
                    <ChevronDown className="h-3 w-3 text-red-600" />
                  </motion.div>
                )}
              </motion.div>
            )}
            <span className="text-gray-400 dark:text-gray-500">|</span>
            <span className="text-gray-600 dark:text-gray-400">
              {previousYear}: {previousYearCount}q
            </span>
          </motion.div>
        </div>
      </div>

      <div className="flex-shrink-0 flex items-center gap-4 text-right">
        <motion.div 
          className="hidden sm:flex items-center gap-2 text-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          <span className="text-gray-900 dark:text-gray-100">
            {currentYear}: {currentYearCount}q
          </span>
          {direction !== 'same' && (
            <motion.div 
              className="flex items-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                delay: index * 0.1 + 0.5,
                type: "spring",
                stiffness: 300
              }}
            >
              {direction === 'up' ? (
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "easeInOut"
                  }}
                >
                  <ChevronUp className="h-3 w-3 text-green-600" />
                </motion.div>
              ) : (
                <motion.div
                  animate={{ y: [0, 2, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "easeInOut"
                  }}
                >
                  <ChevronDown className="h-3 w-3 text-red-600" />
                </motion.div>
              )}
            </motion.div>
          )}
          <span className="text-gray-400 dark:text-gray-500">|</span>
          <span className="text-gray-600 dark:text-gray-400">
            {previousYear}: {previousYearCount}q
          </span>
        </motion.div>
        
        <motion.div 
          className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: index * 0.1 + 0.6,
            type: "spring",
            stiffness: 200
          }}
          whileHover={{ scale: 1.05 }}
        >
          {chapter.questionSolved}/{totalQuestions} Qs
        </motion.div>
      </div>
    </motion.div>
  );
};