import Hero from "../../components/Hero";
import RecipeCard, { RecipeTypeCard } from "../../components/RecipeCard";
import Search from "../../components/Search";
import { RECIPES_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "../../../auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = {search: query || null}

  const session = await auth()

  console.log(session?.id)

  const {data: posts} = await sanityFetch({query: RECIPES_QUERY, params})

  return (
    <>
      <Hero />
      <div className="flex items-center justify-center mt-10 w-full px-4 sm:px-0">
        <Search query={query} />
      </div>
      <section className="md:px-6 px-3 py-10 max-w-[1200px] mx-auto">
        <p className="text-2xl font-nunito font-semibold">
          {query
            ? `Resultados de pesquisa para "${query}"`
            : "Todas as receitas"}
        </p>
        <ul className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
          {posts?.length > 0 ? (
            posts.map((post: RecipeTypeCard) => (
              <RecipeCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="text-normal text-base font-nunito">Nenhum post foi encontrado 😔</p>
          )}
        </ul>
      </section>

      <SanityLive/>
    </>
  );
}
