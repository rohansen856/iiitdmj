import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { env } from "env.mjs"
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import { db } from "@/lib/db"

export const authOptions: NextAuthOptions = {
  // huh any! I know.
  // This is a temporary fix for prisma client.
  // @see https://github.com/prisma/prisma/issues/16117
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        if (profile?.email && profile.email.endsWith("@iiitdmj.ac.in")) {
          let emailId: string = profile.email.toUpperCase()
          let year: number = parseInt(emailId.slice(0, 2))
          let programme: string = emailId.slice(2, 3)
          let branch: string = emailId.slice(3, 5)
          let roll: number = parseInt(emailId.slice(5, 8))
          if (year < 17 || year > 25) return false
          if (programme !== "B" || "M" || "P") return false
          if (branch !== "CS" || "EC" || "ME" || "SM" || "DS") return false
          if (roll > 500 || roll < 10) return false

          await db.student.create({
            data: {
              id: Math.random().toString(),
              email: emailId,
              programme,
              semester: new Date().getFullYear() - year - 1999,
              branch,
              group: "B",
            },
          })

          return true
        }
        return false
      }

      return true
    },

    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl + "/dashboard/profile"
    },
  },
}
