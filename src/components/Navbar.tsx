import Image from "next/image";
import Link from "next/link";
import { auth, signIn, signOut } from "../../auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

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
                className="px-8 py-2 text-black font-bold font-nunito rounded-full shadow-lg transition-transform transform bg-transparent border-2 border-[#c2c2c2] hover:scale-105 hover:border-orange-500 hover:shadow-orange-500/50 hover:shadow-2xl focus:outline-none"
                id="startButton"
              >
                <span>Criar</span>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Image
                    src={
                      session.user?.image ||
                      "https://i.pinimg.com/474x/31/ec/2c/31ec2ce212492e600b8de27f38846ed7.jpg"
                    }
                    alt={session.user?.name || "User"}
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                  />
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuLabel asChild>
                    <Link href={`/user/${session.user?.id}`}>
                      <span>Perfil</span>
                    </Link>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
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
                        Sair
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <form
                action={async () => {
                  "use server";
                  await signIn("google");
                }}
              >
                <button className="hover:scale-105 font-nunito cursor-pointer duration-200 md:px-7 py-3 px-3 gap-x-0.5 gap-y-0.5 justify-center text-[#101010] bg-[linear-gradient(#d8d8d8,#edecec)] group-hover:bg-[linear-gradient(#e2e2e2,#fefefe)] items-center font-bold gap-4 inline-flex overflow-hidden rounded-full black group-hover:text-blue-600">
                  <img src="/icon-google.svg" className="w-[27px]" />
                  <span className="ml-2 hidden md:block">Login with Google</span>
                </button>
              </form>

              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <button
                  type="submit"
                  className="flex gap-x-0.5 gap-y-0.5 font-nunito cursor-pointer justify-center items-center md:px-7 py-3 px-3 text-white font-semibold bg-gradient-to-r from-gray-600 md:to-gray-900 to-gray-700 rounded-full hover:scale-105 duration-200 hover:border-gray-800"
                >
                  <img src="/icon-github.svg" className="w-[30px]" />
                  <span className="ml-2 hidden md:block">Login with GitHub</span>  
                </button>
              </form>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
