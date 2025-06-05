// store/index.ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChapterData, FilterState, Subject, SortOrder } from '../types';
import { mockData } from '../lib/mockData';

interface AppState {
  chapters: ChapterData[];
  activeSubject: Subject;
  filters: FilterState;
  sortOrder: SortOrder;
  isDarkMode: boolean;
}

const initialState: AppState = {
  chapters: mockData,
  activeSubject: "Physics",
  filters: {
    selectedClasses: [],
    selectedUnits: [],
    selectedStatus: [],
    showWeakChapters: false,
  },
  sortOrder: "asc",
  isDarkMode: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveSubject: (state, action: PayloadAction<Subject>) => {
      state.activeSubject = action.payload;
      // Reset filters when changing subject
      state.filters = {
        selectedClasses: [],
        selectedUnits: [],
        selectedStatus: [],
        showWeakChapters: false,
      };
    },
    setSelectedClasses: (state, action: PayloadAction<string[]>) => {
      state.filters.selectedClasses = action.payload;
    },
    setSelectedUnits: (state, action: PayloadAction<string[]>) => {
      state.filters.selectedUnits = action.payload;
    },
    setSelectedStatus: (state, action: PayloadAction<string[]>) => {
      state.filters.selectedStatus = action.payload;
    },
    setShowWeakChapters: (state, action: PayloadAction<boolean>) => {
      state.filters.showWeakChapters = action.payload;
    },
    setSortOrder: (state) => {
      state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const {
  setActiveSubject,
  setSelectedClasses,
  setSelectedUnits,
  setSelectedStatus,
  setShowWeakChapters,
  setSortOrder,
  toggleDarkMode,
} = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;