import type { Route } from "./+types/home";
import Landing from "~/landing/landing";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Fetch" },
    { name: "description", content: "Adopt a dog" },
  ];
}

export default function Home() {
  return (
  <Landing />
  )
}
