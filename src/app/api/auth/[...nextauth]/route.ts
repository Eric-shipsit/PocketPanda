// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from "next-auth";
import { authOptions } from "@/app/libs/auth";
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
