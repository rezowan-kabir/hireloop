import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { ROLES } from "@/lib/roles";

const client = new MongoClient(process.env.MONGO_DB_DASE_URI as string);
const db = client.db("hireloopdb");
const socialProviders =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }
    : {};

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  user: {
    additionalFields: {
      role: {
        type: [...ROLES],
        input: true,
        defaultValue: "seeker",
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => ({
          data: {
            ...user,
            role: user.role === "recruiter" ? "recruiter" : "seeker",
          },
        }),
      },
      update: {
        before: async (user) => {
          if ("role" in user) return false;
        },
      },
    },
  },
  socialProviders,
  database: mongodbAdapter(db, {
    client,
  }),
});
