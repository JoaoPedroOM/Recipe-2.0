import React from "react";
import HeroHighlightCreate from "@/components/HeroHighlightCreate";
import RecipeForm from "@/components/RecipeForm";
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth()

  if(!session) redirect("/")

  return (
    <>
      <section className="w-full min-h-[320px] flex justify-center items-center flex-col font-second uppercase">
       <HeroHighlightCreate/>
      </section>

      <RecipeForm/>
    </>
  );
};

export default page;
