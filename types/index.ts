export interface ChapterData {
  subject: "Physics" | "Chemistry" | "Mathematics";
  chapter: string;
  class: string;
  unit: string;
  yearWiseQuestionCount: {
    [year: string]: number;
  };
  questionSolved: number;
  status: "Not Started" | "In Progress" | "Completed";
  isWeakChapter: boolean;
}

export interface FilterState {
  selectedClasses: string[];
  selectedUnits: string[];
  selectedStatus: string[];
  showWeakChapters: boolean;
}

export type Subject = "Physics" | "Chemistry" | "Mathematics";
export type SortOrder = "asc" | "desc";