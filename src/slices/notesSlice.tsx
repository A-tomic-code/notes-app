import { Slice, createSlice } from '@reduxjs/toolkit';
import { Note } from '../types';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

export const notesSlice:Slice<NotesState> = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action:PayloadAction<Note[]>) => {state.notes = action.payload},
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex(note => note.id === action.payload.id)
      state.notes[index] = action.payload
    }
  },
});

export const { addNote, setNotes, updateNote } = notesSlice.actions;
export const selectNotes = (state: RootState) => state.notes.notes;
export default notesSlice.reducer;
