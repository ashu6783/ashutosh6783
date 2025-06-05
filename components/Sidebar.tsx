"use client"

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { Flask, TestTube, ChartBar } from "phosphor-react";
import { setActiveSubject } from '../store';
import { Subject } from '../types';
import Image from 'next/image';

import logo from '../public/logo.png';

const sidebarItems = [
  {
    subject: 'Physics' as Subject,
     icon: <Flask size={16} weight="duotone" />,
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    activeBgColor: 'bg-orange-200 dark:bg-orange-800/50',
    textColor: 'text-orange-700 dark:text-orange-400',
    activeTextColor: 'text-orange-800 dark:text-orange-300',
    label: 'Physics PYQs'
  },
  {
    subject: 'Chemistry' as Subject,
      icon: <TestTube size={16} weight="duotone" />,
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    activeBgColor: 'bg-green-200 dark:bg-green-800/50',
    textColor: 'text-green-700 dark:text-green-400',
    activeTextColor: 'text-green-800 dark:text-green-300',
    label: 'Chemistry PYQs'
  },
  {
    subject: 'Mathematics' as Subject,
     icon: <ChartBar size={16} weight="duotone" />,
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    activeBgColor: 'bg-blue-200 dark:bg-blue-800/50',
    textColor: 'text-blue-700 dark:text-blue-400',
    activeTextColor: 'text-blue-800 dark:text-blue-300',
    label: 'Mathematics PYQs'
  },
];

export const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeSubject } = useAppSelector((state) => state.app);

  const handleSubjectClick = (subject: Subject) => {
    dispatch(setActiveSubject(subject));
  };

  return (
    <div className="hidden lg:block w-80 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen">
      <div className="p-6 bg-gray-50 dark:bg-gray-900 h-full">
        <div className="mb-8">
          <div className="flex flex-row justify-center items-center gap-3">
            <Image src={logo} width={32} height={32} alt="NTA logo" />
          <h1 className="text-xl font-bold text-gray-900 pt-2 dark:text-gray-100 mb-2">
            JEE Main
          </h1>
          </div>
          <p className="text-sm mt-3 ml-2 text-gray-600 dark:text-gray-400">
            2025 - 2009 | 173 Papers | 15825 Qs
          </p>
        </div>

        <div className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = activeSubject === item.subject;
            return (
              <button
                key={item.subject}
                onClick={() => handleSubjectClick(item.subject)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-black  dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isActive ? item.activeBgColor : item.bgColor
                  }`}>
                    <div className={isActive ? item.activeTextColor : item.textColor}>
                      {item.icon}
                    </div>
                  </div>
                  <span className={`font-medium transition-colors ${
                    isActive 
                      ? 'text-white dark:text-gray-100' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {item.label}
                  </span>
                </div>
                <ChevronRight className={`h-4 w-4 transition-colors ${
                  isActive 
                    ? 'text-gray-600 dark:text-gray-400' 
                    : 'text-gray-400 dark:text-gray-600'
                }`} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};