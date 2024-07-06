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

      async authorize(credentials) {
        const { email, password } = credentials;
        console.log("LOGIN backend with:");
        console.log("email" + email);
        console.log("pass" + password);

        try{
          await connectMongodb();
        } catch (error) {
          console.log("error: " + error);
          throw new Error("Error signing In at the moment!");
        }

        try {
          const usr = await User.findOne({ email });
          console.log("checking done");

          if (!usr) {
            throw new Error("User not found! Please signup");
          }

          const passMatch = await bcrypt.compare(password, usr.password);

          if (!passMatch){
            throw new Error("Incorrect Password");
          }

          const user = { ...usr }; // Assuming you retrieve user data
          user.isEmailLogin = true;
          return user;

        } catch (error) {
          console.log("error: " + error);
          throw new Error(error.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("-----signin callback-----");
      
      if (!user) {
        console.log("User logged out");
        return; 
      }

      if(!account)
      {
        console.log("next sign in");
        return;
      }

      if(account.provider){
        console.log("login with :",account.provider)
      }
      else{
        console.log("provider not found");
        return false;
      }

      if(account.provider=="credentials"){
        return true;
      }

      console.log("google login");
      try{
        await connectMongodb();
      } catch (error) {
        console.log("error: " + error);
        return false;
      }
      
      const usrEmail = user['email']
      const usrName = user['name']
      const usrImage = user['image']

      console.log('User email:', usrEmail);

      try {
        const usr = await User.findOne({ email:usrEmail });
        console.log("checking done");

        if (usr) {
          console.log("User found");
          return true;
        }
        
        console.log("need to signup")
        try {
            await User.create({ name: usrName,  email: usrEmail, image: usrImage, isgooglelogin:true })
        }
        catch (error) {
            console.log("error:" + error)
        }
        console.log("creating user success")
        return true;
      } catch (error) {
        console.log("error: " + error);
        return false;
      }
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },

    // async jwt(token, user, account) {
    //   console.log("-----jwt callback-----");
    //   return token;
    // },
    // async session(session, token) {
    //   console.log("-----session callback-----");
    //   // console.log("no session user", session)
    //   // console.log("tok", token);
    //   return session;
    // },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };