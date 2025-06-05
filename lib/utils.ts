// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ChapterData, FilterState, Subject } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const filterChapters = (
  chapters: ChapterData[],
  subject: Subject,
  filters: FilterState
): ChapterData[] => {
  return chapters.filter((chapter) => {
    // Filter by subject
    if (chapter.subject !== subject) return false;

    // Filter by classes
    if (filters.selectedClasses.length > 0 && !filters.selectedClasses.includes(chapter.class)) {
      return false;
    }

    // Filter by units
    if (filters.selectedUnits.length > 0 && !filters.selectedUnits.includes(chapter.unit)) {
      return false;
    }

    // Filter by status
    if (filters.selectedStatus.length > 0 && !filters.selectedStatus.includes(chapter.status)) {
      return false;
    }

    // Filter by weak chapters
    if (filters.showWeakChapters && !chapter.isWeakChapter) {
      return false;
    }

    return true;
  });
};

export const getUniqueClasses = (chapters: ChapterData[], subject: Subject): string[] => {
  const classes = chapters
    .filter(chapter => chapter.subject === subject)
    .map(chapter => chapter.class);
  return [...new Set(classes)].sort();
};

export const getUniqueUnits = (chapters: ChapterData[], subject: Subject): string[] => {
  const units = chapters
    .filter(chapter => chapter.subject === subject)
    .map(chapter => chapter.unit);
  return [...new Set(units)].sort();
};

export const calculateTotalQuestions = (yearWiseQuestionCount: { [year: string]: number }) => {
  return Object.values(yearWiseQuestionCount).reduce((sum, count) => sum + count, 0);
};

export const getQuestionCountChange = (yearWiseQuestionCount: { [year: string]: number }) => {
  const years = Object.keys(yearWiseQuestionCount).sort();
  const currentYear = years[years.length - 1];
  const previousYear = years[years.length - 2];
  
  if (!previousYear) return { change: 0, direction: 'same' as const };
  
  const currentCount = yearWiseQuestionCount[currentYear];
  const previousCount = yearWiseQuestionCount[previousYear];
  const change = currentCount - previousCount;
  
  return {
    change: Math.abs(change),
    direction: change > 0 ? 'up' as const : change < 0 ? 'down' as const : 'same' as const
  };
};