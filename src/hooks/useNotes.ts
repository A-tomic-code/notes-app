import { useAppDispatch, useAppSelector } from "./redux-hooks"
import notesService from '../services/notesService'
import { Note } from '../types'
import { setNotes } from "../slices/notesSlice"

const CATEGORIES = [ 
    'urgente',
    'importante',
    'casa',
    'trabajo',
    'salud',
  ]

export const useNotes = () => {

  const dispatch = useAppDispatch()
  const notes:Note[] = useAppSelector(state => state.notes.notes)

  const createNote = (data: Note): void => {
    notesService.create(data, dispatch);
  };
  const loadFromLocalStorage = async (): Promise<Note[]> => {
    return await notesService.loadFromLocalStorage(dispatch);
  };
  const deleteNote = (id: number): void => {
    notesService.deleteNote(id, dispatch);
  };
  const updateNote = (id: number, newNote: Note): void => {
    notesService.updateNoteData(id, newNote, dispatch);
  };
  const filterNotes = (query: string) => {
    if(query.length > 0){

      loadFromLocalStorage().then(res => {
        
        const filtered = res.filter( (note:Note) => {
          return note.title.includes(query) || note.categories.includes(query)
        })
        
        dispatch(setNotes(filtered))
      })
    }else{
      loadFromLocalStorage()
    }
    
  }

  return {
    loadFromLocalStorage,
    createNote,
    deleteNote,
    updateNote,
    filterNotes,
    notes,
    CATEGORIES
  }
}