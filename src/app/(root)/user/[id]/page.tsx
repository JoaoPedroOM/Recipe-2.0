import React, { Suspense } from "react";
import { auth } from "../../../../../auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserRecipes from "@/components/UserRecipes";
import { CardSkeleton } from "@/components/RecipeCard";

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const userId = session?.id || ""

  const user = await client.fetch(AUTHOR_BY_QUERY, { id });

  const ajusteGoogleImageSize = (imageUrl: string) => {
    if (imageUrl.includes('lh3.googleusercontent.com')) {
      return imageUrl.replace(/=s\d{2,3}-c$/, '=s400');
    }
    return imageUrl; 
  };

  const userWithAdjustedImage = {
    ...user,
    image: ajusteGoogleImageSize(user.image),
  };

  if (!user) return notFound();

  return (
    <>
      <section className="w-full pb-10 lg:pt-20 pt-5 lg:px-6 px-[10px] max-w-7xl mx-auto lg:flex-row flex-col flex gap-10 font-nunito">
        
        <div className="lg:w-[400px] w-[300px] relative mt-4 h-[430px] group mx-auto bg-white dark:border-0 border rounded-md dark:text-white text-black flex flex-col">
          <div className="w-full rounded-t-md h-[350px] group-hover:h-[410px] overflow-hidden transition-all duration-300">
            <Image
              src={userWithAdjustedImage.image}
              alt={user.name}
              width={600}
              height={600}
              className="h-full w-full scale-105 group-hover:scale-100 group-hover:grayscale-0 object-cover transition-all duration-300"
            />
          </div>
          <article className="relative overflow-hidden flex-grow">
            <div className="info p-2 translate-y-0 group-hover:-translate-y-20 transition-all duration-300">
              <p className="md:text-2xl font-semibold">{user.name}</p>
              <p className="sm:text-base text-sm">{user.username}</p>
            </div>
            <button className="absolute h-10 -bottom-8 opacity-0 group-hover:opacity-100 cursor-pointer group-hover:bottom-3 text-[20px] font-medium transition-all duration-300 w-full text-center">
              {user.bio}
            </button>
          </article>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-[30px] font-bold text-black">
            {session?.id === id ? "Suas" : "Todas"} Receitas
          </p>
          <ul className="grid sm:grid-cols-2 gap-5 place-items-center">
            <Suspense fallback={<CardSkeleton/>}>
              <UserRecipes id={id} userId={userId}/>
            </Suspense>
          </ul>
        </div>

      </section>
    </>
  );
};

export default page;
