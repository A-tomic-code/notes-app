import { Sidebar } from './Sidebar';
import { NoteCard } from './NoteCard';
import { useNotes } from '../hooks/useNotes';
import { useEffect, useState } from 'react';
import { Note } from '../types';
import { AnimatePresence, motion } from 'framer-motion';


export const Content = () => {
  const { loadFromLocalStorage, filterNotes, notes } = useNotes();
  const [isLoaded, setIsLoaded] = useState(false);
  const [timerId, setTimerId] = useState<number>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timerId);

    const newTimerId = setTimeout(() => {
      filterNotes(event.target.value);
    }, 500);

    setTimerId(newTimerId);
  };
  if (!isLoaded && notes.length === 0) {
    setIsLoaded(true);
    loadFromLocalStorage();
  }
  useEffect(() => {
    return () => clearTimeout(timerId);
  }, [timerId]);

  return (
    <div className="container">
      <Sidebar />

      <section className="content">
        <form>
          <input
            type="text"
            placeholder="Etiquetas, Titulo.."
            onChange={handleChange}
          />
        </form>

        <motion.div className="notes-wrapper">
          <AnimatePresence>
            {notes.length > 0 &&
              notes.map((note: Note, i: number) => {
                return <NoteCard key={i} note={note} />;
              })}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
};
