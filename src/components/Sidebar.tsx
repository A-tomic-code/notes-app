import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNotes } from '../hooks/useNotes';
import { Note } from '../types';

export const Sidebar = () => {
  const [noteTitle, setnoteTitle] = useState<string>('');
  const [noteText, setNoteText] = useState<string>('');
  const [noteCategories, setNoteCategories] = useState<string[]>([]);
  const { createNote, CATEGORIES } = useNotes();

  const handleNoteTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setnoteTitle(event.currentTarget.value);
  };
  const handleNoteTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNoteText(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset()
    const note: Note = {
      id: -1,
      title: noteTitle,
      text: noteText,
      categories: noteCategories,
    }
    createNote(note);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    if (event.target.checked){
      setNoteCategories((prevStatus) => [...prevStatus, event.target.value])
    }else{
      const newCategories = noteCategories.filter((item) => item !== event.target.value)
      setNoteCategories(newCategories);
    }

  }

  return (
    <motion.aside className="sidebar">
      <ul>
        <form onSubmit={handleSubmit}>
          <li>
            <h3>Crear</h3>
          </li>

          <li>
            <input
              placeholder="Cita con el médico"
              onChange={handleNoteTitleChange}
            />
          </li>

          <li>
            <textarea
              placeholder="el dia 12 a las 14:30"
              onChange={handleNoteTextChange}
            />
          </li>


          {CATEGORIES.map((category, i) => {
            return (
              <li key={i}>
                <label htmlFor={`category-${category}`}>{category}</label>
                <input type="checkbox" id={`category-${category}`} value={category} onChange={handleCategoryChange} />
              </li>
            );
          })} 
          
          <li>
            <button>Crear nueva</button>
          </li>
        </form>
      </ul>
    </motion.aside>
  );
};
