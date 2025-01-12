import Hero from "../components/Hero";
import RecipeCard from "../components/RecipeCard";
import Search from "../components/Search";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = [
    {
      _createAt: new Date(),
      views: 90,
      author: {
        _id: 1,
        name: "João Pedro",
        image:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      },
      _id: 1,
      description: "Uma descrição legal",
      image:
        "https://img.freepik.com/fotos-gratis/alimentos-para-massas-gerados_23-2150664642.jpg?t=st=1736692489~exp=1736696089~hmac=1dbf693608dbb470ba79bcda9255aeb1176ad8d45596fcdbe9a4ceef4662a2ac&w=1380",
      category: "Massas",
      title: "Lasanha caseira",
    },
  ];

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
        <ul className="mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5 place-items-center">
          {posts?.length > 0 ? (
            posts.map((post) => <RecipeCard key={post?._id} post={post} />)
          ) : (
            <p className="text-normal text-sm">Nenhum post foi encontrado</p>
          )}
        </ul>
      </section>
    </>
  );
}
