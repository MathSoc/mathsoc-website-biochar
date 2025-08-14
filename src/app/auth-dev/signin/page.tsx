import { Page } from "../../components/page/page-component";
import { Metadata } from "next";
import { signIn, signOut } from "../../../../auth";

export const metadata: Metadata = { title: "auth test" };

export default async function ProtectedPage() {
  return (
    <Page id="test-page-2">
      <form
        action={async () => {
          "use server";
          signIn();
        }}
      >
        <button type="submit">Signin with Google</button>
      </form>

      <form
        action={async () => {
          "use server";
          signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </Page>
  );
}
