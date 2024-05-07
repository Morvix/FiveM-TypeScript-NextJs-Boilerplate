"use client";
import SpawnSelector from "@/components/spawnselection/spawnselector";
import Multicharacter from "@/components/multicharater/Multicharacter";

export default function Home() {
  return (
    <main>
      <Multicharacter />
      <SpawnSelector />
    </main>
  );
}
