import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { ROLES } from "@/lib/roles";

const client = new MongoClient(process.env.MONGO_DB_DASE_URI as string);
const db = client.db('hireloopdb');

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL, 
    emailAndPassword: { 
    enabled: true, 
  },
  user: {
    additionalFields: {
      role: {
        // ROLES shared with the sign-up form (lib/roles.ts) so both stay in sync.
        // input: true lets the client send the chosen role on sign-up;
        // defaultValue covers sign-ups that can't send one (e.g. Google OAuth).
        type: [...ROLES],
        input: true,
        defaultValue: "seeker",
      },
    },
  },
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
  database: mongodbAdapter(db, {
    client,
  }),
});