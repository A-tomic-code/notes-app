import { BiEditAlt, BiSave, BiTrash } from 'react-icons/bi';
import { CardActionsProps } from '../types';


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