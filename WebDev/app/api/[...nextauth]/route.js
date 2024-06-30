import { connectMongodb } from "@/lib/mongodb";
import NextAuth from "next-auth/next";
import User from "@/models/user";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        console.log("LOGIN backend");
        try {
          await connectMongodb();
          console.log("email" + email);
          console.log("pass" + password);

          const usr = await User.findOne({ email });
          console.log("done");

          if (!usr) {
            return null;
          }
          const passMatch = await bcrypt.compare(password, usr.password);

          if (!passMatch) return null;

          return usr;
        } catch (error) {
          console.log("error getting creds" + error);
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/", // Using homepage for login
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
