import { Note } from "../types"

export interface useCreateFormProps{
  setNoteTitle: React.Dispatch<React.SetStateAction<string>>
  setNoteText: React.Dispatch<React.SetStateAction<string>>
  setNoteCategories: React.Dispatch<React.SetStateAction<string[]>>
  noteTitle: string
  noteText: string
  noteCategories: string[]
  createNote: (note:Note) => void
}

export const useCreateForm = (props:useCreateFormProps) => {
 
const {setNoteTitle, setNoteText, noteTitle, noteText, createNote, noteCategories, setNoteCategories} = props

 const handleNoteTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNoteTitle(event.currentTarget.value);
  };
  const handleNoteTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNoteText(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();  
    if (noteTitle || noteText){
      createNote({
        id: -1,
        title: noteTitle,
        text: noteText,
        categories: noteCategories,
      });
      event.currentTarget.reset()
      setNoteTitle('')
      setNoteText('')
      setNoteCategories([])
    }
    
    
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    if (event.target.checked){
      setNoteCategories((prevStatus:string[]) => [...prevStatus, event.target.value])
    }else{
      const newCategories = noteCategories.filter((item) => item !== event.target.value)
      setNoteCategories(newCategories);
    }

  }

  return {
    handleCategoryChange,
    handleNoteTextChange,
    handleNoteTitleChange,
    handleSubmit
  }
}