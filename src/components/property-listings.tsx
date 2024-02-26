import PropertyCard from "./PropertyCard";

export default function PropertyListings() {
    const properties = [1, 2, 3, 4, 5, 6]
    return (
        <main className="w-full space-y-10 px-5">
            <h1 className="text-3xl text-white font-semibold">Properties</h1>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        properties.map((_, i) => <PropertyCard key={i} />)
                    }
                </div>
            </div>
        </main>
    );
}