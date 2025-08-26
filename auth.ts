import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { OAuthUserConfig } from "next-auth/providers";
import { GoogleProfile } from "next-auth/providers/google";
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

const UWConfig = {
  issuer: process.env.UW_OIDC_ISSUER,
  clientId: process.env.UW_OIDC_CLIENT_ID,
  clientSecret: process.env.UW_OIDC_CLIENT_SECRET,
};

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    // Google(googleConfig),
    {
      id: "uw-adfs", // signIn(<id>)
      name: "University of Waterloo ADFS", // optional
      type: "oidc",
      issuer: UWConfig.issuer,
      clientId: UWConfig.clientId,
      clientSecret: UWConfig.clientSecret,
    },
  ],
});
