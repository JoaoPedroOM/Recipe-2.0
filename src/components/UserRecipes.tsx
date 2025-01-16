"use client"

import { client } from '@/sanity/lib/client'
import { ALL_RECIPES_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React, { useEffect, useState } from 'react'
import RecipeCard, { RecipeTypeCard } from './RecipeCard'

const UserRecipes = ({ id, userId }: { id: string, userId: string }) => {
  const [recipes, setRecipes] = useState<RecipeTypeCard[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const fetchedRecipes = await client.fetch(ALL_RECIPES_BY_AUTHOR_QUERY, { id });
      setRecipes(fetchedRecipes);
    };

    fetchRecipes();
  }, [id]);

  const handleDeleteRecipe = (deletedId: string) => {
    setRecipes((prevRecipes) => prevRecipes.filter(recipe => recipe._id !== deletedId));
  };

  return (
    <>
      {recipes.length > 0 ? recipes.map((recipe: RecipeTypeCard) => (
        <RecipeCard key={recipe._id} post={recipe} onDelete={handleDeleteRecipe} userId={userId}/>
      )) : (
        <p>Nenhuma receita criada até o momento</p>
      )}
    </>
  );
}

export default UserRecipes;