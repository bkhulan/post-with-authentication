import NextAuth from "next-auth/next";
import connectMongoose from "../../../utils/connectMongoose";
import bcrypt from "bcrypt";

import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "../../../models/users";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // database: process.env.MONGO_URI,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        connectMongoose().catch((error) => {
          error: "Connection Failed...";
        });

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("Email is not registered!");
        }

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isMatch) {
          throw new Error("Password incorrect!");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/login' 
  }
};

export default NextAuth(authOptions);
