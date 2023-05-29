import { Variants, AnimationProps } from "framer-motion";

export interface Note {
  id:number,
  title: string,
  text: string,
  categories: string[]
}

export interface NoteCardProps {
  note: Note;
  
}

export interface NewCategorySelectProps {
  handleAddCategory: (category:string) => void
  categories: string[]
  note:Note
}

export interface CardCategoriesProps {
  note:Note
  isEditable: boolean
  categories: string[]
  
  handleDeleteCategory: (category:string) => void
  handleAddCategory: (category:string) => void
}
export interface CardActionsProps {
  actions: {
    handleSaveEdit: (id: number) => void;
    handleDelete: (id: number) => void; 
  }
  id: number
  isEditable: boolean
  variants: Variants
  animate?: string,
  initial?:string,
  layout?: boolean
}

export enum Category {
  
}