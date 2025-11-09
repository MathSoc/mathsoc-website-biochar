import NextAuth, { Profile } from "next-auth";
import { authConfig } from "./auth.config";
import { OAuthUserConfig, OIDCConfig } from "next-auth/providers";
import Google, { GoogleProfile } from "next-auth/providers/google";

const googleConfig: Partial<OAuthUserConfig<GoogleProfile>> = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
};

const UWConfig: Partial<OIDCConfig<Profile>> = {
  issuer: process.env.UW_OIDC_ISSUER,
  clientId: process.env.UW_OIDC_CLIENT_ID,
  clientSecret: process.env.UW_OIDC_CLIENT_SECRET,
};

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Google(googleConfig),
    {
      // in retrospect, this was a bad choice of id. We have a DUO OIDC instance configured with UW, which this
      // reaches out to. We are not directly calling ADFS. oops.
      id: "uw-adfs",
      name: "University of Waterloo DUO OIDC",
      type: "oidc",
      issuer: UWConfig.issuer,
      clientId: UWConfig.clientId,
      clientSecret: UWConfig.clientSecret,
    },
  ],
});
