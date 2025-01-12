import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Author = {
  _id: string;
  name: string;
  image: string;
};

type RecipeTypeCard = {
  _id: string;
  _createAt: string;
  views: number;
  author: Author;
  title: string;
  category: string;
  description: string;
  image: string;
};

const RecipeCard = ({ post }: { post: RecipeTypeCard }) => {
  const { _createAt, views, author, title, category, _id, description, image } =
    post;

  return (
    <li className="w-80 transform rounded-lg bg-white p-4 shadow-md hover:shadow-orange-500/50">

      <div className="flex justify-between items-center font-second my-2">
        <p className="font-medium text-[14px] px-4 py-1 rounded-full bg-[#f7f7f7]">
          {formatDate(_createAt)}
        </p>
        <div className="flex items-center gap-1.5">
          <EyeIcon className="size-4 text-primary" />
          <span className="font-medium text-[14px] text-black">{views}</span>
        </div>
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
          <Link href={`/user/${author._id}`}>
            <p className="font-medium text-[16px] text-black line-clamp-1 px-2 w-fit">{author.name}</p>
          </Link>
        </div>
        <Link href={`/user/${author._id}`}>
          <Image
            src={author.image}
            alt={author.name}
            width={30}
            height={30}
            className="rounded-full border"
          />
        </Link>
      </div>

      <Link href={`/recipe/${_id}`}>
        <div className="p-2 font-nunito">
          <h2 className="text-xl font-bold font-nunito">{title}</h2>
          <p className="text-gray-600 font-nunito">{description}</p>
        </div>
      </Link>

      <div className="flex justify-between items-center gap-3 mt-2 font-second">
        <Link href={`/?query=${category.toLowerCase()}`}>
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
