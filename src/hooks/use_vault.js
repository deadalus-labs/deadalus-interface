import { useState, useEffect } from 'react'

import {
	useAccount,
	useContract,
	useContractWrite,
	useNetwork,
	useWaitForTransaction,
  useContractRead
} from "@starknet-react/core";

import { fractionVaultABI } from "@/lib/constants/fraction_vault";
import { VAULT_ADDRESS, TOOGLE_SELECTOR } from "@/lib/constants/contract_address";



function useVault(depositedContractAddress){

    const [ currentController, setCurrentController] = useState('')
    const { contract } = useContract({
      abi: fractionVaultABI,
      address: VAULT_ADDRESS,
    });

    function toggleDoor(){}

    	// const calls = useMemo(() => {
      //   if (!address || !contract) return [];
      //   console.log("made it")
      //   return contract.populateTransaction["deposit_contract"]!(depositAddress, {
      //     low: 1,
      //     high: 0,
      //   });
      // }, [contract, address])

      // const { writeAsync, data, isPending } = useContractWrite({
      //   calls,
      // });

    return { currentController, toggleDoor }
}

export default useVault