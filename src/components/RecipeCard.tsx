"use client"

import { cn, formatDate } from "@/lib/utils";
import { Recipe, Author } from "@/sanity/types";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import { deleteRecipe } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

export type RecipeTypeCard = Omit<Recipe, "author"> & { author?: Author };

const RecipeCard = ({ post, onDelete, userId }: { post: RecipeTypeCard, onDelete?: (id: string) => void, userId?: string }) => {
  const { _createdAt, author, title, category, _id, description, image } = post;
  const { toast } = useToast();
  
  const handleDeleteRecipe = async () => {
    try {
      const result = await deleteRecipe(_id);

      if (result.status === "SUCCESS") {
        toast({
          title: "Sucesso",
          description: "Receita excluída",
        });

        if (onDelete) {
          onDelete(_id);
        }
      } else {
        toast({
          title: "Falha",
          description: result.error || "Não foi possível excluir a receita",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado",
        variant: "destructive",
      });
    }
  };

  return (
    <li className="w-80 transform rounded-lg bg-white py-4 px-5 shadow-md hover:shadow-orange-500/50">
      <div className="flex justify-between items-center font-second my-2">
        <p className="font-medium text-[14px] px-4 py-1 rounded-full bg-[#f7f7f7]">
          {formatDate(_createdAt)}
        </p>
        {author?._id === userId && (
          <button
            className="text-red-500 hover:text-red-700"
            onClick={handleDeleteRecipe} 
          >
            <TrashIcon className="size-5" />
          </button>
        )}
      </div>

      <Link href={`/recipe/${_id}`}>
        <img
          className="h-[164px] w-full rounded-[10px] object-cover"
          alt="Card Image"
          src={image}
        />
      </Link>

      <div className="flex justify-between items-center font-second mb-2 mt-4">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="font-medium text-[16px] text-black line-clamp-1 px-2 w-fit">{author?.name}</p>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image || "https://i.pinimg.com/474x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg"}
            alt={author?.name || "User"}
            width={30}
            height={30}
            className="rounded-full border"
          />
        </Link>
      </div>

      <Link href={`/recipe/${_id}`}>
        <div className="p-2 font-nunito">
          <h2 className="text-xl font-bold font-nunito line-clamp-1">{title}</h2>
          <p className="text-gray-600 font-nunito line-clamp-3">{description}</p>
        </div>
      </Link>

      <div className="flex justify-between items-center gap-3 mt-2 font-second">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-[14px] px-4 py-1 rounded-full bg-[#f7f7f7] font-bold">
            {category}
          </p>
        </Link>
        <Link href={`/recipe/${_id}`}>
          <button className="rounded-full bg-black font-medium text-[16px] text-white px-5 py-1">
            Detalhes
          </button>
        </Link>
      </div>
    </li>
  );
};

export const CardSkeleton = () => {
  return (
    <>
      {[0, 1].map((index) => (
        <li key={cn('skeleton', index)}>
          <Skeleton className="w-full h-[380px] rounded-lg bg-zinc-400" />
        </li>
      ))}
    </>
  );
};

export default RecipeCard;
