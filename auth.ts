import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { OAuthUserConfig } from "next-auth/providers";
import Google, { GoogleProfile } from "next-auth/providers/google";
import c from "ansi-colors";

const authEnabled = process.env.AUTH_ENABLED;
console.info(
  authEnabled
    ? c.green(" ✓ MathSoc authentication enabled")
    : c.yellow(" ! MathSoc authentication DISABLED"),
);

const googleConfig: Partial<OAuthUserConfig<GoogleProfile>> = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
};

const validateConfigs = () => {
  if (!authEnabled) {
    return;
  }

  if (!googleConfig.clientId) {
    throw new Error(
      "Google client id unset; ask a past dev for it, or find it in the Google Cloud Console",
    );
  }

  if (!googleConfig.clientSecret) {
    throw new Error(
      "Google client secret unset; ask a past dev for it, or find it in the Google Cloud Console",
    );
  }
};

validateConfigs();

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [Google(googleConfig)],
});
