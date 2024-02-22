import './style.css'
import './components/card.ts'
import './components/examples/todo.ts'
import './components/modal-form-recipe.ts'
import './components/task/index.ts'
import { Repo } from './repo.ts'
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
const repo = new Repo(supabase)

// # render recipes array
repo.getTasks().then(tasks => {
  const elements = tasks.map(recipe => {
    const element = document.createElement('card-recipe')
    element.setAttribute('id', 'id' + recipe.id.toString())
    element.setAttribute('title', recipe.name)
    element.setAttribute('description', recipe.listId)
    return element
  })
  const recipesContainer = document.querySelector('#recipes')
  elements.forEach(element => recipesContainer?.appendChild(element))
})

// # handlers
// const btnNew = document.querySelector('#btn-new') as HTMLInputElement
// btnNew.addEventListener('click', () => {
//   const modal = document.createElement('modal-form-recipe')
//   modal.setAttribute('nextID', (recipes.length + 1).toString())
//   document.querySelector('.container')!.appendChild(modal)
// })