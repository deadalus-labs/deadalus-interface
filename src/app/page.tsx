"use client";

import CounterDeposit from "@/components/counter-deposit";
import CounterConnect from "@/components/counter-shell";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <CounterConnect />
    </main>
  );
}
