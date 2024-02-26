{
  /* <div className="max-h-[calc(100vh-4rem)] overflow-auto">
        <div className="grid grid-cols-3 gap-4">
          {events &&
            events.events.map((flat: any, index: number) => (
              <div key={index} className="card w-96 bg-base-100 shadow-xl">
                <figure className="relative max-w-[300px] max-h-[200px] rounded-lg">
                  <Image
                    src="/property.png"
                    alt="property image"
                    width={300}
                    height={200}
                    layout="responsive"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">Flat address</h2>
                  <p>{shortAddress(flat.data[0])}</p>
                  <div className="card-actions justify-end">
                    <Link href="/counters/property">
                      <button className="btn btn-primary">Enter</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div> */
}
--------------
      <p> VaultContractAddress: {vaultContractAddress}</p>
      <button
        className="btn"
        onClick={() => {
          console.log("Address", account?.address);
          console.log("Provider", providerGoerli);
          console.log("ABI", abi);
          console.log("contract", contract);
          console.log("Events", events);
        }}
      >
        Click me
      </button>
      <button
        className="btn"
        onClick={() => {
          getAbi(providerGoerli, vaultContractAddress);
        }}
      >
        1. Get Abi
      </button>
      <button
        className="btn"
        onClick={() => {
          getContract(abi, vaultContractAddress, providerGoerli);
        }}
      >
        2. Get Contract
      </button>
      <button
        className="btn"
        onClick={() => {
          getEvents();
        }}
      >
        5. Events
      </button>
      <button
        className="btn"
        onClick={() => {
          console.log(events.events);
        }}
      >
        3. Console Log Events
      </button>