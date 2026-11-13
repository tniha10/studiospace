import { createAuthClient } from "better-auth/react";

// Requests go through the Next.js /api rewrite, so the auth cookies stay on
// this origin and no CORS configuration is needed in the browser.
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession } = authClient;
