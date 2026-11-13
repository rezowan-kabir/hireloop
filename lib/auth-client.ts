import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

// inferAdditionalFields makes server-side additional fields (e.g. `role`)
// visible to the client, so signUp.email() accepts and types them.
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});
export const { signIn, signUp, signOut, useSession } = authClient;

