import Image from "next/image";
import Link from "next/link";
import { auth, signIn, signOut } from "../../../auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={70} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session ? (
            <>
              <Link
                aria-label="Start Game"
                href="/recipe/create"
                className="px-8 py-2 text-black font-bold font-nunito rounded-full shadow-lg transition-transform transform bg-transparent border-2 border-[#c2c2c2] hover:scale-105 hover:border-green-600 hover:shadow-green-500/50 hover:shadow-2xl focus:outline-none"
                id="startButton"
              >
                 <span >
                  Criar
                </span>
                </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  className="font-nunito font-bold text-red-500"
                  type="submit"
                >
                  Logout
                </button>
              </form>

              <Link href={`/user/${session.id}`}>
                <span className="font-nunito font-bold">
                  {session.user?.name}
                </span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit" className="font-nunito font-bold">
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
