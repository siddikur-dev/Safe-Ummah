// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiClient } from "../../../../../lib/api";

// Build providers array conditionally so app doesn't break when Google credentials are missing
const providers = [];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
} else {
  console.warn('Google OAuth not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable Google sign-in.');
}

providers.push(
  CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // app/api/auth/[...nextauth]/route.js - Verify this part
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          console.log("🔐 Login attempt in NextAuth:", credentials.email);

          // Use API client for authentication
          const response = await apiClient.login({
            email: credentials.email,
            password: credentials.password,
          });

          console.log("🔍 Express backend response:", response);

          if (response.success && response.user) {
            console.log("✅ User authenticated:", response.user.email);
            return {
              id: response.user.id || response.user._id.toString(),
              email: response.user.email,
              name: response.user.name,
              image: response.user.image,
              role: response.user.role,
            };
          }

          throw new Error(response.message || "Authentication failed");
        } catch (error) {
          console.error("❌ NextAuth authorize error:", error.message);
          throw new Error(error.message || "Login failed");
        }
      },
    }),
  )

const authOptions = {
  providers,
  callbacks: {
    async jwt({ token, user, account }) {
      // If this is a sign-in (account available), handle provider-specific mapping
      if (account?.provider === 'google' && user) {
        try {
          const email = (user.email || '').toLowerCase();

          // Try to find existing user by email
          const allUsers = await apiClient.getAllUsers();
          if (allUsers.success) {
            const found = (allUsers.users || []).find((u) => String(u.email || '').toLowerCase() === email);
            if (found) {
              token.id = found.id || found._id || String(found._id);
              token.role = found.role || 'user';
              token.image = found.image || user.image || user.picture;
              token.provider = 'google';
              return token;
            }
          }

          // Not found: create a new user in backend using a random password
          const randomPassword = Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
          const createRes = await apiClient.createUser({
            name: user.name || user?.given_name || 'Google User',
            email: email,
            password: randomPassword,
            image: user.image || user.picture || '',
          });

          if (createRes.success) {
            const created = createRes.user;
            token.id = created.id || created._id || String(created._id || created.id);
            token.role = created.role || 'user';
            token.image = created.image || user.image || user.picture;
            token.provider = 'google';
            return token;
          }
        } catch (err) {
          console.error('NextAuth Google JWT error:', err);
        }
      }

      // Credentials or other flow: user object contains backend id already
      if (user) {
        token.id = user.id;
        token.provider = account?.provider || 'credentials';
        token.role = user.role;
        token.image = user.image;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.provider = token.provider;
        session.user.role = token.role;
        session.user.image = token.image;

        // Get fresh user data from backend
        try {
          const userProfile = await apiClient.getProfile(token.id);
          if (userProfile.success) {
            session.user.name = userProfile.user.name;
            session.user.email = userProfile.user.email;
            session.user.image = userProfile.user.image;
          }
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to home after login
      return `${baseUrl}/`;
    },
  },
  pages: {
    signIn: "/login",
    signUp: "/register",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
