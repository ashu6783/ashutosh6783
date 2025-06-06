"use client";

import React from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Flask, TestTube, Calculator, ArrowLeft, Moon, Sun } from "phosphor-react";
import { Button } from './ui/button';
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { setActiveSubject, toggleTheme } from "../store";
import { Subject } from "../types";

const subjectConfig = {
    Physics: {
        label: "Phy",
        icon: <Flask size={16} weight="fill" />,
        bg: "bg-orange-500",
    },
    Chemistry: {
        label: "Chem",
        icon: <TestTube size={16} weight="fill" />,
        bg: "bg-green-500",
    },
    Mathematics: {
        label: "Math",
        icon: <Calculator size={16} weight="fill" />,
        bg: "bg-blue-500",
    },
};

export const SubjectTabs: React.FC = () => {
    const dispatch = useAppDispatch();
    const { activeSubject, theme } = useAppSelector((state) => state.app);
    
    const isDarkMode = theme === 'dark';

    const handleSubjectChange = (value: string) => {
        dispatch(setActiveSubject(value as Subject));
    };

    return (
        <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 lg:hidden">
            {/* Header with back arrow and title */}
            <div className="flex items-center justify-between px-4 py-3">
                <button className="p-1">
                    <ArrowLeft size={20} className="text-gray-700 dark:text-gray-300" />
                </button>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">JEE Main</h1>
                
                {/* Dark Mode Toggle Button */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch(toggleTheme())}
                    className="p-2"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isDarkMode ? 'sun' : 'moon'}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        >
                            {isDarkMode ? (
                                <Sun size={20} weight="fill" />
                            ) : (
                                <Moon size={20} weight="bold" />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </Button>
            </div>

            {/* Subject tabs */}
            <div className="px-4 pb-4">
                <Tabs value={activeSubject} onValueChange={handleSubjectChange}>
                    <TabsList className="flex justify-between bg-transparent p-0 h-auto w-full">
                        {Object.entries(subjectConfig).map(([subject, config]) => {
                            const isActive = activeSubject === subject;
                            return (
                                <TabsTrigger
                                    key={subject}
                                    value={subject}
                                    className={`
                                        flex flex-col items-center justify-center gap-2 p-3 flex-1
                                        transition-all duration-200 ease-in-out
                                        relative
                                        ${isActive 
                                            ? "text-gray-900 dark:text-gray-100" 
                                            : "text-gray-500 dark:text-gray-400"
                                        }
                                    `}
                                    style={{
                                        boxShadow: "none",
                                    }}
                                >
                                    <div className={`
                                        w-8 h-8 rounded-full flex items-center justify-center
                                        ${config.bg} text-white
                                    `}>
                                        {config.icon}
                                    </div>

                                    <span className={`text-sm font-medium ${isActive ? "font-semibold" : ""}`}>
                                        {config.label}
                                    </span>
                                    
                                    {/* Active indicator line */}
                                    {isActive && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
                                    )}
                                </TabsTrigger>
                            );
                        })}
                    </TabsList>
                </Tabs>
            </div>
        </div>
    );
};