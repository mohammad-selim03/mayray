import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/getPageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const base = await getPageMetadata("terms");
  return {
    ...base,
    title: "Terms and Conditions | Mayray AI",
  };
}

export { default } from "../terms/page";
