"use client";

import CounterDeposit from "@/components/counter-deposit";
import CounterDetail from "@/components/counter-detail";
import CounterFractionalizer from "@/components/counter-fractionalize";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <CounterDetail />
    </main>
  );
}
