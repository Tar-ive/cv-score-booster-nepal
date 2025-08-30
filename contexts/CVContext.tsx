'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { CVData, CVSectionKey } from '@/types/cv.types';
import { getEmptyCV } from '@/lib/templates/sampleData';

// Action types
type CVAction =
  | { type: 'SET_CV_DATA'; payload: CVData }
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<CVData['personalInfo']> }
  | { type: 'UPDATE_SECTION'; sectionKey: CVSectionKey; payload: any }
  | { type: 'ADD_SECTION_ITEM'; sectionKey: CVSectionKey; payload: any }
  | { type: 'UPDATE_SECTION_ITEM'; sectionKey: CVSectionKey; itemId: string; payload: any }
  | { type: 'DELETE_SECTION_ITEM'; sectionKey: CVSectionKey; itemId: string }
  | { type: 'REORDER_SECTION_ITEMS'; sectionKey: CVSectionKey; fromIndex: number; toIndex: number }
  | { type: 'RESET_CV' }
  | { type: 'LOAD_FROM_STORAGE' };

interface CVContextType {
  cvData: CVData;
  dispatch: React.Dispatch<CVAction>;
  updatePersonalInfo: (data: Partial<CVData['personalInfo']>) => void;
  updateSection: (sectionKey: CVSectionKey, data: any) => void;
  addSectionItem: (sectionKey: CVSectionKey, item: any) => void;
  updateSectionItem: (sectionKey: CVSectionKey, itemId: string, data: any) => void;
  deleteSectionItem: (sectionKey: CVSectionKey, itemId: string) => void;
  reorderSectionItems: (sectionKey: CVSectionKey, fromIndex: number, toIndex: number) => void;
  resetCV: () => void;
  saveToStorage: () => void;
  loadFromStorage: () => void;
}

const CVContext = createContext<CVContextType | undefined>(undefined);

// Reducer function
function cvReducer(state: CVData, action: CVAction): CVData {
  switch (action.type) {
    case 'SET_CV_DATA':
      return action.payload;

    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: {
          ...state.personalInfo,
          ...action.payload,
        },
      };

    case 'UPDATE_SECTION':
      return {
        ...state,
        sections: {
          ...state.sections,
          [action.sectionKey]: action.payload,
        },
      };

    case 'ADD_SECTION_ITEM':
      const currentSection = state.sections[action.sectionKey];
      if (Array.isArray(currentSection)) {
        return {
          ...state,
          sections: {
            ...state.sections,
            [action.sectionKey]: [...currentSection, action.payload],
          },
        };
      }
      return state;

    case 'UPDATE_SECTION_ITEM':
      const sectionToUpdate = state.sections[action.sectionKey];
      if (Array.isArray(sectionToUpdate)) {
        return {
          ...state,
          sections: {
            ...state.sections,
            [action.sectionKey]: sectionToUpdate.map((item: any) =>
              item.id === action.itemId ? { ...item, ...action.payload } : item
            ),
          },
        };
      }
      return state;

    case 'DELETE_SECTION_ITEM':
      const sectionToDelete = state.sections[action.sectionKey];
      if (Array.isArray(sectionToDelete)) {
        return {
          ...state,
          sections: {
            ...state.sections,
            [action.sectionKey]: sectionToDelete.filter((item: any) => item.id !== action.itemId),
          },
        };
      }
      return state;

    case 'REORDER_SECTION_ITEMS':
      const sectionToReorder = state.sections[action.sectionKey];
      if (Array.isArray(sectionToReorder)) {
        const items = [...sectionToReorder];
        const [removed] = items.splice(action.fromIndex, 1);
        items.splice(action.toIndex, 0, removed);
        return {
          ...state,
          sections: {
            ...state.sections,
            [action.sectionKey]: items,
          },
        };
      }
      return state;

    case 'RESET_CV':
      return getEmptyCV();

    case 'LOAD_FROM_STORAGE':
      const savedData = localStorage.getItem('cv-data');
      if (savedData) {
        try {
          return JSON.parse(savedData);
        } catch (error) {
          console.error('Error loading CV data from storage:', error);
        }
      }
      return state;

    default:
      return state;
  }
}

// Provider component
export function CVProvider({ children }: { children: ReactNode }) {
  const [cvData, dispatch] = useReducer(cvReducer, getEmptyCV());

  // Load data from storage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('cv-data');
    if (savedData) {
      try {
        dispatch({ type: 'SET_CV_DATA', payload: JSON.parse(savedData) });
      } catch (error) {
        console.error('Error loading CV data:', error);
      }
    }
  }, []);

  // Auto-save to storage on data change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('cv-data', JSON.stringify(cvData));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [cvData]);

  // Helper functions
  const updatePersonalInfo = (data: Partial<CVData['personalInfo']>) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: data });
  };

  const updateSection = (sectionKey: CVSectionKey, data: any) => {
    dispatch({ type: 'UPDATE_SECTION', sectionKey, payload: data });
  };

  const addSectionItem = (sectionKey: CVSectionKey, item: any) => {
    dispatch({ type: 'ADD_SECTION_ITEM', sectionKey, payload: item });
  };

  const updateSectionItem = (sectionKey: CVSectionKey, itemId: string, data: any) => {
    dispatch({ type: 'UPDATE_SECTION_ITEM', sectionKey, itemId, payload: data });
  };

  const deleteSectionItem = (sectionKey: CVSectionKey, itemId: string) => {
    dispatch({ type: 'DELETE_SECTION_ITEM', sectionKey, itemId });
  };

  const reorderSectionItems = (sectionKey: CVSectionKey, fromIndex: number, toIndex: number) => {
    dispatch({ type: 'REORDER_SECTION_ITEMS', sectionKey, fromIndex, toIndex });
  };

  const resetCV = () => {
    dispatch({ type: 'RESET_CV' });
  };

  const saveToStorage = () => {
    localStorage.setItem('cv-data', JSON.stringify(cvData));
  };

  const loadFromStorage = () => {
    dispatch({ type: 'LOAD_FROM_STORAGE' });
  };

  const value: CVContextType = {
    cvData,
    dispatch,
    updatePersonalInfo,
    updateSection,
    addSectionItem,
    updateSectionItem,
    deleteSectionItem,
    reorderSectionItems,
    resetCV,
    saveToStorage,
    loadFromStorage,
  };

  return <CVContext.Provider value={value}>{children}</CVContext.Provider>;
}

// Custom hook to use CV context
export function useCV() {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
}