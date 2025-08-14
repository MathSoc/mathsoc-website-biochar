import { Page } from "../../components/page/page-component";
import { Metadata } from "next";
import { signIn, signOut } from "../../../../auth";
import "./signin.scss";

export const metadata: Metadata = { title: "auth test" };

export default async function ProtectedPage() {
  return (
    <Page id="signin-page">
      <form
        action={async () => {
          "use server";
          await signIn();
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </Page>
  );
}
