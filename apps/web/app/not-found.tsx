import { redirect } from "next/navigation";

export default function RootNotFound() {
  // Redirect to Polish 404 page by default
  redirect("/pl/404");
}
