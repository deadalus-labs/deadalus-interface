import PropertyListings from "@/components/property-listings";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)]">
      <PropertyListings />
    </main>
  );
}
