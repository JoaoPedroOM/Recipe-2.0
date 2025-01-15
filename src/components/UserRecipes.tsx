import { client } from '@/sanity/lib/client'
import { ALL_RECIPES_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import RecipeCard, { RecipeTypeCard } from './RecipeCard'

const UserRecipes = async ({id} : {id: string}) => {
  const recipes = await client.fetch(ALL_RECIPES_BY_AUTHOR_QUERY, {id})   
  return (
    <>
      {recipes.length > 0 ? recipes.map((recipe : RecipeTypeCard) => (
        <RecipeCard key={recipe._id} post={recipe}/>
      )) : (
        <p>Nenhuma receita criada até o momento</p>
      )}
    </>
  )
}

export default UserRecipes
