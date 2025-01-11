import Hero from "../components/Hero";
import Search from "../components/Search";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {

  const query = (await searchParams).query

  return (
    <>
      <Hero/>
      <div className="flex items-center justify-center mt-10 w-full px-4 sm:px-0">
        <Search query={query}/>
      </div>
    </>
  );
}
