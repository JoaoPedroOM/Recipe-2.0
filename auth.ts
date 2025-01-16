import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
  callbacks: {
    async signIn({ user, profile, account }) {
      const userId = account?.provider === 'google' ? profile?.sub : profile?.id;
      
      if (!userId) {
        console.error('No user ID found in profile:', profile);
        return false;
      }

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_ID_QUERY, { 
          id: userId,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: userId,
          name: user.name,
          username: account?.provider === 'google' ? user.email : profile?.login,
          email: user.email,
          image: user.image,
          bio: profile?.bio || "",
        });
      }

      return true;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        const userId = account.provider === 'google' ? profile.sub : profile.id;
        
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_ID_QUERY, { 
            id: userId,
          });

        token.id = user?._id;
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        id: token.id,
      };
    },
  },
});