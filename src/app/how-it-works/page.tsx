/**
 * Redirect /how-it-works -> /our-process
 */
import { redirect } from "next/navigation";

export default function HowItWorksRedirect() {
  redirect("/our-process");
}
