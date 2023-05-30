import { Variants, motion } from 'framer-motion';
import { useState } from 'react';
import { useNotes } from '../hooks/useNotes';
import { useCreateForm, useCreateFormProps } from '../hooks/useCreateForm';

export const Sidebar = () => {
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [noteText, setNoteText] = useState<string>('');
  const [noteCategories, setNoteCategories] = useState<string[]>([]);
  const { createNote, CATEGORIES } = useNotes();

  const formConfig: useCreateFormProps = {
    createNote,
    noteTitle,
    setNoteTitle,
    noteText,
    setNoteText,
    noteCategories,
    setNoteCategories
  }
  const {
    handleNoteTitleChange, 
    handleSubmit, 
    handleCategoryChange, 
    handleNoteTextChange
  } = useCreateForm(formConfig)

  const variants : Variants = {
    hover: {scale: .9},
    tap: {scale: .7}
  }

  return (
    <aside className="sidebar">
      <ul>
        <form onSubmit={handleSubmit}>
          <li>
            <h3>Crear</h3>
          </li>

          <li>
            <input
              placeholder="Cita con el médico"
              onChange={handleNoteTitleChange}
              name='title'
              value={noteTitle}
            />
          </li>

          <li>
            <textarea
              placeholder="el dia 12 a las 14:30"
              onChange={handleNoteTextChange}
              name='text'
              value={noteText}
            />
          </li>


          {CATEGORIES.map((category, i) => {
            return (
              <li key={i}>
                <label htmlFor={`category-${category}`}>{category}</label>
                <motion.input 
                  type="checkbox" 
                  id={`category-${category}`} 
                  value={category} 
                  onChange={handleCategoryChange} 
                  variants={variants}
                  whileHover={'hover'}
                  whileTap={'tap'}
                />
              </li>
            );
          })} 
          
          <li>
            <motion.button 
              whileHover={'hover'}
              whileTap={'tap'}
              variants={variants}
            >
              Crear nueva
            </motion.button>
          </li>

        </form>      
      </ul>
    </aside>
  );
};
