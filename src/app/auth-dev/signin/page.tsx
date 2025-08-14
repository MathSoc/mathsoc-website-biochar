import { Page } from "../../components/page/page-component";
import { Metadata } from "next";
import { CustomSignIn } from "./actions";

export const metadata: Metadata = { title: "auth test" };

export default async function ProtectedPage() {
  return (
    <Page id="test-page-2">
      <form action={CustomSignIn}>
        <button type="submit">Signin with Google</button>
      </form>
    </Page>
  );
}
