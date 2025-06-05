// FilterBar Component
"use client";

import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Button } from './ui/button';
import { MultiSelect } from './multi-select';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import {
  setSelectedClasses,
  setSelectedUnits,
  setSelectedStatus,
  setShowWeakChapters,
  setSortOrder,
} from '../store';
import { getUniqueClasses, getUniqueUnits } from '../lib/utils';

export const FilterBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { chapters, activeSubject, filters } = useAppSelector((state) => state.app);

  const classes = getUniqueClasses(chapters, activeSubject);
  const units = getUniqueUnits(chapters, activeSubject);
  const statusOptions = [
    { label: 'Not Started', value: 'Not Started' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Completed', value: 'Completed' },
  ];

  const classOptions = classes.map(cls => ({ label: cls, value: cls }));
  const unitOptions = units.map(unit => ({ label: unit, value: unit }));

  return (
    <div className="space-y-4">
      {/* Desktop & Tablet Filter Bar */}
      <div className="hidden md:flex flex-wrap items-center gap-4 p-4 bg-white dark:bg-gray-900  dark:border-gray-800">
        <div className="min-w-0 flex-shrink-0">
          <MultiSelect
            options={classOptions}
            selected={filters.selectedClasses}
            onChange={(selected) => dispatch(setSelectedClasses(selected))}
            placeholder="Class"
            className="w-40 min-w-0"
          />
        </div>

        <div className="min-w-0 flex-shrink-0">
          <MultiSelect
            options={unitOptions}
            selected={filters.selectedUnits}
            onChange={(selected) => dispatch(setSelectedUnits(selected))}
            placeholder="Units"
            className="w-48 min-w-0"
          />
        </div>

        <div className="min-w-0 flex-shrink-0">
          <MultiSelect
            options={statusOptions}
            selected={filters.selectedStatus}
            onChange={(selected) => dispatch(setSelectedStatus(selected))}
            placeholder="Status"
            className="w-40 min-w-0"
          />
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          <Switch
            id="weak-chapters"
            checked={filters.showWeakChapters}
            onCheckedChange={(checked) => dispatch(setShowWeakChapters(checked))}
          />
          <Label htmlFor="weak-chapters" className="text-sm font-medium whitespace-nowrap">
            Weak Chapters
          </Label>
        </div>
      </div>

      {/* Mobile Filter Bar - Responsive Height */}
      <div className="md:hidden p-2 bg-white dark:bg-gray-900  dark:border-gray-800">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <div className="flex-shrink-0">
            <MultiSelect
              options={classOptions}
              selected={filters.selectedClasses}
              onChange={(selected) => dispatch(setSelectedClasses(selected))}
              placeholder="Class"
              className="min-w-[75px] w-auto max-w-[85px]"
            />
          </div>

          <div className="flex-shrink-0">
            <MultiSelect
              options={unitOptions}
              selected={filters.selectedUnits}
              onChange={(selected) => dispatch(setSelectedUnits(selected))}
              placeholder="Units"
              className="min-w-[75px] w-auto max-w-[85px]"
            />
          </div>

          <div className="flex-shrink-0">
            <MultiSelect
              options={statusOptions}
              selected={filters.selectedStatus}
              onChange={(selected) => dispatch(setSelectedStatus(selected))}
              placeholder="Status"
              className="min-w-[75px] w-auto max-w-[85px]"
            />
          </div>

          <div className="flex items-center gap-1 flex-shrink-0 pl-1">
            <Switch
              id="weak-chapters-mobile"
              checked={filters.showWeakChapters}
              onCheckedChange={(checked) => dispatch(setShowWeakChapters(checked))}
              className="scale-75"
            />
            <Label htmlFor="weak-chapters-mobile" className="text-xs font-medium whitespace-nowrap">
              Weak
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};