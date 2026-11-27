import "server-only";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { credentialsSchema } from "@/server/auth-validation";
import { consumeRateLimit } from "@/server/rate-limit";
import { clientIpFromHeaders } from "@/server/rate-limit-policy";
import { getPrisma } from "@/server/db";

const authSecret = process.env.AUTH_SECRET;
if (!authSecret || Buffer.byteLength(authSecret) < 32) {
  throw new Error("AUTH_SECRET must be configured with at least 32 bytes.");
}

export const authOptions: NextAuthOptions = {
  secret: authSecret,
  debug: false,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        const parsed = credentialsSchema.safeParse({
          email: credentials?.email,
          password: credentials?.password,
        });
        if (!parsed.success) return null;

        const clientIp = clientIpFromHeaders(request.headers?.["x-real-ip"], request.headers?.["x-forwarded-for"]);
        if (clientIp && !(await consumeRateLimit("login-ip", clientIp, 30, 15 * 60 * 1000))) return null;
        if (!(await consumeRateLimit("login-email", parsed.data.email, 10, 15 * 60 * 1000))) return null;

        const user = await getPrisma().user.findUnique({
          where: { email: parsed.data.email },
          select: { id: true, email: true, emailVerifiedAt: true, passwordHash: true },
        });
        if (!user || !user.emailVerifiedAt || !user.passwordHash) return null;
        if (!(await compare(parsed.data.password, user.passwordHash))) return null;

        return { id: user.id, email: user.email };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) session.user.id = token.sub;
      return session;
    },
  },
};
