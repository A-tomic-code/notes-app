import { BiTrash } from 'react-icons/bi';
import { CardCategoriesProps } from '../types';
import { NewCategorySelect } from './NewCategorySelect';

export const CardCategories = ({categories , isEditable, handleDeleteCategory, handleAddCategory, note}:CardCategoriesProps) => {


  return(
    <div className="card__categories">
    {categories.map((category, i) => {
      return (
        <span
          key={i}
          className="card__category"
          onClick={() => isEditable && handleDeleteCategory(category)}
        ><p>
          {isEditable && <BiTrash />}
          {category}</p>
        </span>
      );
    })}
    {isEditable && <NewCategorySelect categories={categories} handleAddCategory={handleAddCategory} note={note}/>}
  </div>
  )
}