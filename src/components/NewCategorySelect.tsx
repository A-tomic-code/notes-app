import { useNotes } from '../hooks/useNotes'
import { Note } from "../types"

export interface NewCategorySelectProps {
  handleAddCategory: (category:string) => void
  categories: string[]
  note:Note
}

export const NewCategorySelect = ({categories, handleAddCategory}:NewCategorySelectProps) => {
  const ALL_CATEGORIES = useNotes().CATEGORIES
  const CATEGORY_VALUES: { [key: string]: string } = {   //aqui añado las opciones personalizadas
    add : 'Añadir'    
  }
  ALL_CATEGORIES.map((category: string) =>{   // y aqui las de las categorias
    if(!categories.includes(category)) CATEGORY_VALUES[category]= category
  })


  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newCategory = event.target.value;
      handleAddCategory(newCategory)
  }

  return(
    <select className="new-category-select" onChange={handleChange}>
      {
        Object.values(CATEGORY_VALUES).map((category:string) => {
          return <option value={category} >{category}</option>
        })
      }

    </select>
  )
}