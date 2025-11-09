import { Metadata } from "next";
import { protectToAdmins } from "../../auth.actions";

export const metadata: Metadata = { title: "Admin page" };

export default async function ProtectedPage() {
  await protectToAdmins();

  return "this page requires a minimum of google auth";
}
