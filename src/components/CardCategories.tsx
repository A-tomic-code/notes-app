import { BiTrash } from 'react-icons/bi';
import { NewCategorySelect } from './NewCategorySelect';
import { Note } from '../types';

export interface CardCategoriesProps {
  note:Note
  isEditable: boolean
  categories: string[]
  
  handleDeleteCategory: (category:string) => void
  handleAddCategory: (category:string) => void
}

export const CardCategories = ({categories , isEditable, handleDeleteCategory, handleAddCategory, note}:CardCategoriesProps) => {


  return(
    <div className="card__categories">
    {categories.map((category, i) => {
      return (
        <span
          key={i}
          className="card__category"
          onClick={() => isEditable && handleDeleteCategory(category)}
        >
          {isEditable && <BiTrash />}
          <p>{category}</p>
        </span>
      );
    })}
    {isEditable && <NewCategorySelect categories={categories} handleAddCategory={handleAddCategory} note={note}/>}
  </div>
  )
}