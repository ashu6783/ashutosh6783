"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretLeft, Moon, Sun, Flask, TestTube, ChartBar } from 'phosphor-react';
import { Button } from './ui/button';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { setTheme } from '../store';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeSubject, theme } = useAppSelector((state) => state.app);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    dispatch(setTheme(nextTheme));
  };

  const subjectConfig = {
    Physics: {
      icon: <Flask size={20} weight="duotone" />,
      title: 'Physics PYQs',
      subtitle: 'Chapter-wise Collection of Physics PYQs',
      bg: 'bg-orange-100 dark:bg-orange-900/30'
    },
    Chemistry: {
      icon: <TestTube size={20} weight="duotone" />,
      title: 'Chemistry PYQs',
      subtitle: 'Chapter-wise Collection of Chemistry PYQs',
      bg: 'bg-green-100 dark:bg-green-900/30'
    },
    Mathematics: {
      icon: <ChartBar size={20} weight="duotone" />,
      title: 'Mathematics PYQs',
      subtitle: 'Chapter-wise Collection of Mathematics PYQs',
      bg: 'bg-blue-100 dark:bg-blue-900/30'
    }
  };

  const currentSubject = subjectConfig[activeSubject];

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 15,
        delay: 0.2
      }
    },
    hover: { 
      scale: 1.05, 
      rotate: 5,
      transition: { type: "spring", stiffness: 300, damping: 10 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  const themeToggleVariants = {
    hidden: { opacity: 0, rotate: -90 },
    visible: { 
      opacity: 1, 
      rotate: 0,
      transition: { delay: 0.4, duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="hidden lg:block lg:bg-white lg:dark:bg-gray-900 lg:dark:border-gray-800 lg:w-full"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-center px-4 lg:px-6 py-6 lg:py-8 relative">
        {/* Left Section - Hidden on Desktop for centering */}
        <motion.div 
          className="lg:hidden absolute left-4"
          variants={itemVariants}
        >
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button variant="ghost" size="sm" className="p-2">
              <CaretLeft size={20} weight="bold" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Center Section - Main Content */}
        <motion.div 
          className="flex flex-col items-center"
          variants={itemVariants}
        >
          {/* Icon and Title Row */}
          <div className="flex items-center gap-3 mb-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSubject}
                className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${currentSubject.bg}`}
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover="hover"
              >
                <motion.span 
                  className="text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {currentSubject.icon}
                </motion.span>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.h1
                key={`${activeSubject}-title`}
                className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-100"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentSubject.title}
              </motion.h1>
            </AnimatePresence>
          </div>
          
          {/* Subtitle Row */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`${activeSubject}-subtitle`}
              className="text-sm text-gray-600 dark:text-gray-400 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {currentSubject.subtitle}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Right Section - Dark Mode Toggle */}
        <motion.div 
          className="absolute right-4 lg:right-6"
          variants={themeToggleVariants}
        >
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-3"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme==="dark" ? 'sun' : 'moon'}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  {theme === "dark" ? (
                    <Sun size={22} weight="fill" />
                  ) : (
                    <Moon size={22} weight="bold" />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};