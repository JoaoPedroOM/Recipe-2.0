import { formatDate } from "@/lib/utils";
import { Recipe, Author } from "@/sanity/types";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export type RecipeTypeCard = Omit<Recipe, "author"> & {author?: Author} 

const RecipeCard = ({ post }: { post: RecipeTypeCard }) => {
  const { _createdAt, author, title, category, _id, description, image} =
    post;

  return (
    <li className="w-80 transform rounded-lg bg-white py-4 px-5 shadow-md hover:shadow-orange-500/50">

      <div className="flex justify-between items-center font-second my-2">
        <p className="font-medium text-[14px] px-4 py-1 rounded-full bg-[#f7f7f7]">
          {formatDate(_createdAt)}
        </p>
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

export default RecipeCard;
