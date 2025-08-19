import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { OAuthUserConfig } from "next-auth/providers";
import Google, { GoogleProfile } from "next-auth/providers/google";
import c from "ansi-colors";
import { MicrosoftEntraIDProfile } from "next-auth/providers/microsoft-entra-id";

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

const microsoftConfig: Partial<OAuthUserConfig<MicrosoftEntraIDProfile>> = {
  clientId: process.env.ADFS_CLIENT_ID,
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

  if (!microsoftConfig.clientId) {
    throw new Error(
      "ADFS client id unset; ask a past dev for it, or find it on the old exam bank server",
    );
  }

  // if (!adfsConfig.clientSecret) {
  //   throw new Error(
  //     "ADFS client secret unset; ask a past dev for it, or find it on the old exam bank server",
  //   );
  // }
};

validateConfigs();

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    // Google(googleConfig),
    {
      id: "uw-adfs", // signIn(<id>)
      name: "University of Waterloo ADFS", // optional
      type: "oidc",
      issuer: "https://adfs.uwaterloo.ca/adfs",
      clientId: microsoftConfig.clientId,
    },
  ],
});
