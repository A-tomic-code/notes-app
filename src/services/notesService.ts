import { Note } from "../types";
import { addNote, setNotes, updateNote } from "../slices/notesSlice";
import type { AppDispatch } from "../store";

const LOCALSTORAGE_NOTES_KEY = 'notes'


const loadFromLocalStorage = async (dispatch: AppDispatch): Promise<Note[]> => {
  const items = await localStorage.getItem(LOCALSTORAGE_NOTES_KEY);
  if (items) {
    const data:Note[] = JSON.parse(items);
    dispatch(setNotes(data));
    return data;
  }
  return[]
};

const create = (note: Note, dispatch: AppDispatch): void => {
  const currentNotes = localStorage.getItem(LOCALSTORAGE_NOTES_KEY);

  if (currentNotes) {
    const newNotes: Note[] = JSON.parse(currentNotes);
    note.id = Date.now();
    newNotes.push(note);
    localStorage.setItem(LOCALSTORAGE_NOTES_KEY, JSON.stringify(newNotes));
  } else {
    note.id = 0;
    localStorage.setItem(LOCALSTORAGE_NOTES_KEY, JSON.stringify([note]));
  }

  dispatch(addNote(note));
};

const deleteNote = (id: number, dispatch: AppDispatch): void => {
  const currentNotes = localStorage.getItem(LOCALSTORAGE_NOTES_KEY);
  if (currentNotes) {
    const notes = JSON.parse(currentNotes);
    const newNotes = notes.filter((note: Note) => note.id !== id);

    localStorage.setItem(LOCALSTORAGE_NOTES_KEY, JSON.stringify(newNotes));
    dispatch(setNotes(newNotes));
  }
};

const updateNoteData = (id: number, newNote: Note, dispatch: AppDispatch): void => {
  const currentNotes = localStorage.getItem(LOCALSTORAGE_NOTES_KEY);
  if (currentNotes) {
    const notes = JSON.parse(currentNotes);
    const index = notes.findIndex((note: Note) => note.id === id);
    notes[index] = newNote;

    localStorage.setItem(LOCALSTORAGE_NOTES_KEY, JSON.stringify(notes));
    dispatch(updateNote(newNote));
  }
};


export default {create, loadFromLocalStorage, deleteNote, updateNoteData}