import { BiEditAlt, BiSave, BiTrash } from 'react-icons/bi';
import { Variants } from 'framer-motion';

export interface CardActionsProps {
  actions: {
    handleSaveEdit: (id: number) => void;
    handleDelete: (id: number) => void; 
  }
  id: number
  isEditable: boolean
  variants: Variants

}

export const CardActions = ({actions, id, isEditable}:CardActionsProps) => {

  return (
    <div className="card__actions">
      
      <button
        className="card__action-edit"
        onClick={() => actions.handleSaveEdit(id)}
      >
        {isEditable ? <BiSave /> : <BiEditAlt />}
      </button>

      <button
        className="card__action-delete"
        onClick={() => actions.handleDelete(id)}
      >
        <BiTrash />
      </button>
    </div>
  );
};