"use client"

import React from 'react';
import { ChapterItem } from '../components/chapterItem';
import { filterChapters } from '../lib/utils';
import { ArrowUpDown } from 'lucide-react';
import { Button } from './ui/button';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { setSortOrder } from '../store'; 
import { useDispatch } from 'react-redux';

export const ChapterList: React.FC = () => {
    const dispatch=useDispatch();
  const { chapters, activeSubject, filters, sortOrder } = useAppSelector((state) => state.app);

  const filteredChapters = filterChapters(chapters, activeSubject, filters);
  
  const sortedChapters = [...filteredChapters].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.chapter.localeCompare(b.chapter);
    } else {
      return b.chapter.localeCompare(a.chapter);
    }
  });

  const chapterCount = sortedChapters.length;

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="px-4 py-3 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Showing all chapters ({chapterCount})
          </span>
           <div className="ml-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => dispatch(setSortOrder())}
                      className="flex items-center gap-2"
                    >
                      <ArrowUpDown className="h-4 w-4" />
                      Sort
                    </Button>
            </div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {sortedChapters.map((chapter, index) => (
          <ChapterItem key={`${chapter.subject}-${chapter.chapter}-${index}`} chapter={chapter} />
        ))}
      </div>
      
      {chapterCount === 0 && (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          No chapters found matching your filters.
        </div>
      )}
    </div>
  );
};