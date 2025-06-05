"use client"

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ThemeProvider } from '../components/Theme-Provider';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { SubjectTabs } from '../components/SubjectTabs';
import { FilterBar } from '../components/FilterBar';
import { ChapterList } from '../components/ChapterList';

export default function Home() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="flex">
            <Sidebar />
            
            <div className="flex-1 min-w-0">
              <Header />
              <SubjectTabs />
              <FilterBar />
              <ChapterList />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </Provider>
  );
}