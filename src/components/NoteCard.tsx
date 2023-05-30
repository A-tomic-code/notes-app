import { useNotes } from '../hooks/useNotes';
import { useState } from 'react';
import { CardActions } from './CardActions';
import { CardCategories } from './CardCategories';

import {Variants, motion} from 'framer-motion'
import { Note } from '../types';

export interface NoteCardProps {
  note: Note;
}

export const NoteCard = ({note}: NoteCardProps) => {
  const { deleteNote, updateNote } = useNotes();
  const [isEditable, setIsEditable] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [categories, setCategories] = useState(note.categories);

  const handleSaveEdit = (id: number): void => {
    updateNote(id, { id, title, text, categories });
    setIsEditable(!isEditable);
  };

  const handleDelete = (id: number): void => {
    deleteNote(id);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setText(e.target.value);
  };

  const handleAddCategory = (newCategory: string): void => {
   if(newCategory !== 'Añadir') setCategories([...categories, newCategory]); //!!! HARDCODEADO
  };
  const handleDeleteCategory = (category: string): void => {
    const newCategories = categories.filter((cat) => cat !== category);
    setCategories(newCategories);
  };

  const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.div 
      className="card" 
      initial="initial"
      animate="animate"
      exit="exit"
      variants={containerVariants}
      layout
    >

      <CardActions
        actions={{
          handleDelete: handleDelete,
          handleSaveEdit: handleSaveEdit    
        }}
        id={note.id}
        isEditable={isEditable}
        variants={containerVariants}
      />

      {isEditable ? (
        <input value={title || note.title} onChange={handleTitleChange} />
      ) : (
        <h4>{note.title}</h4>
      )}

      {isEditable ? (
        <textarea value={text || note.text} onChange={handleTextChange} />
      ) : (
        <p>{note.text}</p>
      )}


      <CardCategories 
        note={note} 
        isEditable={isEditable} 
        categories={categories} 
        handleDeleteCategory={handleDeleteCategory} 
        handleAddCategory={handleAddCategory} 
      />

    </motion.div>
  );
};
