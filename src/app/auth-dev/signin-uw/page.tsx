import { Metadata } from "next";
import { protectToStudents } from "../../auth.actions";

export const metadata: Metadata = { title: "Protected page" };

export default async function ProtectedPage() {
  await protectToStudents();

  return "this page requires a minimum of UW auth";
}
