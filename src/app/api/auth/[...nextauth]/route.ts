import connectDB from "@/lib/dbConnect";
import User from "@/models/User";
import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      role: string;
      address?: string;
      phone?: string;
      restaurantId?: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },

  providers: [
    GoogleProvider({
      clientId:
        process.env.GOOGLE_ID ??
        (() => {
          throw new Error("GOOGLE_ID is not defined");
        })(),
      clientSecret:
        process.env.GOOGLE_SECRET ??
        (() => {
          throw new Error("GOOGLE_SECRET is not defined");
        })(),
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();

        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("No user found with this email");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid password");

        // Convert Mongoose document to plain object and ensure 'id' is present
        return {
          id: (user._id as { toString: () => string }).toString(),
          name: user.name,
          email: user.email,
          image: user.avatar,
          role: user.role,
          address: user.address,
          phone: user.phone,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      await connectDB();
      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          role: "customer",
        });
      }

      return true;
    },

    async session({ session }) {
      await connectDB();
      const dbUser = await User.findOne({ email: session.user?.email });

      if (dbUser && session.user) {
        session.user.id = (dbUser._id as { toString: () => string }).toString();
        session.user.name = dbUser.name;
        session.user.email = dbUser.email;
        session.user.address = dbUser.address;
        session.user.image = dbUser.avatar ? dbUser.avatar : session.user.image;
        session.user.phone = dbUser.phone;
        session.user.role = dbUser.role;
        session.user.restaurantId = dbUser.restaurantId?.toString() || null;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
