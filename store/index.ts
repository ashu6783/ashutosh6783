import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChapterData, FilterState, Subject, SortOrder } from '../types';
import { mockData } from '../lib/mockData';

type ThemeType = 'system' | 'dark' | 'light';

interface AppState {
  chapters: ChapterData[];
  activeSubject: Subject;
  filters: FilterState;
  sortOrder: SortOrder;
  theme: ThemeType;
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
   theme: 'system',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveSubject: (state, action: PayloadAction<Subject>) => {
      state.activeSubject = action.payload;
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
    setTheme:(state,action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    }
  },
});

export const {
  setActiveSubject,
  setSelectedClasses,
  setSelectedUnits,
  setSelectedStatus,
  setShowWeakChapters,
  setSortOrder,
  setTheme,
} = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;