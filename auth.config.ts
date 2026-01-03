import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminSection = nextUrl.pathname.startsWith("/admin");

      if (isAdminSection) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // Verify if the user is actually an admin if they are logged in and trying to access admin
        if (auth.user.role !== "admin" && isAdminSection) {
          return Response.redirect(new URL("/", nextUrl));
        }
        // Optionally redirect logged in admins away from login page to dashboard
        if (nextUrl.pathname.startsWith("/login")) {
          return Response.redirect(new URL("/admin", nextUrl));
        }
      }
      return true;
    },
    // Add role to session
    async session({ session, token }) {
      if (token.role && session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
