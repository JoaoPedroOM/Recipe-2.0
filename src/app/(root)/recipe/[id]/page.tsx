import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { RECIPE_BY_ID_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from "markdown-it";

const md = markdownit();

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const post = await client.fetch(RECIPE_BY_ID_QUERY, { id });

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="w-full min-h-[230px] flex justify-center items-center flex-col py-10 px-6">
        <div className="font-second flex flex-col items-center justify-center">
          <p className="font-medium text-[14px] px-4 py-1 rounded-full bg-[#f7f7f7]">
            {formatDate(post?._createdAt)}
          </p>
          <h1 className="font-nunito uppercase font-bold sm:text-[54px] text-[36px] px-6 py-3">
            {post.title}
          </h1>
          <p className="font-normal text-[20px] text-black max-w-3xl text-center break-words">
            {post.description}
          </p>
        </div>
      </section>

      <section className="px-6 py-10 max-w-[1200px] mx-auto">
        <img
          src={post.image}
          alt="Capa da postagem"
          className="w-full rounded-sm h-auto"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex justify-between items-center gap-5">
            <Link
              href={`../user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={
                  post.author?.image ||
                  "https://i.pinimg.com/474x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg"
                }
                alt={post.author?.name || "User"}
                width={50}
                height={50}
                className="rounded-full border"
              />
              <div className="flex-1">
                <p className="font-medium text-[16px] text-black line-clamp-1 px-2 w-fit">
                  {post.author?.name}
                </p>
                <p className="font-normal text-[14px] text-black line-clamp-1 px-2 w-fit">
                  {post.author?.username}
                </p>
              </div>
            </Link>
            <p className="text-[14px] px-4 py-1 rounded-full bg-[#f7f7f7] font-semibold">
              {post.category}
            </p>
          </div>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-nunito break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">Nenhum detalhe fornecido</p>
          )}
        </div>

        <hr className="border-dotted bg-zinc-400 max-w-4xl my-10 mx-auto" />
          
      </section>
    </>
  );
};

export default page;
