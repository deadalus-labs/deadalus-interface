import { useState, useEffect } from 'react'

import {
	useAccount,
	useContract,
	useContractWrite,
	useNetwork,
	useWaitForTransaction,
} from "@starknet-react/core";

import { fractionVaultABI } from "@/lib/constants/fraction_vault";
import { VAULT_ADDRESS } from "@/lib/constants/contract_address";


function useController(depositedContractAddress){

    const [ currentController, setCurrentController] = useState('')
    const { contract } = useContract({
      abi: fractionVaultABI,
      address: VAULT_ADDRESS,
    });

    async function get_controller(){
      const currentController = await contract.functions["get_controller"].call(depositedContractAddress)
      console.log(currentController)
      setCurrentController(currentController)
    }

    useEffect(() => {
      get_controller()
    
      return () => {
        ''
      }
    }, [])
    

    return { currentController }
}

export default useController;