import { auth } from "../../../../auth";
import { Page } from "../../components/page/page-component";

import { Metadata } from "next";

export const metadata: Metadata = { title: "auth test" };

export default async function ProtectedPage() {
  const session = await auth();

  return (
    <Page id="council-page">
      <h1>You should not be able to see this page</h1>
      <div>session: {JSON.stringify(session)}</div>
    </Page>
  );
}
